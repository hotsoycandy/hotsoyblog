import R from 'ramda'
import passport, { AuthenticateCallback } from 'passport'
import { RequestHandler, Router as ExpressRouter, NextFunction, Request, Response } from 'express'
import { z as zod, AnyZodObject } from 'zod'
import { ValidationError } from 'common/errors/ValidationError'
import { EmptyZodObject, createEmptyZodObject, zodErrorToMessages } from 'common/utils/zod'
import { UnauthorizedError } from 'common/errors/UnauthorizedError'
import { User } from 'domain/user/user.entity'

type ValidatorField = 'body' | 'query' | 'params'

export default class Router <Auth extends boolean = false> {
  constructor (
    private readonly method: 'post' | 'get' | 'put' | 'delete',
    private readonly path: string,
    private readonly handlers: RequestHandler[] = []
  ) {}

  addJwtAuth (): Router<true> {
    this.addHandler((req, res, next) => {
      const auth: AuthenticateCallback = (err, user, info) => {
        if (!R.isNil(err)) { return next(err) }
        if (user === false) { return next(new UnauthorizedError('다시 로그인 해주세요.')) }
        req.user = user as any ?? undefined
        next()
      }

      passport.authenticate('jwt', auth)(req, res, next)
    })

    return new Router(this.method, this.path, this.handlers)
  }

  addValidator <
  NewBodyValidator extends AnyZodObject = EmptyZodObject
  > ({
    body = createEmptyZodObject(),
    query = createEmptyZodObject(),
    params = createEmptyZodObject()
  }: {
    body: NewBodyValidator
    query: AnyZodObject
    params: AnyZodObject
  }): Router<Auth, NewBodyValidator> {
    const validator = { body, query, params }

    const validate = (
      targetObj: object,
      field: ValidatorField
    ): string[] => {
      const validationResult = validator[field].safeParse(targetObj)
      return validationResult.success
        ? []
        : zodErrorToMessages(validationResult.error, field)
    }

    this.addHandler(
      (req, res, next) => {
        R.pipe(
          R.always(req),
          R.pickAll(['body', 'query', 'params']),
          R.mapObjIndexed(validate),
          R.values,
          R.flatten,
          (messages: string[]) => {
            if (messages.length === 0) {
              return null
            }
            return new ValidationError(messages.join('. '))
          },
          (result) => next(result)
        )()
      })

    return this
  }

  addHandler (
    handler: (
      req: Request<
      zod.infer<ParamsValidator>,
      zod.infer<BodyValidator>,
      zod.infer<QueryValidator>
      > & { user: Auth extends true ? User : undefined },
      res: Response,
      next: NextFunction
    ) => void
  ): this {
    this.handlers.push(handler as RequestHandler)
    return this
  }

  getRouter (): ExpressRouter {
    return ExpressRouter()[this.method](this.path, this.handlers)
  }
}

import R from 'ramda'
import { RequestHandler, Router as ExpressRouter } from 'express'
import passport from 'passport'
import { z as zod, AnyZodObject } from 'zod'
import { ValidationError } from 'common/errors/ValidationError'
import { zodErrorToMessages } from 'common/utils/zod'
// import { UnauthorizedError } from 'common/errors/UnauthorizedError'

export default class Router {
  constructor (
    public readonly method: 'post' | 'get' | 'put' | 'delete',
    public readonly path: string,
    public handlers: RequestHandler[]
  ) {}

  addJwtAuth (): Router {
    this.handlers.push(passport.authenticate('jwt'))

    return this
  }

  addValidation (
    {
      body: bodyValidator = zod
        .object({})
        .strict(),
      query: queryValidator = zod
        .object({})
        .strict(),
      params: paramsValidator = zod
        .object({})
        .strict()
    }: {
      body?: AnyZodObject
      query?: AnyZodObject
      params?: AnyZodObject
    }
  ): Router {
    type ValidateTargetField = 'body' | 'query' | 'params'

    const validator = {
      body: bodyValidator,
      query: queryValidator,
      params: paramsValidator
    }

    this.handlers.push(
      (req, res, next) => {
        R.pipe(
          R.always(req),
          R.pickAll(['body', 'query', 'params']),
          R.mapObjIndexed((value: object, field: ValidateTargetField): string[] => {
            const validationResult = validator[field].safeParse(value)
            return validationResult.success
              ? []
              : zodErrorToMessages(validationResult.error, field)
          }),
          R.values,
          R.flatten,
          R.ifElse(
            R.propSatisfies(R.equals(0), 'length'),
            R.always(null),
            (messages: string[]) => new ValidationError(messages.join('. '))
          ),
          (result) => next(result)
        )()
      })

    return this
  }

  addHandler (handler: RequestHandler): Router {
    this.handlers.push(handler)
    return this
  }

  getRouter (): ExpressRouter {
    return ExpressRouter()[this.method](this.path, this.handlers)
  }
}

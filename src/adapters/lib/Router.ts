import R from 'ramda'
import { RequestHandler, Router as ExpressRouter } from 'express'
import passport from 'passport'
import { z as zod, AnyZodObject } from 'zod'
import { ValidationError } from 'common/errors/ValidationError'
// import { UnauthorizedError } from 'common/errors/UnauthorizedError'

export default class Router {
  constructor (
    public readonly method: 'post' | 'get' | 'put' | 'delete',
    public readonly path: string,
    public handlers: RequestHandler[]
  ) {}

  addJwtAuth (): Router {
    this.handlers.push(
      passport.authenticate('jwt')
    )

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
          R.mapObjIndexed((value: object, field: ValidateTargetField) => {
            const validationResult = validator[field].safeParse(value)
            return validationResult.success
              ? {}
              : validationResult.error.flatten()
          }),
          R.pickBy(R.complement(R.equals({}))),
          R.mapObjIndexed((value: object, field: ValidateTargetField) => {
            return R.pipe(
              R.always(value),
              R.pick(['formErrors', 'fieldErrors']),
              R.evolve({
                formErrors: R.map((message: string) => `"${field}": ${message}`),
                fieldErrors: R.pipe(
                  R.toPairs,
                  R.map(([key, values = []]) => `"${field}.${key}": ${(values as string[]).join(', ')}`)
                )
              }),
              R.values
            )()
          }),
          R.values,
          R.flatten,
          R.join(', '),
          R.ifElse(
            R.equals(''),
            R.always(null),
            (messages: string) => new ValidationError(messages)
          ),
          next
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

import R from 'ramda'
import passport from 'passport'
import { RequestHandler, Router as ExpressRouter } from 'express'
import { AnyZodObject } from 'zod'
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

  addValidation (validator: { body: AnyZodObject }): Router {
    this.handlers.push(
      (req, res, next) => {
        const validationResult = validator.body.safeParse(req.body)
        if (validationResult.success) return next()

        const validationErrorMessage: string = R.pipe(
          R.pick(['formErrors', 'fieldErrors']),
          R.evolve({
            formErrors: R.identity,
            fieldErrors: R.pipe(
              R.toPairs,
              R.map(([key, values = []]) => `"${key}: ${(values as string[]).join(', ')}`),
              R.join('. ')
            )
          }),
          R.values,
          R.join('. ')
        )(validationResult.error.flatten())

        next(new ValidationError(validationErrorMessage))
      }
    )

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

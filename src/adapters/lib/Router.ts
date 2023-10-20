import passport, { AuthenticateCallback } from 'passport'
import { RequestHandler } from 'express'
import { ZodAny } from 'zod'
import { ValidationError } from 'common/errors/ValidationError'

export default class Router {
  constructor (
    public readonly method: 'post' | 'get' | 'put' | 'delete',
    public readonly path: string,
    public handlers: RequestHandler[]
  ) {}

  addJwtAuth (): Router {
    this.handlers.push(
      passport.authenticate('jwt', { session: false })
    )

    return this
  }

  addValidation (validator: ZodAny): Router {
    this.handlers.push(
      (req, res, next) => {
        const validationResult = validator.safeParse(req.body)
        if (validationResult.success) return next()

        const validationErrorMessage =
          validationResult
            .error
            .errors
            .map(err => `"${err.path.join('.')}": ${err.message}`)
            .join('. ')

        next(new ValidationError(validationErrorMessage))
      }
    )

    return this
  }

  async addHandler (handler: Promise<any>): Router {
    this.handlers.push(handler)
    return this
  }
}

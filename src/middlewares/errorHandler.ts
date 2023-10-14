import { CommonError } from 'common/errors/CommonError'
import { InternalError } from 'common/errors/InternalError'
import { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler =
  (err, req, res, next) => {
    if (err instanceof CommonError) {
      return res
        .status(err.resStatusCode)
        .json({
          code: err.resErrorCode,
          message: err.resErrorMessage
        })
    }

    console.error('Unexpected Error is occured. The error:', err)

    const internalError = new InternalError('Internal Server Error')
    return res
      .status(internalError.resStatusCode)
      .json({
        code: internalError.resStatusCode,
        message: internalError.resErrorMessage
      })
  }

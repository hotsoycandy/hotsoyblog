import { CommonError } from './CommonError'

export class ValidationError extends CommonError {
  readonly resErrorCode = 'ValidationError'
  readonly resStatusCode = 400
}

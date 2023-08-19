import { CommonError } from './CommonError'

export class ValidationError extends CommonError {
  readonly errorCode = 'ValidationError'
  readonly statusCode = 400
}

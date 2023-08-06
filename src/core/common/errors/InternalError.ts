import { CommonError } from './CommonError'

export class InternalError extends CommonError {
  readonly errorCode = 'InternalError'
  readonly statusCode = 500
}

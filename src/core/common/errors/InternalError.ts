import { CommonError } from './CommonError'

export class InternalError extends CommonError {
  readonly resErrorCode = 'InternalError'
  readonly resStatusCode = 500
}

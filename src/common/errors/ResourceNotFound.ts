import { CommonError } from './CommonError'

export class ResourceNotFound extends CommonError {
  readonly resErrorCode = 'ResourceNotFound'
  readonly resStatusCode = 404
}

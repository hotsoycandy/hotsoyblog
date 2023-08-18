import { CommonError } from './CommonError'

export class ResourceNotFound extends CommonError {
  readonly errorCode = 'ResourceNotFound'
  readonly statusCode = 404
}

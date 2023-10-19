import { CommonError } from './CommonError'

export class UnauthorizedError extends CommonError {
  readonly resErrorCode = 'UnauthorizedError'
  readonly resStatusCode = 401

  constructor (message: string, resErrorMessage?: string) {
    super(message)
    this.resErrorMessage = resErrorMessage ?? message
  }
}

import { CommonError } from './CommonError'

export class InternalError extends CommonError {
  readonly resErrorCode = 'InternalError'
  readonly resStatusCode = 500

  constructor (message: string, resErrorMessage?: string) {
    super(message)
    this.resErrorMessage = resErrorMessage ?? message
  }

  getDefaultMessage (): string {
    return 'Internal Server Error'
  }
}

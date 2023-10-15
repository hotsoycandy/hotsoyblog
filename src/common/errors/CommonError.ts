export abstract class CommonError extends Error {
  // http api response properties
  readonly abstract resStatusCode: number
  readonly abstract resErrorCode: string
  resErrorMessage: string

  constructor (message: string, resErrorMessage?: string) {
    super(message)
    this.resErrorMessage = resErrorMessage ?? message
  }
}

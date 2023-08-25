export abstract class CommonError extends Error {
  constructor (message: string, resErrorMessage?: string) {
    super(message)
    this.resErrorMessage = resErrorMessage ?? message
  }

  // http api response properties
  readonly abstract resErrorCode: string
  resErrorMessage: string
  readonly abstract resStatusCode: number
}

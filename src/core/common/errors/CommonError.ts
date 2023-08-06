export abstract class CommonError extends Error {
  readonly abstract errorCode: string
  readonly abstract statusCode: number
}

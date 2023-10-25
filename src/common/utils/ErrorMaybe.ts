/**
 * Maybe. But Nothing when the value is Error instance
 */
export class ErrorMaybe <T> {
  readonly _val: T

  constructor (val: T) {
    this._val = val
  }

  of <NewT> (val: NewT): ErrorMaybe<NewT> {
    return new ErrorMaybe<NewT>(val)
  }

  map <
    FN extends (val: T extends Promise<any> ? Exclude<Awaited<T>, Error> : Exclude<T, Error>) => any
  > (
    fn: FN
  ): ErrorMaybe<(Extract<T, Promise<any>> extends never ? (ReturnType<FN> | Extract<T, Error>) : (Promise<Awaited<ReturnType<FN>>> | Extract<Awaited<T>, Error>))> {
    if (this._val instanceof Error) {
      return new ErrorMaybe(this._val) as any
    }

    if (this._val instanceof Promise) {
      return new ErrorMaybe(this._val.then(val => fn(val))) as any
    }

    return new ErrorMaybe(fn(this._val as any))
  }

  /* done. Instead of getOrElse */
  done (): T {
    return this._val
  }
}

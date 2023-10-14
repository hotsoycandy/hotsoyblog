export class Maybe <T> {
  readonly _val: T

  constructor (val: T) {
    this._val = val
  }

  map <
    FN extends (val: T extends Promise<any> ? Exclude<Awaited<T>, Error> : Exclude<T, Error>) => any
  > (
    fn: FN
  ): Maybe<(Extract<T, Promise<any>> extends never ? (ReturnType<FN> | Extract<T, Error>) : (Promise<Awaited<ReturnType<FN>>> | Extract<Awaited<T>, Error>))> {
    if (this._val instanceof Error) {
      return new Maybe(this._val) as any
    }

    if (this._val instanceof Promise) {
      return new Maybe(this._val.then(val => fn(val))) as any
    }

    return new Maybe(fn(this._val as any))
  }

  done (): T {
    return this._val
  }
}

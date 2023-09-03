export class Maybe <T> {
  readonly _val: T

  constructor (val: T) {
    this._val = val
  }

  map <FN extends (val: Exclude<T, Error>) => any> (fn: FN): Maybe<ReturnType<FN> | Extract<T, Error>> {
    if (this._val instanceof Error) {
      return new Maybe(this._val as Extract<T, Error>)
    }

    return new Maybe(fn(this._val as Exclude<T, Error>))
  }

  done (): T {
    return this._val
  }
}

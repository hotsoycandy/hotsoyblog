export abstract class Either <T> {
  readonly _val: T
  readonly _isError: boolean

  constructor (val: T, isError: boolean) {
    this._val = val
    this._isError = isError
  }

  abstract map <FN extends (val: T | Promise<T>) => any> (fn: FN): Either<T> | Promise<Either<T>>
}

export class Left <T> extends Either <T> {
  constructor (val: T) {
    super(val, true)
  }

  map <FN extends (val: T | Promise<T>) => any> (fn: FN): Either<T> | Promise<Either<T>> {
    return this
  }

  chain <FN extends (val: T | Promise<T>) => any> (fn: FN): T | Promise<T> {
    return this._val
  }
}

export class Right <T> extends Either<T> {
  constructor (val: T) {
    super(val, false)
  }

  map <FN extends (val: T) => any> (fn: FN): Either<ReturnType<FN>> | Promise<Either<ReturnType<FN>>> {
    if (this._val instanceof Promise) {
      return this._val.then(res => new Right(fn(res)))
    } else {
      return new Right(fn(this._val))
    }
  }

  chain <FN extends (val: T) => any> (fn: FN): ReturnType<FN> | Promise<ReturnType<FN>> {
    if (this._val instanceof Promise) {
      return this._val.then(res => fn(res))
    } else {
      return fn(this._val)
    }
  }
}

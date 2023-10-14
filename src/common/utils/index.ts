import R from 'ramda'

export const pipeP =
  R.pipeWith((fun, previousResult) =>
    (previousResult?.then !== undefined)
      ? previousResult.then(fun)
      : fun(previousResult))

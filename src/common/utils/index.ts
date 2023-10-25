import R from 'ramda'

export const pipeP =
  R.pipeWith((fn, previousResult) =>
    (previousResult?.then !== undefined)
      ? previousResult.then(fn)
      : fn(previousResult))

import R from 'ramda'
import { z as zod, ZodError, ZodObject } from 'zod'

export type EmptyZodObject = ZodObject<{}, 'strict', zod.ZodTypeAny, {}, {}>

export const zodErrorToMessages = (err: ZodError, field: string): string[] =>
  R.pipe(
    R.pick(['formErrors', 'fieldErrors']),
    R.evolve({
      formErrors: R.map((message: string) => `"${field}": ${message}`),
      fieldErrors: R.pipe(
        R.toPairs,
        R.map(([key, values = []]) => `"${field}.${key}": ${(values as string[]).join(', ')}`)
      )
    }),
    R.values,
    R.flatten
  )(err.flatten())

export const createEmptyZodObject =
  (): EmptyZodObject => zod.object({}).strict()

import { z as zod } from 'zod'
import { Router, RequestHandler } from 'express'
import { Signup } from 'application/usecases/users/signup'
import { UserRepositoryImp } from 'infrastructure/user/user.repositoryImp'
import { ValidationError } from 'common/errors/ValidationError'

const router = Router()
const signupInstance = new Signup(new UserRepositoryImp())

const a: RequestHandler = (req, res, next) => {
  const validator =
    zod
      .object({
        email: zod.string(),
        password: zod.string(),
        nickname: zod.string()
      })
      .strict()

  const validationResult = validator.safeParse(req.body)
  if (validationResult.success) return next()

  const validationErrorMessage =
    validationResult
      .error
      .errors
      .map(err => `"${err.path.join('.')}": ${err.message}`)
      .join('. ')
  next(new ValidationError(validationErrorMessage))
}

const b: RequestHandler = (req, res, next) => {
  signupInstance.execute(req.body)
    .then(result => {
      return res.json(result)
    })
    .catch(err => {
      next(err)
    })
}

router.post('/signup', [a, b])

const userRouter = Router()
userRouter.use('/users', router)

export default userRouter

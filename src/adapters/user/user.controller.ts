import { Router as ExpressRouter } from 'express'
import { z as zod } from 'zod'
import { UserRepositoryMaria } from 'infrastructure/user/persistences/user.repositoryMaria'
import Router from 'adapters/lib/Router'
import { Signup } from 'application/user/usecases/signup.usecase'
import { Signin } from 'application/user/usecases/signin.usecase'
import { UserDTO } from './user.dto'
import { CommonError } from 'common/errors/CommonError'

const signupAPI = new Router('post', '/signup')
  .addValidator({
    body: zod
      .object({
        email: zod.string(),
        password: zod.string(),
        nickname: zod.string()
      })
      .strict()
  })
  .addHandler((req, res, next) => {
    new Signup(new UserRepositoryMaria())
      .execute(req.body)
      .then(user => {
        if (user instanceof CommonError) return next(user)

        return res.json(new UserDTO(user))
      })
      .catch(err => next(err))
  })

const signinAPI = new Router('post', '/signin')
  .addValidator({
    body: zod
      .object({
        email: zod.string(),
        password: zod.string()
      })
      .strict()
  })
  .addHandler((req, res, next) => {
    new Signin(new UserRepositoryMaria())
      .execute(req.body)
      .then((result) => {
        if (result instanceof CommonError) return next(result)

        const { user, token } = result
        return res.json({ user: new UserDTO(user), token })
      })
      .catch(err => next(err))
  })

const userRouter = ExpressRouter()
userRouter.use('/users', [
  signupAPI.getRouter(),
  signinAPI.getRouter()
])

export default userRouter

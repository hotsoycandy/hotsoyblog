import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { GetUser } from 'application/user/usecases/getUser.usecase'
import { UserRepositoryMaria } from 'infrastructure/user/persistences/user.repositoryMaria'

export function useLocalAuthMiddleware (): void {
  const getUser = new GetUser(new UserRepositoryMaria())

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, cb) => {
    ;(async () => {
      new Maybe({ email, password })
        .map(getUser.execute)
        .getOrElse()

      const user = await ({ email, password })
      user !== null
        ? cb(null, user)
        : cb(null, false, { message: '아이디 또는 비밀번호가 일치하지 않습니다.' })
    })()
      .catch(err => {
        cb(err)
      })
  }))
}

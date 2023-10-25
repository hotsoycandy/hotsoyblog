import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { GetUser } from 'application/user/usecases/getUser.usecase'
import { UserRepositoryMaria } from 'infrastructure/user/persistences/user.repositoryMaria'

export function useJwtAuthMiddleware (): void {
  const getUser = new GetUser(new UserRepositoryMaria())

  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env['JWT_SECRET']
  }, (jwtPayload, cb) => {
    getUser.execute({ idx: jwtPayload.idx })
      .then(user => {
        user !== null
          ? cb(null, user)
          : cb(null, false, { message: '다시 로그인 해주세요.' })
      })
      .catch(err => {
        cb(err)
      })
  }))
}

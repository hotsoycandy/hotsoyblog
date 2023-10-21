import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

export function useJwtAuthMiddleware (): void {
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env['JWT_SECRET']
  }, (jwtPayload, cb) => {
    return cb(null, {})
  }))
}

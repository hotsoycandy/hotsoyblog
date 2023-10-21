import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

export function useLocalAuthMiddleware (): void {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, cb) => {
    return cb(null, { email })
  }))
}

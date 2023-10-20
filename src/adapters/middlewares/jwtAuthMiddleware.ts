import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
}, (username, password, cb) => {
  return cb(null, {})
}))

import {
  Strategy as JwtStrategy,
  ExtractJwt
} from 'passport-jwt'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
  issuer: 'zifori.me',
  audience: 'asdasd'
}

export const localAuthMiddleware = new JwtStrategy(options, function (username, password, cb) {
  return cb(null, {})
})

import { Strategy as LocalStrategy } from 'passport-local'

export const localAuthMiddleware = new LocalStrategy(function (username, password, cb) {
  return cb(null, {})
})

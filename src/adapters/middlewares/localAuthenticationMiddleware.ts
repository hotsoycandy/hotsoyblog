import passport from 'passport'
import LocalStrategy from 'passport-local'

export const passportLocal = new LocalStrategy((username, password, cb) => {
  return cb(null, {})
})

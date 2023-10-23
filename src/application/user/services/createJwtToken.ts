import jwt from 'jsonwebtoken'
import { User } from 'domain/user/user.entity'

export function createJwtToken (user: User): string {
  return jwt.sign({
    idx: user.idx,
    email: user.email
  }, process.env['JWT_SECRET'] ?? '', {
    expiresIn: '1d'
  })
}

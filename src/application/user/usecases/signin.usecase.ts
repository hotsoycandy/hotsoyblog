import jwt from 'jsonwebtoken'
import { CommonError } from 'common/errors/CommonError'
import { UnauthorizedError } from 'common/errors/UnauthorizedError'
import { User } from 'domain/user/user.entity'
import { UserRepository } from 'domain/user/user.repository'

export class Signin {
  constructor (
    private readonly UserRepo: UserRepository
  ) {}

  async execute (loginParams: {
    email: string
    password: string
  }): Promise<{ user: User, token: string } | CommonError> {
    const { email, password } = loginParams

    const user = await this.UserRepo.getUser({
      email,
      password: User.createHashedPassword(password)
    })

    if (user === null) {
      throw new UnauthorizedError('아이디와 비밀번호 정보가 올바르지 않습니다.')
    }

    const token = jwt.sign({
      idx: user.idx,
      email: user.email
    }, process.env['JWT_SECRET'] ?? '', {
      expiresIn: '1d'
    })

    return { user, token }
  }
}

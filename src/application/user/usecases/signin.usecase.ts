import { CommonError } from 'common/errors/CommonError'
import { UnauthorizedError } from 'common/errors/UnauthorizedError'
import { User } from 'domain/user/user.entity'
import { UserRepository } from 'domain/user/user.repository'

export class Signin {
  constructor (
    private readonly UserRepo: UserRepository
  ) {}

  async execute (
    email: string,
    password: string
  ): Promise<User | CommonError> {
    const user = await this.UserRepo.getUser({
      email,
      password: User.createHashedPassword(password)
    })

    return user !== null
      ? user
      : new UnauthorizedError('아이디와 비밀번호 정보가 올바르지 않습니다.')
  }
}

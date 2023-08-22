import { User } from 'core/domain/user/User.entity'
import { UserRepository } from 'core/domain/user/User.repository'
import { CommonError } from 'core/common/errors/CommonError'

export class Signup {
  constructor (
    private readonly UserRepo: UserRepository
  ) {}

  async execute (
    createParams: {
      email: string
      password: string
      nickname: string
    }
  ): Promise<User | CommonError> {
    return undefined as any
  }
}

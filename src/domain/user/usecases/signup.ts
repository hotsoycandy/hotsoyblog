import { User } from 'domain/user/user.entity'
import { UserRepository } from 'domain/user/user.repository'
import { CommonError } from 'common/errors/CommonError'

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

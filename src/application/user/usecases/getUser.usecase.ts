import { User } from 'domain/user/user.entity'
import { UserRepository } from 'domain/user/user.repository'

export class GetUser {
  constructor (
    private readonly UserRepo: UserRepository
  ) {}

  async execute (
    targetUserDataParams: {
      idx?: string
      email?: string
      password?: string
      nickname?: string
    }
  ): Promise<User | null> {
    return await this.UserRepo.getUser(targetUserDataParams)
  }
}

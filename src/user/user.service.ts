import { Injectable } from '@nestjs/common'
import { User } from './entity/user.entity'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(public readonly userRepository: UserRepository) {}

  async createUser(createUserParams: {
    email: string
    password: string
    nickname: string
  }): Promise<User> {
    throw new Error('Method is not ready yet')
  }
}

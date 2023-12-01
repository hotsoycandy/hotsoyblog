import { pick } from 'lodash'
import { Injectable, BadRequestException } from '@nestjs/common'
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
    const { email } = createUserParams

    const emailDuplication = await this.userRepository.getUser({ email })
    if (emailDuplication !== null) {
      throw new BadRequestException('duplicated email')
    }

    const user = this.userRepository.newUser(
      pick(createUserParams, ['email', 'password', 'nickname']),
    )
    return await this.userRepository.createUser(user)
  }
}

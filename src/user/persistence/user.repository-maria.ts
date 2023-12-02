import { pick } from 'lodash'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entity/user.entity'
import { UserRepository } from '../user.repository'

@Injectable()
export class UserRepositoryMaria implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  newUser(createUserParams: {
    email: string
    password: string
    nickname: string
  }): User {
    return this.userRepository.create(
      pick(createUserParams, ['email', 'password', 'nickname']),
    )
  }

  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user)
  }

  async getUser(getUserParams: {
    idx?: number
    email?: string
  }): Promise<User | null> {
    return await this.userRepository.findOne({
      where: pick(getUserParams, ['idx', 'email']),
    })
  }
}

import { Repository } from 'typeorm'
import { User } from 'domain/user/user.entity'
import { UserRepository } from 'domain/user/user.repository'
import { AppDataSource } from 'infrastructure/db'
import { CommonError } from 'common/errors/CommonError'

export class UserRepositoryMaria extends UserRepository {
  public repository: Repository<User>

  constructor () {
    super()
    this.repository = AppDataSource.getRepository(User)
  }

  async createUser (createParams: {
    email: string
    password: string
    nickname: string
  }): Promise<User> {
    return await this.repository.save(createParams)
  }

  async getUser (targetParams: { email?: string, password?: string }): Promise<User | null> {
    return await this.repository.findOne({ where: targetParams })
  }

  async getUserList (
    targetUserParams: {
      idx?: string
      email?: string
    },
    searchOptionParams: {
      limit?: number | undefined
      page?: string | undefined
    }): Promise<{
      list: User[]
      limit: number
      currentPage: string
      nextPage: string
    }> {
    throw new Error('Method not implemented.')
  }

  async updateUser (
    targetUserIdx: string,
    newUserDataParams: {
      email?: string
      password?: string
    }
  ): Promise<User | CommonError> {
    return null as any
  }

  async deleteUser (
    targetUserIdx: string
  ): Promise<User | CommonError> {
    return null as any
  }
}

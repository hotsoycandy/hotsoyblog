import { Repository } from 'typeorm'
import { User } from 'domain/user/user.entity'
import { UserRepository } from 'domain/user/user.repository'
import { AppDataSource } from 'infrastructure/db'

export class UserRepositoryImp extends UserRepository {
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

  async getUser (targetParams: { email?: string }): Promise<User | null> {
    return await this.repository.findOne({ where: targetParams })
  }

  async getUserList (
    targetParams: {},
    optionParams: { limit?: number | undefined, page?: string | undefined }
  ): Promise<{
      list: User[]
      limit: number
      currentPage: string
      nextPage: string
    }> {
    throw new Error('Method not implemented.')
  }

  async updateUser (): Promise<User> {
    throw new Error('Method not implemented.')
  }

  async deleteUser (): Promise<User> {
    throw new Error('Method not implemented.')
  }
}

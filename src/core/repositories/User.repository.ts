import { User } from 'core/entities/User'

export abstract class UserRepository {
  abstract createUser (createParams: {}): Promise<User>

  abstract getUser (targetParams: {}): Promise<User>

  abstract getUserList (
    targetParams: {},
    optionParams: {
      limit?: number
      page?: string
    }
  ): Promise<{
    list: User[]
    limit: number
    currentPage: string
    nextPage: string
  }>

  abstract updateUser (): Promise<User>

  abstract deleteUser (): Promise<boolean>
}

import { CommonError } from 'common/errors/CommonError'
import { User } from 'domain/user/user.entity'

export abstract class UserRepository {
  abstract createUser (createParams: {

  }): Promise<User | CommonError>

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

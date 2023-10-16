import { CommonError } from 'common/errors/CommonError'
import { User } from 'domain/user/user.entity'

export abstract class UserRepository {
  abstract createUser (createParams: {
    email: string
    password: string
    nickname: string
  }): Promise<User | CommonError>

  abstract getUser (
    targetParams: { email?: string }
  ): Promise<User | null>

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

  abstract deleteUser (): Promise<User>
}

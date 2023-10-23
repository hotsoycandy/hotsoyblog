import { User } from 'domain/user/user.entity'
import { CommonError } from 'common/errors/CommonError'

export abstract class UserRepository {
  abstract createUser (newUserParams: {
    password: string
    nickname: string
  }): Promise<User | CommonError>

  abstract getUser (
    targetUserParams: {
      idx?: string
      email?: string
      password?: string
      nickname?: string
    }
  ): Promise<User | null>

  abstract getUserList (
    targetUserParams: {},
    searchOptionParams: {
      limit?: number
      page?: string
    }
  ): Promise<{
    list: User[]
    limit: number
    currentPage: string
    nextPage: string
  }>

  abstract updateUser (
    targetUserIdx: string,
    newUserDataParams: {
      email?: string
      password?: string
    }
  ): Promise<User | CommonError>

  abstract deleteUser (
    targetUserIdx: string
  ): Promise<User | CommonError>
}

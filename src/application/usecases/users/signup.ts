import { User } from 'domain/user/user.entity'
import { UserRepository } from 'domain/user/user.repository'
import { CommonError } from 'common/errors/CommonError'

export class Signup {
  constructor (
    private readonly UserRepo: UserRepository
  ) {}

  async execute (
    createParams: {
      email: string
      password: string
      nickname: string
    }
  ): Promise<User | CommonError> {
    const isEmailDuplicated = async (email: string): Promise<boolean> => {
      return (await this.UserRepo.getUser({ email }) !== null)
    }

    const user = await User.signup(
      createParams,
      { isEmailDuplicated })

    return await this.UserRepo.createUser(user)
  }
}

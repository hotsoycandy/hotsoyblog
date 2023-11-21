import { User } from './entity/user.entity'

export abstract class UserRepository {
  abstract createUser(createUserParams: {
    email: string
    password: string
    nickname: string
  }): Promise<User>
}

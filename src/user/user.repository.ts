import { User } from './entity/user.entity'

export abstract class UserRepository {
  abstract newUser(createUserParams: {
    email: string
    password: string
    nickname: string
  }): Promise<User>

  abstract createUser(user: User): Promise<User>
}

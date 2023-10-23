import R from 'ramda'
import { CommonError } from 'common/errors/CommonError'
import { UnauthorizedError } from 'common/errors/UnauthorizedError'
import { User } from 'domain/user/user.entity'
import { UserRepository } from 'domain/user/user.repository'
import { createJwtToken } from '../services/createJwtToken'

export class Signin {
  constructor (
    private readonly UserRepo: UserRepository
  ) {}

  async execute (loginParams: {
    email: string
    password: string
  }): Promise<{ user: User, token: string } | CommonError> {
    const addToken = (user: User): { user: User, token: string } =>
      R.pipe(
        R.objOf('user'),
        R.assoc('token', createJwtToken(user))
      ) as any

    const nullChecking = (user: User | null): User => {
      if (R.isNil(user)) {
        throw new UnauthorizedError('아이디와 비밀번호 정보가 올바르지 않습니다.')
      }
      return user
    }

    return await Promise
      .resolve(loginParams)
      .then(R.evolve({
        password: User.createHashedPassword
      }))
      .then(this.UserRepo.getUser)
      .then(nullChecking)
      .then(addToken)
  }
}

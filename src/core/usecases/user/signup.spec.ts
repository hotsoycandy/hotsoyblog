// external modules
import { faker } from '@faker-js/faker'
// use-case
import { Signup } from './signup'
// domain core
import { User } from 'core/domain/user/User.entity'
import { UserRepository } from 'core/domain/user/User.repository'
// errors
import { ValidationError } from 'core/common/errors/ValidationError'
// utils
import { encryptPassword } from 'core/common/utils/encryptPassword'

describe('회원가입 테스트', () => {
  let userRepositoryInstance: jest.Mocked<UserRepository>
  let signupInstance: Signup

  beforeEach(() => {
    userRepositoryInstance = {
      createUser: jest.fn()
    } as any

    signupInstance = new Signup(userRepositoryInstance)
  })

  describe('단일 회원가입 테스트', () => {
    const email = faker.internet.email()
    const password = faker.internet.password({
      pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~!@#$%^&*()_+-=]).{8,30}$/
    })
    const nickname = faker.lorem.word(5)
    const encryptedPassword = encryptPassword(password, email)
    let user: User

    beforeEach(() => {
      user = new User({
        email,
        password: encryptedPassword,
        nickname
      })
    })

    test('유효한 값을 넘겼을 경우 에러 없이 새로운 유저를 생성하는가', async () => {
      userRepositoryInstance.createUser
        .mockResolvedValueOnce(user)

      const res = await signupInstance.execute({
        email,
        password,
        nickname
      })

      expect(userRepositoryInstance.createUser)
        .toBeCalledWith({
          email,
          password: encryptedPassword,
          nickname
        })

      expect(res).toBeInstanceOf(User)
      if (!(res instanceof User)) return
      expect(res.email).toBe(email)
      expect(res.password).toBe(encryptedPassword)
      expect(res.nickname).toBe(nickname)
    })

    test('유효하지 않은 "email"을 넘겼을 경우 ValidationError를 반환하는가', async () => {
      const incorrectEmail = faker.lorem.word(5)

      const res = await signupInstance.execute({
        email: incorrectEmail,
        password,
        nickname
      })

      expect(userRepositoryInstance.createUser)
        .toBeCalledTimes(0)

      expect(res).toBeInstanceOf(ValidationError)
      if (!(res instanceof ValidationError)) return
      expect(res.message).toBe('"email" 형식이 올바르지 않습니다.')
    })

    test('"password" 길이가 짧을 경우 ValidationError와 올바른 에러메시지를 반환하는가', async () => {
      const incorrectPassword = faker.internet.password({
        pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~!@#$%^&*()_+-=]).{5}$/
      })

      const res = await signupInstance.execute({
        email,
        password: incorrectPassword,
        nickname
      })

      expect(userRepositoryInstance.createUser)
        .toBeCalledTimes(0)

      expect(res).toBeInstanceOf(ValidationError)
      if (!(res instanceof ValidationError)) return
      expect(res.message).toBe('"password" 형식이 올바르지 않습니다.')
    })

    test('"password" 영대문자가 포함되어 있지 않은 경우, ValidationError와 올바른 에러메시지를 반환하는가', async () => {
      const incorrectPassword = faker.internet.password({
        pattern: /^(?!.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~!@#$%^&*()_+-=]).{8,30}$/
      })

      const res = await signupInstance.execute({
        email,
        password: incorrectPassword,
        nickname
      })

      expect(userRepositoryInstance.createUser)
        .toBeCalledTimes(0)

      expect(res).toBeInstanceOf(ValidationError)
      if (!(res instanceof ValidationError)) return
      expect(res.message).toBe('"password" 형식이 올바르지 않습니다.')
    })

    test('"password" 영소문자가 포함되어 있지 않은 경우, ValidationError와 올바른 에러메시지를 반환하는가', async () => {
      const incorrectPassword = faker.internet.password({
        pattern: /^(?=.*?[A-Z])(?!.*?[a-z])(?=.*?[0-9])(?=.*?[~!@#$%^&*()_+-=]).{8,30}$/
      })

      const res = await signupInstance.execute({
        email,
        password: incorrectPassword,
        nickname
      })

      expect(userRepositoryInstance.createUser)
        .toBeCalledTimes(0)

      expect(res).toBeInstanceOf(ValidationError)
      if (!(res instanceof ValidationError)) return
      expect(res.message).toBe('"password" 형식이 올바르지 않습니다.')
    })

    test('"password" 숫자가 포함되어 있지 않은 경우, ValidationError와 올바른 에러메시지를 반환하는가', async () => {
      const incorrectPassword = faker.internet.password({
        pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?!.*?[0-9])(?=.*?[~!@#$%^&*()_+-=]).{8,30}$/
      })

      const res = await signupInstance.execute({
        email,
        password: incorrectPassword,
        nickname
      })

      expect(userRepositoryInstance.createUser)
        .toBeCalledTimes(0)

      expect(res).toBeInstanceOf(ValidationError)
      if (!(res instanceof ValidationError)) return
      expect(res.message).toBe('"password" 형식이 올바르지 않습니다.')
    })

    test('"password" 특수문자가 포함되어 있지 않은 경우, ValidationError와 올바른 에러메시지를 반환하는가', async () => {
      const incorrectPassword = faker.internet.password({
        pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?!.*?[~!@#$%^&*()_+-=]).{8,30}$/
      })

      const res = await signupInstance.execute({
        email,
        password: incorrectPassword,
        nickname
      })

      expect(userRepositoryInstance.createUser)
        .toBeCalledTimes(0)

      expect(res).toBeInstanceOf(ValidationError)
      if (!(res instanceof ValidationError)) return
      expect(res.message).toBe('"password" 형식이 올바르지 않습니다.')
    })

    test('"nickname" 특수문자가 포함되어 있을 경우, ValidationError와 올바른 에러메시지를 반환하는가', async () => {
      const incorrectNickname = faker.internet.password({
        pattern: /^(?!.*?[A-Za-z0-9 ]).{2,10}$/
      })

      const res = await signupInstance.execute({
        email,
        password,
        nickname: incorrectNickname
      })

      expect(userRepositoryInstance.createUser)
        .toBeCalledTimes(0)

      expect(res).toBeInstanceOf(ValidationError)
      if (!(res instanceof ValidationError)) return
      expect(res.message).toBe('"nickname" 형식이 올바르지 않습니다.')
    })
  })
})

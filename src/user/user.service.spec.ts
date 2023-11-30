import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { UserRepository } from './user.repository'
import { newMockedUser } from 'test/util/mock-entity'
import { BadRequestException } from '@nestjs/common'

describe('user.service', () => {
  let userService: UserService
  let userRepository: jest.Mocked<UserRepository>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useClass: UserRepository as any,
        },
      ],
    }).compile()

    userService = module.get<UserService>(UserService)
    userRepository = module.get<jest.Mocked<UserRepository>>(UserRepository)
  })

  describe('createUser', () => {
    it('should check email duplication', async () => {
      const mockedUser = newMockedUser()

      userRepository.getUser.mockResolvedValueOnce(mockedUser)

      const response = expect(async () => {
        const { email, password, nickname } = mockedUser
        await userService.createUser({ email, password, nickname })
      })
      await response.rejects.toThrow(BadRequestException)
      await response.rejects.toThrow('duplicated email')
    })
  })
})

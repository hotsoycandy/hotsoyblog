import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { UserRepository } from './user.repository'

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
    it('should check email duplication', async () => {})
  })
})

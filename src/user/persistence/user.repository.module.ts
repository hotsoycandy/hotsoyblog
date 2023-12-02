import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../entity/user.entity'
import { UserRepository } from '../user.repository'
import { UserRepositoryMaria } from './user.repository-maria'

const userRepositoryMariaProviders: Provider[] = [
  UserRepositoryMaria,
  {
    provide: UserRepository,
    useExisting: UserRepositoryMaria,
  },
]

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [...userRepositoryMariaProviders],
  exports: [...userRepositoryMariaProviders],
})
export class UserRepositoryModule {}

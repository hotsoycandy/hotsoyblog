import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Card } from '../entity/card.entity'
import { CardRepository } from '../card.repository'
import { CardRepositoryMaria } from './card.repository-maria'

const cardRepositoryMariaProviders: Provider[] = [
  CardRepositoryMaria,
  {
    provide: CardRepository,
    useExisting: CardRepositoryMaria,
  },
]

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  providers: [...cardRepositoryMariaProviders],
  exports: [...cardRepositoryMariaProviders],
})
export class CardRepositoryModule {}

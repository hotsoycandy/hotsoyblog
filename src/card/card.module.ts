import { Module } from '@nestjs/common'
import { CardController } from './card.controller'
import { CardService } from './card.service'
import { CardRepositoryModule } from './persistence/card.repository.module'

@Module({
  imports: [CardRepositoryModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}

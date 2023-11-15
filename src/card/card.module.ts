import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/infra/database/database.module'
import { CardRepositoryMaria } from './persistence/card.repository-maria'
import { CardController } from './card.controller'
import { CardService } from './card.service'

@Module({
  imports: [DatabaseModule],
  controllers: [CardController],
  providers: [CardService, CardRepositoryMaria],
})
export class CardModule {}

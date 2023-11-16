import { Module } from '@nestjs/common'
import { DatabaseModule } from './infra/database/database.module'
import { CardModule } from './card/card.module'

@Module({
  imports: [DatabaseModule, CardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

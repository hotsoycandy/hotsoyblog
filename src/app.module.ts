import { join } from 'path'
import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { DatabaseModule } from './infra/database/database.module'
import { CardModule } from './card/card.module'

@Module({
  imports: [
    DatabaseModule,
    CardModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

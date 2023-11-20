import { join } from 'path'
import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { DatabaseModule } from './infra/database/database.module'
import { CardModule } from './card/card.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    DatabaseModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    CardModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

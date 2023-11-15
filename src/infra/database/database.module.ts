import { Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Card } from 'src/card/entity/card.entity'
import { NestjsTypeOrmLogger } from './nestjs-typeorm-logger'

function isDevEnv(NODE_ENV: string): boolean {
  return ['development', 'test'].includes(NODE_ENV)
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mariadb',
        host: config.get('DATABASE_HOST'),
        port: parseInt(config.get('DATABASE_PORT') ?? '3306'),
        username: config.get('DATABASE_USERNAME'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_NAME'),
        logger: new NestjsTypeOrmLogger(new Logger('TypeORM')),
        entities: [Card],
        synchronize: isDevEnv(config.get('NODE_ENV') as string),
        logging: isDevEnv(config.get('NODE_ENV') as string),
      }),
    }),
  ],
})
export class DatabaseModule {}

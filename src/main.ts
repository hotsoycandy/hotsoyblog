import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setNestApp } from './infra/server/set-nest-app'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  setNestApp(app)
  await app.listen(3000)
}

bootstrap().catch((err) => {
  console.error('Unexpected error caught while running application', err)
})

import { Logger as NestLogger } from '@nestjs/common'
import { Logger as TypeOrmLogger } from 'typeorm'

export class NestjsTypeOrmLogger implements TypeOrmLogger {
  constructor(private readonly logger: NestLogger) {}

  private stringifyParams(parameters: any[] = []): string {
    return parameters.length !== 0
      ? `\nParameters: [${parameters.join(', ')}]`
      : ''
  }

  // debugs
  logQuery(query: string, params?: any[]): void {
    let message = ''
    message += `Query: ${query}`
    message += this.stringifyParams(params)
    this.logger.debug(message)
  }

  logSchemaBuild(message: string): void {
    this.logger.debug(message)
  }

  logMigration(message: string): void {
    this.logger.debug(message)
  }

  // warns
  logQuerySlow(time: number, query: string, params?: any[]): void {
    let message = ''
    message += `Slow Query (${time}s): ${query}`
    message += this.stringifyParams(params)
    this.logger.warn(message)
  }

  // errors
  logQueryError(error: string, query: string, params?: any[]): void {
    let message = ''
    message += `Query Error: ${error}. Query: ${query}`
    message += this.stringifyParams(params)
    this.logger.error(message)
  }

  // common logs
  log(level: 'log' | 'info' | 'warn', message: any): void {
    switch (level) {
      case 'log':
      case 'info':
        this.logger.log(message)
        break
      case 'warn':
        this.logger.warn(message)
        break
    }
  }
}

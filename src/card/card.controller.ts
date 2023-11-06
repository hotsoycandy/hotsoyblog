import { Controller, Logger, Post } from '@nestjs/common'
import { CardService } from './card.service'
import { Card } from './entities/card.entity'

@Controller('cards')
export class CardController {
  private readonly logger = new Logger(CardController.name)

  constructor (
    private readonly cardService: CardService
  ) {}

  @Post('/crawl')
  async crawlCards (): Promise<Card[]> {
    return await this.cardService.crawlCards('javascript')
  }
}

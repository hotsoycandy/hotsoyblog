import { Logger, Controller, Post, Body } from '@nestjs/common'
import { CardService } from './card.service'
import { Card } from './entities/card.entity'
import { CrawlCardDTO } from './dto/crawl-card.dto'

@Controller('cards')
export class CardController {
  private readonly logger = new Logger(CardController.name)

  constructor(private readonly cardService: CardService) {}

  @Post('/crawl')
  async crawlCards(@Body() crawlCard: CrawlCardDTO): Promise<Card[]> {
    const { keyword } = crawlCard
    return await this.cardService.crawlCards(keyword)
  }
}

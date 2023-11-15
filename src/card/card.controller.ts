import { Logger, Controller, Post, Body } from '@nestjs/common'
import { CardService } from './card.service'
import { Card } from './entities/card.entity'
import { CrawlCardsDTO } from './dto/crawl-cards.dto'

@Controller('cards')
export class CardController {
  private readonly logger = new Logger(CardController.name)

  constructor(private readonly cardService: CardService) {}

  @Post('/crawl')
  async crawlCards(@Body() crawlsCardDto: CrawlCardsDTO): Promise<Card[]> {
    const { keyword } = crawlsCardDto
    return await this.cardService.crawlCards(keyword)
  }
}

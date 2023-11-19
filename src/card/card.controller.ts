import { Logger, Controller, Post, Body, Get } from '@nestjs/common'
// service
import { CardService } from './card.service'
// entity
import { Card } from './entity/card.entity'
// dto
import { CardDto } from './dto/card.dto'
import { CrawlCardsDTO } from './dto/crawl-cards.dto'

@Controller('cards')
export class CardController {
  private readonly logger = new Logger(CardController.name)

  constructor(private readonly cardService: CardService) {}

  @Post('/crawl')
  async crawlCards(@Body() crawlsCardDto: CrawlCardsDTO): Promise<Card[]> {
    const { keyword } = crawlsCardDto
    return await this.cardService.crawlAndSaveCards(keyword)
  }

  @Get('/')
  async getCards(): Promise<CardDto[]> {
    const cards = await this.cardService.getCards()
    return cards.map((card) => CardDto.from(card))
  }
}

import { Injectable, Inject, Logger } from '@nestjs/common'
import { Card } from './entity/card.entity'
import { CardRepository } from './card.repository'
import { CardRepositoryMaria } from './persistence/card.repository-maria'
import {
  SEARCH_ENGINE,
  getSearchResultHTML,
} from 'src/common/lib/search-engine'

@Injectable()
export class CardService {
  private readonly logger = new Logger(CardService.name)

  constructor(
    @Inject(CardRepositoryMaria)
    private readonly cardRepository: CardRepository,
  ) {}

  async crawlCards(keyword: string): Promise<Card[]> {
    const html = await getSearchResultHTML(SEARCH_ENGINE.GOOGLE, keyword)
    const cards = Card.extractCardsFromHTML(html)
    await this.cardRepository.saveCards(cards)
    return cards
  }
}

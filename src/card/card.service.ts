import { Injectable, Logger } from '@nestjs/common'
import { SEARCH_ENGINE, getSearchResultHTML } from 'src/common/lib/search-engine'
import { Card } from './entities/card.entity'

@Injectable()
export class CardService {
  private readonly logger = new Logger(CardService.name)

  async crawlCards (keyword: string): Promise<Card[]> {
    const html = await getSearchResultHTML(SEARCH_ENGINE.GOOGLE, keyword)
    return Card.extractCardsFromHTML(html)
  }
}

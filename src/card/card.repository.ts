import { Card } from './entity/card.entity'

export abstract class CardRepository {
  abstract saveCards: (cards: Card[]) => Promise<void>
  abstract getCards: () => Promise<Card[]>
}

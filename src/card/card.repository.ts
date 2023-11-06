import { Card } from './entities/card.entity'

export interface CardRepository {
  saveCards: (cards: Card[]) => Promise<void>
}

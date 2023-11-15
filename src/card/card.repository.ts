import { Card } from './entity/card.entity'

export interface CardRepository {
  saveCards: (cards: Card[]) => Promise<void>
}

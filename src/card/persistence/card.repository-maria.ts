import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CardRepository } from '../card.repository'
import { Card } from '../entity/card.entity'

@Injectable()
export class CardRepositoryMaria implements CardRepository {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async saveCards(cards: Card[]): Promise<void> {
    await this.cardRepository.save(cards)
  }
}

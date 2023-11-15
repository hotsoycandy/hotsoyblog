import { Inject } from '@nestjs/common/decorators'
import { DataSource, Repository } from 'typeorm'
import { CardRepository } from '../card.repository'
import { Card } from '../entity/card.entity'

export class CardRepositoryMaria
  extends Repository<Card>
  implements CardRepository
{
  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    const repository = dataSource.getRepository(Card)
    super(repository.target, repository.manager, repository.queryRunner)
  }

  async saveCards(cards: Card[]): Promise<void> {
    await this.save(cards)
  }
}

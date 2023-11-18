import { Expose } from 'class-transformer'
import { Card } from '../entity/card.entity'
import { pick } from 'lodash'

@Expose({ toPlainOnly: true })
export class CardDto {
  public originURL!: string
  public title!: string
  public description!: string
  public favicon?: string

  static from(card: Card): CardDto {
    const cardDto = new CardDto()
    Object.assign(
      cardDto,
      pick(card, ['originUrl', 'title', 'description', 'favicon']),
    )
    return cardDto
  }
}

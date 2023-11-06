import { Controller, Logger } from '@nestjs/common'
import { CardService } from './card.service'

@Controller('cards')
export class CardController {
  private readonly logger = new Logger('CardController')

  constructor (
    private readonly cardService: CardService
  ) {}
}

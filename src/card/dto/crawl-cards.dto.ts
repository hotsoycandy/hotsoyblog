import { IsString, IsNotEmpty } from 'class-validator'

export class CrawlCardsDTO {
  @IsString()
  @IsNotEmpty()
  public keyword!: string
}

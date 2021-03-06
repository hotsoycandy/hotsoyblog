import * as Cheerio from 'cheerio'
import { Entity, PrimaryColumn, Column } from 'typeorm'
import { removeMultipleWhiteSpaces } from 'src/common/lib/remove-multiple-white-spaces'

@Entity({ name: 'cards' })
export class Card {
  @PrimaryColumn()
  public originUrl!: string

  @Column()
  public siteName!: string

  @Column()
  public title!: string

  @Column()
  public description!: string

  @Column({ type: 'text' })
  public favicon?: string

  static extractCardsFromHTML(html: string): Card[] {
    const $ = Cheerio.load(html)

    const extractCards = (): Card[] => {
      const cards: Card[] = []

      $('.MjjYud').each((i, el) => {
        const card = new Card()
        card.originUrl = $(el).find('a[jsname="UWckNb"]').attr('href') ?? ''
        card.siteName = $(el).find('.notranslate .VuuXrf').text()
        card.title = $(el).find('h3.LC20lb.MBeuO.DKV0Md').text()
        card.description = removeMultipleWhiteSpaces(
          $(el).find('.VwiC3b').text(),
        )
        card.favicon = $(el).find('.notranslate .XNo5Ab').attr('src') ?? ''
        cards.push(card)
      })

      return cards
    }

    return extractCards().filter((card) => card.title !== '')
  }
}

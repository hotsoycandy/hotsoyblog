import * as Cheerio from 'cheerio'
import { removeMultipleWhiteSpaces } from 'src/common/lib/remove-multiple-white-spaces'

export class Card {
  constructor (
    public title: string,
    public description: string,
    public originURL: string,
    public favicon: string
  ) {}

  static extractCardsFromHTML (html: string): Card[] {
    const $ = Cheerio.load(html)

    const extractCards = (): Card[] => {
      const cards: Card[] = []

      $('.MjjYud').each((i, el) => {
        const card = new Card(
          // title
          $(el).find('.notranslate .VuuXrf').text(),
          // description
          removeMultipleWhiteSpaces($(el).find('.VwiC3b').text()),
          // originURL
          $(el).find('a[jsname="UWckNb"]').attr('href') ?? '',
          // favicon
          $(el).find('.notranslate .XNo5Ab').attr('src') ?? ''
        )
        cards.push(card)
      })

      return cards
    }

    return extractCards().filter(card => card.title !== '')
  }
}

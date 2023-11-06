import { getHTMLMock, SEARCH_ENGINE } from 'src/common/test-data/search-result/get-search-result'
import googleJavascriptSearchResult from 'src/common/test-data/search-result/google-javascript.json'
import { Card } from './card.entity'

describe('Card Entity', () => {
  describe('extractCardsFromHTML method', () => {
    describe('with google', () => {
      let html: string

      beforeEach(async () => {
        html = await getHTMLMock(SEARCH_ENGINE.GOOGLE)
      })

      test('extracts cards from html more than 2?', () => {
        const cards = Card.extractCardsFromHTML(html)
        expect(cards.length).toBeGreaterThan(2)
      })

      test('extracts title?', () => {
        const cards = Card.extractCardsFromHTML(html)
        expect(cards[0]?.title)
          .toBe(googleJavascriptSearchResult[0]?.title)
      })

      test('extracts description?', () => {
        const cards = Card.extractCardsFromHTML(html)
        expect(cards[0]?.description)
          .toBe(googleJavascriptSearchResult[0]?.description)
      })

      test('extracts originURL?', () => {
        const cards = Card.extractCardsFromHTML(html)
        expect(cards[0]?.originURL)
          .toBe(googleJavascriptSearchResult[0]?.originURL)
      })

      test('extracts favicon?', () => {
        const cards = Card.extractCardsFromHTML(html)
        expect(cards[0]?.favicon)
          .toBe(googleJavascriptSearchResult[0]?.favicon)
      })

      test('filter empty result', () => {
        const cards = Card.extractCardsFromHTML(html)
        cards.forEach(card => {
          expect(card.title).not.toBe('')
        })
      })
    })
  })
})

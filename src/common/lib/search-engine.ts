import axios from 'axios'

export enum SEARCH_ENGINE {
  GOOGLE = 'GOOGLE'
}

function getUserAgent (): string {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36'
  ]
  const randomNumber = Math.floor(Math.random() * userAgents.length)
  return userAgents[randomNumber] as string
}

const engineURLGetters = {
  [SEARCH_ENGINE.GOOGLE]: (keyword: string) => {
    return `https://www.google.com/search?q=${keyword}`
  }
}

function getSearchURL (engine: SEARCH_ENGINE, keyword: string): string {
  const engineURLGetter = engineURLGetters[engine]
  return engineURLGetter(keyword)
}

export async function getSearchResultHTML (
  engine: SEARCH_ENGINE,
  keyword: string
): Promise<string> {
  const axisoOptions = {
    method: 'get',
    url: getSearchURL(engine, keyword),
    headers: {
      'User-Agent': getUserAgent()
    }
  }
  const { data: html } = await axios(axisoOptions)
  return html
}

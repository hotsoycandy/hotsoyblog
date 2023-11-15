import fs from 'fs'
import path from 'path'
import { SEARCH_ENGINE } from 'src/common/lib/search-engine'
export { SEARCH_ENGINE } from 'src/common/lib/search-engine'

const mocks = {
  [SEARCH_ENGINE.GOOGLE]: path.join(__dirname, './google-javascript.txt'),
}

export async function getHTMLMock(engine: SEARCH_ENGINE): Promise<string> {
  const mockFilePath = mocks[engine]

  const html: string = await new Promise((resolve, reject) => {
    fs.readFile(mockFilePath, (err, data) => {
      if (err !== null) return reject(err)
      return resolve(data.toString())
    })
  })

  return html
}

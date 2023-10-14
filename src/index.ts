import { startServer } from './server'

async function startApp (): Promise<void> {
  await startServer()
}

startApp()
  .catch(err => {
    console.error('The error is occured while application is running. The error:', err)
  })

import { startServer } from './server'
import { connectDB } from './db'

async function startApp (): Promise<void> {
  await connectDB()
  await startServer()
}

startApp()
  .catch(err => {
    console.error('The error is occured while application is running. The error:', err)
  })

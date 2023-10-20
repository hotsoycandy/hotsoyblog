import { connectDB } from 'infrastructure/db'
import { startServer } from 'adapters/server'

async function startApp (): Promise<void> {
  await connectDB()
  await startServer()
}

startApp()
  .catch(err => {
    console.error('The error is occured while application is running. The error:', err)
  })

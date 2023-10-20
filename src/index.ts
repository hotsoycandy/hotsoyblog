import dotenv from 'dotenv'
import { startServer } from './adapters/server'
import { connectDB } from './infrastructure/db'

async function startApp (): Promise<void> {
  dotenv.config({ path: process.env['ENV_PATH'] })
  await connectDB()
  await startServer()
}

startApp()
  .catch(err => {
    console.error('The error is occured while application is running. The error:', err)
  })

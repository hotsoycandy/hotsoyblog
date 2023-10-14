import express, { Application, ErrorRequestHandler } from 'express'
import postRouter from 'adapters/post.controller'
import { errorHandler } from 'middlewares/errorHandler'

function initializeErrorHandler (app: Application, errorHandler: ErrorRequestHandler): void {
  app.use(errorHandler)
}

export async function startServer (): Promise<void> {
  const app = express()
  const port = 3000

  app.use(postRouter)
  initializeErrorHandler(app, errorHandler)

  return await new Promise(resolve => {
    app.listen(port, () => {
      console.log(`The server is running on port ${port}`)
      resolve()
    })
  })
}

import express, { Application, ErrorRequestHandler, Router, RequestHandler } from 'express'
import postRouter from 'adapters/post.controller'
import { errorHandler } from 'adapters/middlewares/errorHandlingMiddleware'

export async function startServer (): Promise<void> {
  const app = express()
  const port = 3000

  initializeMiddlewares(
    app,
    [
      express.json(),
      express.urlencoded({ extended: true })])
  initializeRouters(
    app,
    [postRouter])
  initializeErrorHandler(
    app,
    errorHandler)

  return await new Promise(resolve => {
    app.listen(port, () => {
      console.log(`The server is running on port ${port}`)
      resolve()
    })
  })
}

function initializeMiddlewares (
  app: Application,
  middlewares: RequestHandler[]
): void {
  middlewares.forEach((middleware) => {
    app.use(middleware)
  })
}

function initializeRouters (
  app: Application,
  routers: Router[]
): void {
  routers.forEach((router) => {
    app.use(router)
  })
}

function initializeErrorHandler (
  app: Application,
  errorHandler: ErrorRequestHandler
): Application {
  app.use(errorHandler)
  return app
}

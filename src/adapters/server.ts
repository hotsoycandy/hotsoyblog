import express, { Application, ErrorRequestHandler, RequestHandler } from 'express'
import { errorHandler } from 'adapters/middlewares/errorHandlingMiddleware'
import { useLocalAuthMiddleware } from 'adapters/middlewares/localAuthMiddleware'
import { useJwtAuthMiddleware } from 'adapters/middlewares/jwtAuthMiddleware'
import postRouter from 'adapters/post/post.controller'
import userRouter from 'adapters/user/user.controller'

export async function startServer (): Promise<void> {
  const app = express()
  const port = 3000

  useLocalAuthMiddleware()
  useJwtAuthMiddleware()

  initializeMiddlewares(
    app,
    [
      express.json(),
      express.urlencoded({ extended: true }),
      postRouter,
      userRouter
    ])
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

function initializeErrorHandler (
  app: Application,
  errorHandler: ErrorRequestHandler
): Application {
  app.use(errorHandler)
  return app
}

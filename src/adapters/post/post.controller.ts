import { Router as ExpressRouter } from 'express'
import { z as zod } from 'zod'

import Router from 'adapters/lib/Router'
import { CreatePost } from 'application/post/usecases/createPost.usecase'
import { PostRepositoryMaria } from 'infrastructure/post/persistences/post.repositoryMaria'

const createPostAPI = new Router('post', '')
  .addJwtAuth()
  .addValidator({
    body: zod
      .object({
        title: zod.string(),
        content: zod.string()
      })
      .strict()
  })
  .addHandler((req, res, next) => {
    new CreatePost(new PostRepositoryMaria())
      .execute({
        ...req.body,
        authorId: (req.user as any).idx
      })
      .then((post) => {
        return res.json(post)
      })
      .catch((err) => {
        next(err)
      })
  })

const postRouter = ExpressRouter()
postRouter.use('/posts', [
  createPostAPI.getRouter()
])

export default postRouter

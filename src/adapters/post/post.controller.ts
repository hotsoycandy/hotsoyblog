import { z as zod } from 'zod'
import { Router as ExpressRouter, RequestHandler } from 'express'
import { CreatePost } from 'application/post/usecases/createPost.usecase'
import { PostRepositoryImp } from 'infrastructure/post/post.repositoryImp'
import { ValidationError } from 'common/errors/ValidationError'

const router = ExpressRouter()
const createPostInstance = new CreatePost(new PostRepositoryImp())

const createPostRouter

const postRouter = ExpressRouter()
postRouter.use('/posts', router)

export default postRouter

import { z as zod } from 'zod'
import { Router, RequestHandler } from 'express'
import { CreatePost } from 'application/usecases/posts/createPost'
import { PostRepositoryImp } from 'infrastructure/post/post.repositoryImp'
import { ValidationError } from 'common/errors/ValidationError'

const router = Router()
const createPostInstance = new CreatePost(new PostRepositoryImp())

const a: RequestHandler = (req, res, next) => {
  const validator =
    zod
      .object({
        authorId: zod.string(),
        title: zod.string(),
        content: zod.string()
      })
      .strict()

  const validationResult = validator.safeParse(req.body)
  if (validationResult.success) return next()

  const validationErrorMessage =
    validationResult
      .error
      .errors
      .map(err => `"${err.path.join('.')}": ${err.message}`)
      .join('. ')
  next(new ValidationError(validationErrorMessage))
}

const b: RequestHandler = (req, res, next) => {
  createPostInstance.execute(req.body)
    .then(result => {
      return res.json(result)
    })
    .catch(err => {
      next(err)
    })
}

router.get('/', [a, b])

const postRouter = Router()
postRouter.use('/posts', router)

export default postRouter

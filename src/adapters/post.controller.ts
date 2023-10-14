import { Router } from 'express'
import { CreatePost } from 'application/usecases/createPost'
import { PostRepositoryImp } from 'infrastructure/db/post.repositoryImp'

const router = Router()
const services = new CreatePost(new PostRepositoryImp())

router.post('/', (req, res, next) => {
  services.execute(req.body)
    .then(result => {
      return res.json(result)
    })
    .catch(err => {
      next(err)
    })
})

const postRouter = Router()
postRouter.use('/posts', router)

export default postRouter

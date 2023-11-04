// utils
import { Railway } from 'common/utils/Railway'
// domain cores
import { Post } from 'domain/post/post.entity'
import { PostRepository } from 'domain/post/post.repository'

export class CreatePost {
  constructor (
    private readonly PostRepo: PostRepository
  ) {}

  async execute (
    createParams: {
      title: string
      content: string
      authorId: string
    }
  ): Promise<Post> {
    return await new Railway(createParams)
      .map(Post.validate<typeof createParams>)
      .map(this.PostRepo.createPost)
      .done()
  }
}

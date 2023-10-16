// domain cores
import { Post } from 'domain/post/post.entity'
import { PostRepository } from 'domain/post/post.repository'
// utils
import { Maybe } from 'common/utils/Maybe'
// errors
import type { CommonError } from 'common/errors/CommonError'

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
  ): Promise<Post | CommonError> {
    return await new Maybe(createParams)
      .map(Post.validatePost<typeof createParams>)
      .map(async (post) => await this.PostRepo.createPost(post))
      .done()
  }
}

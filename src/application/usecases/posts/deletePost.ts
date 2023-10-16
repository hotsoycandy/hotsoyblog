import { Post } from 'domain/post/post.entity'
import { PostRepository } from 'domain/post/post.repository'

export class DeletePost {
  constructor (
    private readonly PostRepo: PostRepository
  ) {}

  async execute (
    targetParams: {
      idx: string
      authorId?: string
    }
  ): Promise<Post | Error> {
    const post = await this.PostRepo.getPost(targetParams)
    await this.PostRepo.deletePost(targetParams)
    return post
  }
}

import { Post } from 'domain/post/post.entity'
import { PostRepository } from 'domain/post/post.repository'

export class GetPost {
  constructor (
    private readonly PostRepository: PostRepository
  ) {}

  async execute (
    targetParams: {
      idx: string
      authorId?: string
    }
  ): Promise<Post> {
    return await this.PostRepository.getPost(targetParams)
  }
}

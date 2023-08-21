import { Post } from 'core/domain/post/Post.entity'
import { PostRepository } from 'core/domain/post/Post.repository'

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
    return undefined as any
  }
}

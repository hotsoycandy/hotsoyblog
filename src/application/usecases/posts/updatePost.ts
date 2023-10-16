import { Post } from 'core/domain/post/post.entity'
import { PostRepository } from 'core/domain/post/post.repository'

export class UpdatePost {
  constructor (
    private readonly PostRepository: PostRepository
  ) {}

  async execute (
    targetParams: {
      idx: string
      authorId?: string
    },
    updateParams: {
      title?: string
      content?: string
    }
  ): Promise<Post> {
    return undefined as any
  }
}

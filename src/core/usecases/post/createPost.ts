import { Post } from 'core/domain/post/Post.entity'
import { PostRepository } from 'core/domain/post/Post.repository'

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
    return undefined as any
  }
}

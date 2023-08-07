import { Post } from 'core/entities/Post'
import { PostRepository } from 'core/repositories/Post.repository'

export class CreatePost {
  constructor (
    private readonly PostRepository: PostRepository
  ) {}

  async execute (): Promise<Post> {
    return new Post({} as any)
  }
}

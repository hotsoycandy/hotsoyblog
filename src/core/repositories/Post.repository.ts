import { Post } from 'core/entities/Post'

export abstract class PostRepository {
  abstract createPost (createParams: {}): Promise<Post>

  abstract getPost (targetParams: {}): Promise<Post>

  abstract getPostList (
    targetParams: {},
    optionParams: {
      limit?: number
      page?: string
    }
  ): Promise<{
    list: Post[]
    limit: number
    currentPage: string
    nextPage: string
  }>

  abstract updatePost (): Promise<Post>

  abstract deletePost (): Promise<boolean>
}

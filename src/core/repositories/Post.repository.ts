import { Post } from 'core/entities/Post.entity'

export abstract class PostRepository {
  abstract createPost (
    createParams: {
      title: string
      content: string
      authorId: string
    }
  ): Promise<Post>

  abstract getPost (
    targetParams: {
      idx?: string
      title?: string
      content?: string
      authorId?: string
    }
  ): Promise<Post>

  abstract getPostList (
    targetParams: {
      idx?: string
      title?: string
      content?: string
      authorId?: string
    },
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

  abstract updatePost (
    targetParams: {
      idx: string
      authorId?: string
    },
    updateParams: {
      title?: string
      content?: string
      authorId?: string
    }
  ): Promise<Post>

  abstract deletePost (
    targetParams: {
      idx: string
      authorId?: string
    }
  ): Promise<boolean>
}

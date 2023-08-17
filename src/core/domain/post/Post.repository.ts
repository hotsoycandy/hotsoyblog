import { Post } from 'core/domain/post/Post.entity'

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
      authorId?: string
    },
    optionParams?: {
      increaseViewCount?: number
    }
  ): Promise<Post>

  abstract getPosts (
    targetParams: {
      idx?: string | { gte?: string }
      title?: string
      authorId?: string
    },
    optionParams?: {
      limit?: number
      sort?: 'ASC' | 'DESC'
    }
  ): Promise<Post[]>

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

import { Post } from 'domain/post/post.entity'
import { CommonError } from 'common/errors/CommonError'

export abstract class PostRepository {
  abstract createPost (
    createParams: {
      title: string
      content: string
      authorId: string
    }
  ): Promise<Post | CommonError>

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
      idx?: string | { gte?: string, lte?: string }
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

import { Post } from 'core/domain/post/Post.entity'
import { PostRepository } from 'core/domain/post/Post.repository'

export class GetPostList {
  constructor (
    private readonly PostRepository: PostRepository
  ) {}

  async execute (
    targetParams?: {
      idx?: string
      title?: string
      authorId?: string
    },
    optionParams?: {
      page?: string
      limit?: number
      sort?: 'ASC' | 'DESC'
    }
  ): Promise<{
      list: Post[]
      limit: number
      currentPage: string | null
      nextPage: string | null
    }> {
    // const { page, limit = 20, sort = 'DESC' } = optionParams

    // const idxForPage = sort === 'ASC' ? { gte: page } : { lte: page }

    // const posts = await this.PostRepository.getPosts({
    //   ...(typeof page === 'string' && { idx: idxForPage }),
    //   ...targetParams
    // }, {
    //   limit: limit + 1, sort
    // })

    // return {
    //   list: posts.slice(0, limit),
    //   limit,
    //   currentPage: posts[0]?.idx ?? null,
    //   nextPage: posts[limit + 1]?.idx ?? null
    // }

    return undefined as any
  }
}

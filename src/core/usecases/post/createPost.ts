// domain cores
import { Post } from 'core/domain/post/Post.entity'
import { PostRepository } from 'core/domain/post/Post.repository'
// utils
// import { pipeP } from 'core/common/utils'
import { Maybe } from 'core/common/utils/Maybe'
// errors
import type { CommonError } from 'core/common/errors/CommonError'
import { ValidationError } from 'core/common/errors/ValidationError'

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
  ): Promise<Post | CommonError> {
    return await new Maybe(createParams)
      .map(validatePost<typeof createParams>)
      .map(this.PostRepo.createPost)
      .done()
  }
}

/**
 * @todo
 * - generalize this function
 * - or replace with validation module
 */
function validatePost <T extends {
  title: string
}> (postParams: T): T | ValidationError {
  const { title } = postParams
  if (title.length > 50) {
    return new ValidationError('"title"은 50자를 초과할 수 없습니다.')
  }
  return postParams
}

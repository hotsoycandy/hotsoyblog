import R from 'ramda'
// domain cores
import { Post } from 'core/domain/post/Post.entity'
import { PostRepository } from 'core/domain/post/Post.repository'
// utils
import { pipeP } from 'core/common/utils'
import { Right, Left } from 'core/common/utils/Either'
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
    return await new Right(createParams)
      .map(validatePost)
      .chain(this.PostRepo.createPost)
  }
}

/**
 * @todo
 * - generalize this function
 * - or replace with validation module
 */
function validatePost (postParams: { title: string }): { title: string } {
  const { title } = postParams
  if (title.length > 50) {
    throw new ValidationError(`"${title}"은 50자를 초과할 수 없습니다.`)
  }
  return postParams
}

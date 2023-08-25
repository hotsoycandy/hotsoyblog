import R from 'ramda'
// domain cores
import { Post } from 'core/domain/post/Post.entity'
import { PostRepository } from 'core/domain/post/Post.repository'
// utils
import { pipeP } from 'core/common/utils'
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
    return await pipeP([
      R.tap(
        R.pipe(
          R.prop('title'),
          validateTitle
        )
      ),
      this.PostRepo.createPost
    ]
    )(createParams)
  }
}

/**
 * @todo
 * - generalize this function
 * - or replace with validation module
 */
function validateTitle (title: string): Error | undefined {
  if (title.length > 50) {
    return new ValidationError(`"${title}"은 50자를 초과할 수 없습니다.`)
  }
  return undefined
}

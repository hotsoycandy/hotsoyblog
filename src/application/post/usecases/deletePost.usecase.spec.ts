import { faker } from '@faker-js/faker'

import { DeletePost } from './deletePost.usecase'

import { generateID } from 'common/utils/generateID'
import { PostRepository } from 'domain/post/post.repository'
import { Post } from 'domain/post/post.entity'
import { ValidationError } from 'common/errors/ValidationError'

describe('사용자 포스트 삭제 테스트', () => {
  let postRepositoryInstance: jest.Mocked<PostRepository>
  let deletePostInstance: DeletePost

  beforeEach(() => {
    postRepositoryInstance = {
      deletePost: jest.fn()
    } as any

    deletePostInstance = new DeletePost(postRepositoryInstance)
  })

  describe('단일 포스트 삭제 테스트', () => {
    const title = faker.lorem.word({ length: { min: 3, max: 50 } })
    const content = faker.lorem.text()
    const authorId = generateID('USER')

    let post: Post

    beforeEach(() => {
      post = new Post({
        title,
        content,
        authorId
      })
    })

    test('올바른 idx를 넘겼다면 에러가 발생하지 않음', async () => {
      postRepositoryInstance.deletePost
        .mockResolvedValueOnce(true)

      const res = await deletePostInstance.execute({
        idx: post.idx
      })

      expect(res).toBe(true)
    })

    test('올바른 idx와 authorId 넘겼다면 에러가 발생하지 않음', async () => {
      postRepositoryInstance.deletePost
        .mockResolvedValueOnce(true)

      const res = await deletePostInstance.execute({
        idx: post.idx,
        authorId: post.authorId
      })

      expect(res).toBe(true)
    })

    test('올바르지 않은 idx를 넘기면 에러가 발생', async () => {
      postRepositoryInstance.deletePost
        .mockResolvedValueOnce(false)

      const res = await deletePostInstance.execute({
        idx: generateID('POST')
      })

      expect(res).toBe(false)
    })

    test('올바르지 않은 idx와 authorId를 넘기면 에러가 발생', async () => {
      const errorMessage = faker.lorem.word()

      postRepositoryInstance.deletePost
        .mockRejectedValueOnce(new ValidationError(errorMessage))

      const res = await deletePostInstance.execute({
        idx: generateID('POST'),
        authorId: generateID('USER')
      })

      expect(res).toBeInstanceOf(ValidationError)
      expect((res as ValidationError).message).toBe(errorMessage)
    })

    test('올바르지 않은 idx와 authorId를 넘기면 에러가 발생', async () => {
      const errorMessage = faker.lorem.word()

      postRepositoryInstance.deletePost
        .mockRejectedValueOnce(new ValidationError(errorMessage))

      const res = await deletePostInstance.execute({
        idx: generateID('POST'),
        authorId: generateID('USER')
      })

      expect(res).toBeInstanceOf(ValidationError)
      expect((res as ValidationError).message).toBe(errorMessage)
    })
  })
})

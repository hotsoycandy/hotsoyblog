// external modules
import { faker } from '@faker-js/faker'
// use case
import { CreatePost } from './createPost'
// domain cores
import { Post } from 'core/domain/post/post.entity'
import { PostRepository } from 'core/domain/post/post.repository'
// utils
import { generateID } from 'common/utils/generateID'
// errors
import { InternalError } from 'common/errors/InternalError'
import { ValidationError } from 'common/errors/ValidationError'

describe('사용자 포스트 생성 테스트', () => {
  let postRepositoryInstance: jest.Mocked<PostRepository>
  let createPostInstance: CreatePost

  beforeEach(() => {
    postRepositoryInstance = {
      createPost: jest.fn()
    } as any

    postRepositoryInstance.createPost.mockClear()

    createPostInstance = new CreatePost(postRepositoryInstance)
  })

  describe('포스트 단일 생성 테스트', () => {
    const validTitle = faker.lorem.word(10)
    const validContent = faker.lorem.paragraphs(3, '<br/>')
    const validAuthorId = generateID('USER')

    let validPost: Post

    beforeEach(() => {
      validPost = new Post({
        title: validTitle,
        content: validContent,
        authorId: validAuthorId
      })
    })

    test('포스트 정상 생성', async () => {
      postRepositoryInstance.createPost
        .mockResolvedValueOnce(validPost)
      const res = await createPostInstance.execute({
        title: validTitle,
        content: validContent,
        authorId: validAuthorId
      })

      expect(res).toBeInstanceOf(Post)
      if (!(res instanceof Post)) return
      expect(postRepositoryInstance.createPost)
        .toBeCalledTimes(1)
      expect(postRepositoryInstance.createPost)
        .toBeCalledWith({
          title: validTitle,
          content: validContent,
          authorId: validAuthorId
        })
      expect(res.title).toBe(validTitle)
      expect(res.content).toBe(validContent)
      expect(res.authorId).toBe(validAuthorId)
    })

    test('"title"이 50자 초과일 경우 ValidationError 반환', async () => {
      const invalidTitle = faker.internet.password({
        length: 51
      })

      const res = await createPostInstance.execute({
        title: invalidTitle,
        content: validContent,
        authorId: validAuthorId
      })

      expect(postRepositoryInstance.createPost)
        .toBeCalledTimes(0)

      expect(res).toBeInstanceOf(ValidationError)
      if (!(res instanceof ValidationError)) return
      expect(res.message).toContain('"title"은 50자를 초과할 수 없습니다.')
    })

    test('저장 중 문제가 생겼을 경우 Error 내용을 그대로 반환하는가', async () => {
      const errorMessage = faker.lorem.word()

      postRepositoryInstance.createPost
        .mockResolvedValueOnce(new InternalError(errorMessage))

      const res = await createPostInstance.execute({
        title: validTitle,
        content: validContent,
        authorId: validAuthorId
      })

      expect(postRepositoryInstance.createPost)
        .toBeCalledTimes(1)
      expect(postRepositoryInstance.createPost)
        .toBeCalledWith({
          title: validTitle,
          content: validContent,
          authorId: validAuthorId
        })

      expect(res).toBeInstanceOf(InternalError)
      if (!(res instanceof InternalError)) return
      expect(res.message).toContain(errorMessage)
    })
  })
})

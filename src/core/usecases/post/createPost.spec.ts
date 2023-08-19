import { CreatePost } from './createPost'

import { generateID } from 'core/common/utils/generateID'
import { PostRepository } from 'core/domain/post/Post.repository'
import { Post } from 'core/domain/post/Post.entity'
import { ValidationError } from 'core/common/errors/ValidationError'

describe('사용자 포스트 생성 테스트', () => {
  let postRepositoryInstance: PostRepository
  let createPostInstance: CreatePost

  beforeEach(() => {
    postRepositoryInstance = {
      createPost: jest.fn()
    } as any

    createPostInstance = new CreatePost(postRepositoryInstance)
  })

  test('포스트 정상 생성', async () => {
    const title = '제목'
    const content = '내용'
    const authorId = generateID('USER')

    postRepositoryInstance.createPost = jest.fn()
      .mockResolvedValueOnce(new Post({
        title,
        content,
        authorId
      }))

    const res = await createPostInstance.execute({
      title,
      content,
      authorId
    })

    expect(res.title).toBe(title)
    expect(res.content).toBe(content)
    expect(res.authorId).toBe(authorId)
  })

  test('제목 50자 초과', async () => {
    const title = '01234567890123456789012345678901234567890123456789넘어간다~~~'
    const content = '내용'
    const authorId = generateID('USER')

    postRepositoryInstance.createPost = jest.fn()
      .mockResolvedValueOnce(new Post({
        title,
        content,
        authorId
      }))

    const res = await createPostInstance.execute({
      title,
      content,
      authorId
    }).catch(err => err)

    expect(res).toBeInstanceOf(ValidationError)
    expect(res.message).toContain('"title"')
    expect(res.message).toContain('길이')
    expect(res.message).toContain('50자')
  })

  test('DB 문제', async () => {
    const title = '글'
    const content = '내용'
    const authorId = generateID('USER')
    const repoErrorMessage = 'SQL ERROR'

    postRepositoryInstance.createPost = jest.fn()
      .mockRejectedValueOnce(new Error(repoErrorMessage))

    const res = await createPostInstance.execute({
      title,
      content,
      authorId
    }).catch(err => err)

    expect(res).toBeInstanceOf(Error)
    expect(res.message).toContain(repoErrorMessage)
  })
})

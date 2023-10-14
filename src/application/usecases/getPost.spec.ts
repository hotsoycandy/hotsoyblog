import { GetPost } from './getPost'

import { generateID } from 'common/utils/generateID'
import { PostRepository } from 'domain/post/post.repository'
import { Post } from 'domain/post/post.entity'
import { ResourceNotFound } from 'common/errors/ResourceNotFound'

describe('사용자 단일 포스트 조회 테스트', () => {
  let postRepositoryInstance: jest.Mocked<PostRepository>
  let getPostInstance: GetPost

  beforeEach(() => {
    postRepositoryInstance = {
      getPost: jest.fn()
    } as any

    getPostInstance = new GetPost(postRepositoryInstance)
  })

  test('조건 없이 조회', async () => {
    const title = '제목'
    const content = '내용'
    const authorId = generateID('USER')

    const post = new Post({
      title,
      content,
      authorId
    })

    postRepositoryInstance.getPost
      .mockResolvedValueOnce(post)

    const res = await getPostInstance.execute({ idx: post.idx })

    expect(res.title).toBe(title)
    expect(res.content).toBe(content)
    expect(res.authorId).toBe(authorId)
  })

  test('작성자 아이디와 같이 조회', async () => {
    const title = '제목'
    const content = '내용'
    const authorId = generateID('USER')

    const post = new Post({
      title,
      content,
      authorId
    })

    postRepositoryInstance.getPost
      .mockResolvedValueOnce(post)

    const res = await getPostInstance.execute({ idx: post.idx, authorId })

    expect(res.title).toBe(title)
    expect(res.content).toBe(content)
    expect(res.authorId).toBe(authorId)
  })

  test('존재하지 않는 고유아이디 일 경우', async () => {
    postRepositoryInstance.getPost
      .mockRejectedValueOnce(new ResourceNotFound('포스트 정보를 찾을 수 없습니다.'))

    const res = await getPostInstance.execute({
      idx: generateID('FAKE')
    }).catch(err => err)

    expect(res).toBeInstanceOf(ResourceNotFound)
    expect(res.message).toContain('포스트 정보를 찾을 수 없습니다.')
  })

  test('작성자 아이디가 다를 경우', async () => {
    const title = '제목'
    const content = '내용'
    const authorId = generateID('USER')

    const post = new Post({
      title,
      content,
      authorId
    })

    postRepositoryInstance.getPost
      .mockRejectedValue(new ResourceNotFound('포스트 정보를 찾을 수 없습니다.'))

    const res = await getPostInstance.execute({
      idx: post.idx,
      authorId: generateID('USER')
    }).catch(err => err)

    expect(res).toBeInstanceOf(ResourceNotFound)
    expect(res.message).toContain('포스트 정보를 찾을 수 없습니다.')
  })
})

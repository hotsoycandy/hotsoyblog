import { GetPostList } from './getPostList'

import { generateID } from 'core/common/utils/generateID'
import { PostRepository } from 'core/domain/post/Post.repository'
import { Post } from 'core/domain/post/Post.entity'

describe('사용자 포스트 목록 조회 테스트', () => {
  let postRepositoryInstance: jest.Mocked<PostRepository>
  let getPostListInstance: GetPostList

  beforeEach(() => {
    postRepositoryInstance = {
      getPosts: jest.fn()
    } as any

    getPostListInstance = new GetPostList(postRepositoryInstance)
  })

  test('기본적으로 호출 시 에러가 없어야 한다.', async () => {
    const title = '제목'
    const content = '내용'
    const authorId = generateID('USER')

    const post = new Post({
      title,
      content,
      authorId
    })

    postRepositoryInstance.getPosts
      .mockResolvedValueOnce([post])
    const res = await getPostListInstance.execute()

    expect(res.list).toHaveLength(1)
    expect(res.list[0]?.title).toBe(title)
    expect(res.list[0]?.content).toBe(content)
    expect(res.list[0]?.authorId).toBe(authorId)
    expect(res.limit).toBe(20)
    expect(res.currentPage).toBe(post.idx)
    expect(res.nextPage).toBe(null)
  })

  describe('검색 조건 테스트', () => {
    test('idx를 인자로 넘기면 레포 호출 시 넘겨야한다.', async () => {
      const title = '제목'
      const content = '내용'
      const authorId = generateID('USER')

      const post = new Post({
        title,
        content,
        authorId
      })

      postRepositoryInstance.getPosts
        .mockResolvedValueOnce([post])
      await getPostListInstance.execute({ idx: post.idx })

      expect(postRepositoryInstance.getPosts).toBeCalledWith({ idx: post.idx })
    })

    test('title을 인자로 넘기면 레포 호출 시 넘겨야한다.', async () => {
      const title = '제목'
      const content = '내용'
      const authorId = generateID('USER')

      const post = new Post({
        title,
        content,
        authorId
      })

      postRepositoryInstance.getPosts
        .mockResolvedValueOnce([post])
      await getPostListInstance.execute({ title: post.title })

      expect(postRepositoryInstance.getPosts).toBeCalledWith({ title: post.title })
    })

    test('authorId을 인자로 넘기면 레포 호출 시 넘겨야한다.', async () => {
      const title = '제목'
      const content = '내용'
      const authorId = generateID('USER')

      const post = new Post({
        title,
        content,
        authorId
      })

      postRepositoryInstance.getPosts
        .mockResolvedValueOnce([post])
      await getPostListInstance.execute({ authorId: post.authorId })

      expect(postRepositoryInstance.getPosts).toBeCalledWith({ title: post.title })
    })
  })

  describe('limit 테스트', () => {
    const title = '제목'
    const content = '내용'
    const authorId = generateID('USER')

    let post: Post

    beforeEach(() => {
      post = new Post({
        title,
        content,
        authorId
      })

      postRepositoryInstance.getPosts
        .mockResolvedValueOnce([post])
    })

    test('기본 limit은 20이여야 한다.', async () => {
      const res = await getPostListInstance.execute()
      expect(res.limit).toBe(20)
    })

    test('limit을 넘기면 limit이 돌아와야 한다.', async () => {
      const testLimit = 10

      postRepositoryInstance.getPosts
        .mockResolvedValueOnce([post])
      const res = await getPostListInstance.execute({}, { limit: testLimit })

      expect(res.limit).toBe(testLimit)
    })
  })

  describe('pagination 테스트', () => {
    let posts: Post[] = []

    beforeEach(() => {
      posts = []

      for (let i = 0; i < 30; i++) {
        const post = new Post({
          title: `제목${i}`,
          content: `내용${i}`,
          authorId: generateID('USER')
        })
        posts.push(post)
      }
    })

    test('기본 limit보다 포스트가 많이 있을 때 nextPage를 불러와야 한다.', async () => {
      postRepositoryInstance.getPosts
        .mockResolvedValueOnce(posts.slice(0, 20))
      const res = await getPostListInstance.execute()
      expect(res.list).toHaveLength(20)
      expect(res.limit).toBe(20)
      expect(res.currentPage).toBe(posts[0]?.idx)
      expect(res.nextPage).toBe(posts[20]?.idx)
    })

    test('커스텀 limit보다 포스트가 많이 있을 때 nextPage를 불러와야 한다.', async () => {
      const testLimit = 10
      postRepositoryInstance.getPosts
        .mockResolvedValueOnce(posts.slice(0, testLimit))
      const res = await getPostListInstance.execute({}, { limit: testLimit })

      expect(res.list).toHaveLength(10)
      expect(res.limit).toBe(10)
      expect(res.currentPage).toBe(posts[0]?.idx)
      expect(res.nextPage).toBe(posts[10]?.idx)
    })

    test('커스텀 limit보다 포스트가 적을 때 nextPage은 null이어야 한다.', async () => {
      const testLimit = 10
      postRepositoryInstance.getPosts
        .mockResolvedValueOnce(posts.slice(0, testLimit / 2))
      const res = await getPostListInstance.execute({}, { limit: testLimit })

      expect(res.list).toHaveLength(testLimit / 2)
      expect(res.limit).toBe(10)
      expect(res.currentPage).toBe(posts[0]?.idx)
      expect(res.nextPage).toBe(null)
    })

    test('page를 넘겼을 때 레포에 다음 페이지를 조건을 넘겨야 한다.', async () => {
      postRepositoryInstance.getPosts
        .mockResolvedValueOnce(posts.slice(5, 25))
      const res = await getPostListInstance.execute({}, { page: posts[5]?.idx })

      expect(postRepositoryInstance.getPosts).toBeCalledWith({ idx: { lte: posts[5]?.idx } })
      expect(res.list).toHaveLength(20)
      expect(res.currentPage).toBe(posts[5]?.idx)
      expect(res.nextPage).toBe(posts[25]?.idx)
    })

    test('오름차순에서 page를 넘겼을 때 레포에 다음 페이지를 조건을 넘겨야 한다.', async () => {
      postRepositoryInstance.getPosts
        .mockResolvedValueOnce(posts.slice(5, 25))
      const res = await getPostListInstance.execute({}, { page: posts[5]?.idx, sort: 'ASC' })

      expect(postRepositoryInstance.getPosts).toBeCalledWith({ idx: { gte: posts[5]?.idx } })
      expect(res.list).toHaveLength(20)
      expect(res.currentPage).toBe(posts[5]?.idx)
      expect(res.nextPage).toBe(posts[25]?.idx)
    })
  })
})

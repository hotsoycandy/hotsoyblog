import { UpdatePost } from './updatePost'

import { generateID } from 'core/common/utils/generateID'
import { PostRepository } from 'core/domain/post/Post.repository'
import { Post } from 'core/domain/post/Post.entity'
import { ResourceNotFound } from 'core/common/errors/ResourceNotFound'

describe('사용자 포스트 수정 테스트', () => {
  let postRepositoryInstance: jest.Mocked<PostRepository>
  let updatePostInstance: UpdatePost

  beforeEach(() => {
    postRepositoryInstance = {
      updatePost: jest.fn()
    } as any

    updatePostInstance = new UpdatePost(postRepositoryInstance)
  })

  describe('단일 수정 테스트', () => {
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
    })

    test('올바른 idx를 넘겼을 때 오류가 발생하지 않아야 한다.', async () => {
      postRepositoryInstance.updatePost
        .mockResolvedValueOnce(post)
      const res = await updatePostInstance.execute({ idx: post.idx }, {})

      expect(postRepositoryInstance.updatePost)
        .toBeCalledWith({ idx: post.idx })
      expect(res.idx)
        .toBe(post.idx)
    })

    test('수정 대상 포스트를 찾을 수 없으 경우 "ResourceNotFound" 오류가 발생해야 한다.', async () => {
      const errorMessage = '포스트 정보를 찾을 수 없습니다.'

      postRepositoryInstance.updatePost
        .mockRejectedValueOnce(new ResourceNotFound(errorMessage))
      const res = await updatePostInstance.execute({ idx: generateID('USER') }, {}).catch(err => err)

      expect(postRepositoryInstance.updatePost)
        .toBeCalledWith({ idx: post.idx })
      expect(res)
        .toBeInstanceOf(ResourceNotFound)
      expect(res.message)
        .toContain(errorMessage)
    })

    test('수정할 제목 값을 넘겼을 경우 DB에 제목 수정 값을 넘겨야 한다.', async () => {
      const newTitle = '새로운 제목'

      postRepositoryInstance.updatePost
        .mockResolvedValueOnce(post)
      const res = await updatePostInstance.execute({ idx: generateID('USER') }, { title: newTitle })

      expect(postRepositoryInstance.updatePost)
        .toBeCalledWith({ idx: post.idx }, { title: newTitle })
      expect(res.idx)
        .toBe(post.idx)
    })

    test('수정할 내용 값을 넘겼을 경우 DB에 내용 수정 값을 넘겨야 한다.', async () => {
      const newContent = '새로운 내용'

      postRepositoryInstance.updatePost
        .mockResolvedValueOnce(post)
      const res = await updatePostInstance.execute({ idx: generateID('USER') }, { title: newContent })

      expect(postRepositoryInstance.updatePost)
        .toBeCalledWith({ idx: post.idx }, { title: newContent })
      expect(res.idx)
        .toBe(post.idx)
    })
  })
})

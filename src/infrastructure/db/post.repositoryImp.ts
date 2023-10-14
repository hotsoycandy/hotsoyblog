import { PostRepository } from 'domain/post/post.repository'

export class PostRepositoryImp extends PostRepository {
  async getPost (): Promise<any> {
    return {
      title: 'test',
      content: 'test'
    }
  }

  async createPost (): Promise<any> {
    return {
      id: 1,
      title: 'test',
      content: 'test'
    }
  }

  async updatePost (): Promise<any> {
    return {
      id: 1,
      title: 'test',
      content: 'test'
    }
  }

  async deletePost (): Promise<any> {
    return {
      id: 1,
      title: 'test',
      content: 'test'
    }
  }

  async getPosts (): Promise<any> {
    return {
      id: 1,
      title: 'test',
      content: 'test'
    }
  }
}

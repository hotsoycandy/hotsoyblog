import { Repository } from 'typeorm'
import { AppDataSource } from 'db'
import { Post } from 'domain/post/post.entity'
import { PostRepository } from 'domain/post/post.repository'

export class PostRepositoryImp extends PostRepository {
  public repository: Repository<Post>

  constructor () {
    super()
    this.repository = AppDataSource.getRepository(Post)
  }

  async getPost (): Promise<any> {
    return {
      title: 'test',
      content: 'test'
    }
  }

  async createPost (post: Post): Promise<Post> {
    return await this.repository.save(post)
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

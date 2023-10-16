import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from 'domain/user/user.entity'
import { Post } from 'domain/post/post.entity'

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'ZWADrGj3gawzlTq',
  database: 'hotsoyblog',
  synchronize: true,
  logging: true,
  entities: [User, Post],
  migrations: [],
  subscribers: []
})

export async function connectDB (): Promise<void> {
  await AppDataSource.initialize()
}

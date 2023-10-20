import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from 'domain/user/user.entity'
import { Post } from 'domain/post/post.entity'

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: process.env['DB_HOST'],
  port: parseInt(process.env['DB_PORT'] ?? '3306'),
  username: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_NAME'],
  synchronize: true,
  logging: process.env['NODE_ENV'] === 'development',
  entities: [User, Post]
})

export async function connectDB (): Promise<void> {
  await AppDataSource.initialize()
}

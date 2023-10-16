import { Entity, PrimaryColumn, Column } from 'typeorm'
import { generateID } from 'common/utils/generateID'
import { ValidationError } from 'common/errors/ValidationError'

@Entity()
export class Post {
  @PrimaryColumn()
  readonly idx: string

  @Column()
  public authorId: string

  @Column()
  public title: string

  @Column()
  public content: string

  @Column({
    default: 0
  })
  public viewCount: number

  @Column({
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly createdAt: Date

  @Column({
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly updatedAt: Date

  constructor (createParam: {
    idx?: string
    authorId: string
    title: string
    content: string
    viewCount?: number
    createdAt?: Date
    updatedAt?: Date
  }) {
    this.idx = createParam?.idx ?? generateID('POST')
    this.authorId = createParam?.authorId
    this.title = createParam?.title
    this.content = createParam?.content
    this.viewCount = createParam?.viewCount ?? 0
    this.createdAt = createParam?.createdAt ?? new Date()
    this.updatedAt = createParam?.updatedAt ?? new Date()
  }

  static validatePost <T extends {
    title: string
  }> (postParams: T): T | ValidationError {
    const { title } = postParams
    if (title.length > 50) {
      return new ValidationError('"title"은 50자를 초과할 수 없습니다.')
    }
    return postParams
  }
}

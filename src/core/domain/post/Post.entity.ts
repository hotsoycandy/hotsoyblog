import { generateID } from 'core/common/utils/generateID'

export class Post {
  private readonly _idx: string
  private _authorId: string
  private _title: string
  private _content: string
  private _commentIds: string[]
  private readonly _createAt: Date
  private _updateAt: Date

  constructor (createParam: {
    idx?: string
    authorId: string
    title: string
    content: string
    commentIds: string[]
    createAt?: Date
    updateAt?: Date
  }) {
    this._idx = createParam.idx ?? generateID('POST')
    this._authorId = createParam.authorId
    this._title = createParam.title
    this._content = createParam.content
    this._commentIds = createParam.commentIds
    this._createAt = createParam.createAt ?? new Date()
    this._updateAt = createParam.updateAt ?? new Date()
  }

  // idx
  get idx (): string {
    return this._idx
  }

  // authorId
  get authorId (): string {
    return this._authorId
  }

  set authorId (newAuthorId: string) {
    this._authorId = newAuthorId
  }

  // title
  get title (): string {
    return this._title
  }

  set title (newTitle: string) {
    this._title = newTitle
  }

  // content
  get content (): string {
    return this._content
  }

  set content (newContent: string) {
    this._content = newContent
  }

  // commentIds
  get commentIds (): string[] {
    return this._commentIds
  }

  set commentIds (newCommentIds: string[]) {
    this._commentIds = newCommentIds
  }

  // createAt
  get createAt (): Date {
    return this._createAt
  }

  // updateAt
  get updateAt (): Date {
    return this._updateAt
  }

  set updateAt (newUpdateAt: Date) {
    this._updateAt = newUpdateAt
  }
}

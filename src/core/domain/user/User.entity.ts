import { generateID } from '../../common/utils/generateID'

export class User {
  private readonly _idx: string
  private _email: string
  private _password: string
  private _nickname: string
  private readonly _createdAt: Date
  private _updatedAt: Date

  constructor (createParam: {
    idx?: string
    email: string
    password: string
    nickname: string
    createdAt?: Date
    updatedAt?: Date
  }) {
    this._idx = createParam.idx ?? generateID('USER')
    this._email = createParam.email
    this._password = createParam.password
    this._nickname = createParam.nickname
    this._createdAt = createParam.createdAt ?? new Date()
    this._updatedAt = createParam.updatedAt ?? new Date()
  }

  // idx
  get idx (): string {
    return this._idx
  }

  // id
  get email (): string {
    return this._email
  }

  set email (newEmail: string) {
    this._email = newEmail
  }

  // password
  get password (): string {
    return this._password
  }

  set password (newPassword: string) {
    this._password = newPassword
  }

  // nickname
  get nickname (): string {
    return this._nickname
  }

  set nickname (newNickname: string) {
    this._nickname = newNickname
  }

  // createdAt
  get createdAt (): Date {
    return this._createdAt
  }

  // updatedAt
  get updatedAt (): Date {
    return this._updatedAt
  }

  set updatedAt (newUpdatedAt: Date) {
    this._updatedAt = newUpdatedAt
  }
}

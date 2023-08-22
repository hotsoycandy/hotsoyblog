import { generateID } from '../../common/utils/generateID'

export class User {
  private readonly _idx: string
  private _email: string
  private _password: string
  private _nickname: string
  private readonly _createAt: Date
  private _updateAt: Date

  constructor (createParam: {
    idx: string
    email: string
    password: string
    nickname: string
    createAt: Date
    updateAt: Date
  }) {
    this._idx = createParam.idx ?? generateID('USER')
    this._email = createParam.email
    this._password = createParam.password
    this._nickname = createParam.nickname
    this._createAt = createParam.createAt ?? new Date()
    this._updateAt = createParam.updateAt ?? new Date()
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

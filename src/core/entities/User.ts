import { generateID } from '../common/utils/generateID'

export class User {
  private readonly _idx: string
  private _id: string
  private _password: string
  private _nickname: string
  private readonly _createAt: Date
  private _updateAt: Date

  constructor (createParam: {
    idx: string
    id: string
    password: string
    nickname: string
    createAt: Date
    updateAt: Date
  }) {
    this._idx = createParam.idx ?? generateID('USER')
    this._id = createParam.id
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
  get id (): string {
    return this._id
  }

  set id (newId: string) {
    this._id = newId
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

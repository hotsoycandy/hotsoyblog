interface UserDTOJSON {
  idx: string
  email: string
  nickname: string
  createdAt: string
  updatedAt: string
}

export class UserDTO {
  public idx: string
  public email: string
  public nickname: string
  public createdAt: Date
  public updatedAt: Date

  constructor (
    userDataParams: {
      idx: string
      email: string
      nickname: string
      createdAt: Date
      updatedAt: Date
    }
  ) {
    this.idx = userDataParams.idx
    this.email = userDataParams.email
    this.nickname = userDataParams.nickname
    this.createdAt = userDataParams.createdAt
    this.updatedAt = userDataParams.updatedAt
  }

  toJSON (): UserDTOJSON {
    return {
      idx: this.idx,
      email: this.email,
      nickname: this.nickname,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    }
  }
}

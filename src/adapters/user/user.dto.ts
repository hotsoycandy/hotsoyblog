export class UserDTO {
  public idx: string
  public email: string
  public nickname: string

  constructor (userData: { idx: string, email: string, nickname: string }) {
    this.idx = userData.idx
    this.email = userData.email
    this.nickname = userData.nickname
  }

  toJSON (): { idx: string, email: string, nickname: string } {
    return {
      idx: this.idx,
      email: this.email,
      nickname: this.nickname
    }
  }
}

import crypto from 'crypto'
import { z as zod } from 'zod'
import { Entity, PrimaryColumn, Column } from 'typeorm'
import { generateID } from 'common/utils/generateID'
import { ValidationError } from 'common/errors/ValidationError'

@Entity()
export class User {
  @PrimaryColumn()
  public readonly idx: string

  @Column()
  public email: string

  @Column()
  public password: string

  @Column()
  public nickname: string

  @Column({
    default: () => 'CURRENT_TIMESTAMP'
  })
  public readonly createdAt: Date

  @Column({
    default: () => 'CURRENT_TIMESTAMP'
  })
  public updatedAt: Date

  constructor (createParam: {
    idx?: string
    email: string
    password: string
    nickname: string
    createdAt?: Date
    updatedAt?: Date
  }) {
    this.idx = createParam?.idx ?? generateID('USER')
    this.email = createParam?.email
    this.password = createParam?.password
    this.nickname = createParam?.nickname
    this.createdAt = createParam?.createdAt ?? new Date()
    this.updatedAt = createParam?.updatedAt ?? new Date()
  }

  static async signup (
    userParams: {
      email: string
      password: string
      nickname: string
    },
    utilParams: {
      isEmailDuplicated: (email: string) => Promise<boolean>
    }
  ): Promise<User> {
    // validation
    const validator = zod
      .object({
        email: zod
          .string()
          .email('이메일 형식이 올바르지 않습니다.'),
        password: zod
          .string()
          .regex(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,50}$/,
            '비밀번호는 최소 8자리에 영문, 숫자, 특수문자를 하나 이상 포함하고 있어야 합니다.'),
        nickname: zod
          .string()
          .regex(
            /^[a-zA-Z0-9ㄱ-하ㅏ-ㅣ가-힣_-]{2,20}$/,
            '별명은 영문, 한글, 숫자, _(언더바), -(대시)만 사용할 수 있으며 최소 2자 최대 20자입니다.')
      })
      .strict()

    const validationResult = validator.safeParse(userParams)
    if (!validationResult.success) {
      const validationErrorMessage = validationResult
        .error
        .errors
        .map(err => `"${err.path.join('.')}": ${err.message}`)
        .join('. ')
      throw new ValidationError(validationErrorMessage)
    }

    const { email, password, nickname } = userParams
    const { isEmailDuplicated } = utilParams

    // email duplication check
    if (await isEmailDuplicated(email)) {
      throw new ValidationError('이메일이 중복되었습니다.')
    }

    // return new user
    return new User({
      email: email.toLowerCase(),
      password: User.createHashedPassword(password),
      nickname
    })
  }

  static createHashedPassword (password: string): string {
    return crypto
      .createHash('sha512')
      .update(password)
      .digest('base64')
  }
}

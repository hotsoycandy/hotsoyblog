import { faker } from '@faker-js/faker'
import { User } from 'src/user/entity/user.entity'

export function newMockedUser(): User {
  const user = new User()
  user.idx = faker.number.int({ min: 1, max: 1000000 })
  user.email = faker.internet.email()
  user.password = faker.internet.password({
    length: 16,
    prefix: 'a!1',
  })
  user.nickname = faker.internet.displayName({})
  return user
}

import * as uuid from 'uuid'
import { InternalError } from 'common/errors/InternalError'

/**
 * uuid 기반 unique id 생성 함수. prefix가 있음
 * @see https://www.percona.com/blog/store-uuid-optimized-way/
 * @param {string} prefix - 4자리 문자열
 * @returns - 생성된 uuid
 */
export function generateID (prefix: string): string {
  if (prefix.length !== 4) {
    throw new InternalError('prefix는 4자리만 사용할 수 있습니다.')
  }

  const tokens = uuid.v4().split('-')
  return prefix +
    (tokens[2] ?? '') +
    (tokens[1] ?? '') +
    (tokens[0] ?? '') +
    (tokens[3] ?? '') +
    (tokens[4] ?? '')
}

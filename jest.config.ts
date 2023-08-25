import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.spec.ts'],
  modulePaths: ['<rootDir>/src/'],
  verbose: true
}

export default config

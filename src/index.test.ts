import { defineEnv } from './index'

test('decodes placeholder if it contains object', () => {
  const json = JSON.stringify({ foo: 'bar' })
  const overrides = defineEnv(json)
  expect(overrides).toStrictEqual({ foo: 'bar' })
})

test('returns empty object if placeholder is not replaced', () => {
  const overrides = defineEnv('%__APP_ENV__%')
  expect(overrides).toStrictEqual({})
})

test('logs to console and returns empty if placeholder is replaced with incorrect value', () => {
  const consoleErrorMock = jest.spyOn(global.console, 'warn').mockImplementationOnce(() => {})
  const overrides = defineEnv('{bar}')
  expect(overrides).toStrictEqual({})
  expect(consoleErrorMock).toHaveBeenCalledTimes(1)
})

test('returns objects as is', () => {
  const env = { foo: 'bar' }
  const result = defineEnv(env)
  expect(result).toStrictEqual(env)
})

test('uses global APP_ENV if called without parameters', () => {
  window.APP_ENV = { foo: 'bar' }
  const result = defineEnv()
  expect(result).toStrictEqual(window.APP_ENV)
})

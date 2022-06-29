import { defineOverrides } from '.';

test('decodes placeholder if it contains object', () => {
  const json = JSON.stringify({ foo: 'bar' });
  const overrides = defineOverrides(json);
  expect(overrides).toStrictEqual({ foo: 'bar' });
});

test('returns empty object if placeholder is not replaced', () => {
  const overrides = defineOverrides('%__APP_ENV__%')
  expect(overrides).toStrictEqual({})
})

test('logs to console and returns empty if placeholder is replaced with incorrect value', () => {
  const consoleErrorMock = jest.spyOn(global.console, 'error').mockImplementationOnce(() => {})
  const overrides = defineOverrides('{bar}')
  expect(overrides).toStrictEqual({})
  expect(consoleErrorMock).toHaveBeenCalledTimes(1)
})

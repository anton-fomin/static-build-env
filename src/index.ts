/**
 * @param appEnv - A global variable value which is injected into static files.
 *                 The following cases are handled:
 *                 The value is string starting with { and ending with}:
 *                 meaning that placeholder was replaced by an encoded json
 *                 The value is string: the string placeholder was not replaced
 *                 The value is an object: meaning injection happend and we should return this object
 *                 The value is undefined: fallback to __APP_ENV__ global variable
 *
 * @returns Either empty object or the injected data
 */
declare global {
  interface Window {
    APP_ENV:any;
  }
}

export const defineEnv = (appEnv: string | undefined | unknown = undefined): unknown => {
  let env = appEnv

  if (typeof env === 'undefined' && window.APP_ENV) {
    env = window.APP_ENV
  }
  // The data was substituted by external tool
  if (env && typeof env === 'string') {
    if (env.startsWith('{') && env.endsWith('}')) {
      try {
        env = JSON.parse(env)
      } catch (e) {
        console.warn('Unable to parse appEnv', e)
        return {}
      }
    } else {
      return {}
    }
  }
  return env || {}
}

/**
 * @param placeholder - A string which should be replaced by an escaped json
 *                      by an external tool. (eg "%__APP_ENV__%")
 * @returns Either empty object or the json decoded value of the placeholder replacement
 */
export const defineEnv = (placeholder: string): Record<string, string> => {
  let env = {}
  // The data was substituted by external tool
  if (placeholder && typeof placeholder === 'string' && placeholder.startsWith('{') && placeholder.endsWith('}')) {
    try {
      env = JSON.parse(placeholder)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
  return Object.freeze(env)
}

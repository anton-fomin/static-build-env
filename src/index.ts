/**
 * @param placeholder - A string which should be replaced by an escaped json
 *                      by an external tool. (eg "%__APP_ENV__%")
 * @returns Either empty object or the json decoded value of the placeholder replacement
 */
export const defineOverrides = (placeholder: string): Record<string, string> => {
  let settings = {}
  // The data was substituted by external tool
  if (placeholder && typeof placeholder === 'string' && placeholder.startsWith('{') && placeholder.endsWith('}')) {
    try {
      settings = JSON.parse(placeholder)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
  return Object.freeze(settings)
}

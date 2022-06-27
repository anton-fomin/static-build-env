export const defineSettings = <T extends Object>(
  placeholder: string,
  defaults: () => T,
): T => {
  let settings = {};
  // The data was substituted by external tool
  if (placeholder && typeof placeholder === 'string' && placeholder.startsWith('{') && placeholder.endsWith('}')) {
    try {
      settings = JSON.parse(placeholder);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
  const defs = defaults();
  return { ...defs, ...settings };
};

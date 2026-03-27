export const validators = {
  required: (value: unknown) => {
    if (typeof value === 'string') return value.trim().length > 0;
    return Boolean(value);
  },

  email: (value: unknown) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)),

  minLength: (min: number) => (value: unknown) => {
    if (typeof value === 'string') return value.length >= min;
    return false;
  },

  maxLength: (max: number) => (value: unknown) => {
    if (typeof value === 'string') return value.length <= max;
    return false;
  },

  phone: (value: unknown) => /^\+?[0-9\s\-()]{7,}$/.test(String(value)),

  password: (value: unknown) => {
    const str = String(value);
    return str.length >= 8 && /\d/.test(str);
  },
};

export function validateForm<T extends Record<string, unknown>>(
  values: T,
  schema: Record<string, Array<[RegExp | ((v: unknown) => boolean), string]>>
) {
  const errors: Record<string, string> = {};

  Object.entries(schema).forEach(([field, rules]) => {
    const value = values[field];

    for (const [rule, message] of rules) {
      const isValid = typeof rule === 'function' ? rule(value) : rule.test(String(value));

      if (!isValid) {
        errors[field] = message;
        break;
      }
    }
  });

  return errors;
}

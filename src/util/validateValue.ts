export interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  message?: string;
}

export function validateValue(
  value: string | File | null | undefined,
  rules: ValidationRule[],
): string | null {
  for (const rule of rules) {
    const isFile = value instanceof File;

    // 1. Required
    if (rule.required) {
      if (
        value === null ||
        value === undefined ||
        (typeof value === 'string' && value.trim() === '') ||
        (isFile && !value.name)
      ) {
        return rule.message || 'Field ini wajib diisi';
      }
    }

    if (typeof value === 'string') {
      // 2. Pattern (hanya berlaku untuk string)
      if (rule.pattern && !rule.pattern.test(value)) {
        return rule.message || 'Format tidak valid';
      }

      // 3. minLength
      if (rule.minLength !== undefined && value.length < rule.minLength) {
        return rule.message || `Minimal ${rule.minLength} karakter`;
      }

      // 4. maxLength
      if (rule.maxLength !== undefined && value.length > rule.maxLength) {
        return rule.message || `Maksimal ${rule.maxLength} karakter`;
      }
    }
  }

  return null;
}

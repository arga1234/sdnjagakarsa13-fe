import React, { useCallback, useState } from 'react';
import { validateValue, ValidationRule } from '@/src/util';

interface TextFieldProps {
  label: string;
  placeholder?: string;
  name: string;
  type?: string;
  icon?: React.ReactNode;
  rules?: ValidationRule[];
}

export function TextField({
  label,
  placeholder,
  name,
  type = 'text',
  icon,
  rules = [],
}: TextFieldProps) {
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback(
    (value: string) => {
      const error = validateValue(value, rules);
      setError(error);
      return error ? false : true;
    },
    [rules],
  );

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validate(e.target.value);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validate(e.target.value);
  };

  const isRequired = rules.some((r) => r.required);
  const maxLengthRule = rules.find((r) => r.maxLength !== undefined);
  const maxLength = maxLengthRule?.maxLength;

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        htmlFor={name}
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: 'bold',
        }}
      >
        {isRequired && (
          <span style={{ color: 'red', marginRight: '4px' }}>*</span>
        )}
        {label}
      </label>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--input-background)',
          borderRadius: '5px',
          padding: '10px',
        }}
      >
        {icon && (
          <span style={{ marginRight: '10px', fontSize: '18px' }}>{icon}</span>
        )}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={handleOnChange}
          onBlur={handleBlur}
          maxLength={maxLength}
          style={{
            flex: 1,
            border: 'none',
            fontSize: '16px',
            outline: 'none',
            backgroundColor: 'transparent',
          }}
        />
      </div>

      {error && (
        <div style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>
          {error}
        </div>
      )}
    </div>
  );
}

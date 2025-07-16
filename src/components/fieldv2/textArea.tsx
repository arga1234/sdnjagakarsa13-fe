import React, { useCallback, useState } from 'react';
import { validateValue, ValidationRule } from '@/src/util';

interface TextAreaFieldProps {
  label: string;
  placeholder?: string;
  name: string;
  icon?: React.ReactNode;
  rules?: ValidationRule[];
  rows?: number;
  scale?: number;
}

export function TextAreaField({
  label,
  placeholder,
  name,
  icon,
  rules = [],
  rows = 4,
  scale = 1,
}: TextAreaFieldProps) {
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback(
    (value: string) => {
      const error = validateValue(value, rules);
      setError(error);
      return !error;
    },
    [rules],
  );

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    validate(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    validate(e.target.value);
  };

  const isRequired = rules.some((r) => r.required);
  const maxLengthRule = rules.find((r) => r.maxLength !== undefined);
  const maxLength = maxLengthRule?.maxLength;

  return (
    <div style={{ marginBottom: `${scale * 16}px` }}>
      <label
        htmlFor={name}
        style={{
          display: 'block',
          marginBottom: `${scale * 8}px`,
          fontWeight: 'bold',
          fontSize: `${14 * scale}px`,
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
          alignItems: 'flex-start',
          backgroundColor: 'white',
          borderRadius: `${5 * scale}px`,
          padding: `${10 * scale}px`,
          border: '1px solid #ccc',
        }}
      >
        {icon && (
          <span
            style={{
              marginRight: `${10 * scale}px`,
              fontSize: `${18 * scale}px`,
              paddingTop: `${4 * scale}px`,
            }}
          >
            {icon}
          </span>
        )}
        <textarea
          id={name}
          name={name}
          rows={rows}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={maxLength}
          style={{
            flex: 1,
            width: '100%',
            border: 'none',
            fontSize: `${16 * scale}px`,
            outline: 'none',
            backgroundColor: 'transparent',
            color: 'grey',
            resize: 'vertical',
          }}
        />
      </div>

      {error && (
        <div
          style={{
            color: 'red',
            fontSize: `${12 * scale}px`,
            marginTop: `${5 * scale}px`,
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

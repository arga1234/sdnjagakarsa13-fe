import React, { useCallback, useState } from 'react';
import { ValidationRule, validateValue } from '@/src/util';

interface SelectFieldProps {
  label: string;
  name: string;
  options?: { value: string; label: string }[];
  icon?: React.ReactNode;
  rules?: ValidationRule[];
}

export function SelectField({
  label,
  name,
  options = [],
  icon,
  rules = [],
}: SelectFieldProps) {
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback(
    (value: string) => {
      const error = validateValue(value, rules);
      setError(error);
      return error ? false : true;
    },
    [rules],
  );

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    validate(e.target.value);
  };

  const isRequired = rules.some((r) => r.required);

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
          position: 'relative',
          backgroundColor: 'white',
          borderRadius: '5px',
          padding: '3px 10px',
        }}
      >
        {icon && (
          <span style={{ marginRight: '10px', fontSize: '18px' }}>{icon}</span>
        )}

        <select
          id={name}
          name={name}
          onBlur={handleBlur}
          style={{
            color: 'grey',
            flex: 1,
            padding: '10.4px 0',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: 'white',
            fontSize: '16px',
            outline: 'none',
            appearance: 'none',
            backgroundImage:
              "url(\"data:image/svg+xml;charset=UTF-8,%3Csvg width='14' height='10' viewBox='0 0 14 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l6 6 6-6' stroke='%23666' stroke-width='2' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center',
            backgroundSize: '12px',
          }}
        >
          <option value="">Pilih salah satu</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>
          {error}
        </div>
      )}
    </div>
  );
}

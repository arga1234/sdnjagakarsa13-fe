import { ValidationRule, validateValue } from '@/src/util';
import React, { useRef, useState, ChangeEvent, FocusEvent } from 'react';

interface UploadFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  accept?: string;
  maxSizeMB?: number;
  rules?: ValidationRule[];
}

export function UploadField({
  label,
  name,
  accept,
  placeholder,
  maxSizeMB = 1,
  rules = [],
}: UploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string | null>('');

  const isRequired = rules.some((rule) => rule.required);

  const validate = (file: File | null) => {
    const error = validateValue(file, rules);
    setError(error);
    return error ? false : true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const maxBytes = maxSizeMB * 1024 * 1024;

      if (file.size > maxBytes) {
        setFileName('');
        setError(`Ukuran file maksimal ${maxSizeMB}MB`);
        e.target.value = ''; // reset input
        return;
      }

      setFileName(file.name);
      setError('');
      validate(file);
    } else {
      setFileName('');
      validate(null);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    validate(e.target.files?.[0] || null);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

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
        {isRequired && <span style={{ color: 'red', marginRight: 4 }}>*</span>}
        {label}
      </label>

      <div
        onClick={handleClick}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: 'var(--input-background)',
          fontSize: '16px',
          color: 'var(--foreground)',
          cursor: 'pointer',
          boxSizing: 'border-box',
        }}
      >
        {fileName || placeholder || 'Pilih File'}
      </div>

      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        ref={inputRef}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ display: 'none' }}
      />

      {error && (
        <p style={{ color: 'red', marginTop: '0.5rem', fontSize: '14px' }}>
          {error}
        </p>
      )}
    </div>
  );
}

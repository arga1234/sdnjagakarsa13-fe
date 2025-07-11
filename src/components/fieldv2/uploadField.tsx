'use client';

import React, { useRef, useState, ChangeEvent, FocusEvent } from 'react';
import { ValidationRule, validateValue } from '@/src/util';

interface UploadFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  accept?: string;
  maxSizeMB?: number;
  rules?: ValidationRule[];
  multiple?: boolean;
}

export function UploadField({
  label,
  name,
  accept,
  placeholder,
  maxSizeMB,
  rules = [],
  multiple = false,
}: UploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isRequired = rules.some((rule) => rule.required);

  const validate = (files: File[] | null) => {
    if (!files || files.length === 0) {
      const err = validateValue(null, rules);
      setError(err);
      return !err;
    }

    for (const file of files) {
      if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
        setError(`Ukuran file maksimal ${maxSizeMB}MB`);
        return false;
      }
      const err = validateValue(file, rules);
      if (err) {
        setError(err);
        return false;
      }
    }

    setError(null);
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    if (files.length > 0) {
      const isValid = validate(files);
      if (!isValid) {
        setFileNames([]);
        e.target.value = ''; // Reset input
        return;
      }

      setFileNames(files.map((file) => file.name));
    } else {
      setFileNames([]);
      validate(null);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    validate(files.length > 0 ? files : null);
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
          backgroundColor: 'white',
          fontSize: '16px',
          color: fileNames.length > 0 ? 'black' : 'grey',
          cursor: 'pointer',
          boxSizing: 'border-box',
          textAlign: 'center',
          border: '1px solid #ccc',
        }}
      >
        {fileNames.length > 0
          ? fileNames.join(', ')
          : placeholder || 'Pilih File'}
      </div>

      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
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

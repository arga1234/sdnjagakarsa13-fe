import React, { useRef, useState, ChangeEvent, FocusEvent } from 'react';
import { ValidationRule, validateValue } from '@/src/util';

interface DateFieldProps {
  label: string;
  name: string;
  onChange?: (formatted: string) => void;
  rules?: ValidationRule[];
}

export function DateField({
  label,
  name,
  onChange,
  rules = [],
}: DateFieldProps) {
  const [displayValue, setDisplayValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const isRequired = rules.some((rule) => rule.required);

  const validate = (value: string) => {
    const error = validateValue(value, rules);
    setError(error);
    return error ? false : true;
  };

  const handleHiddenInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value; // yyyy-mm-dd
    if (!rawValue) return;

    const [year, month, day] = rawValue.split('-');
    const formatted = `${day} / ${month} / ${year}`;
    setDisplayValue(formatted);
    if (onChange) onChange(formatted);
    validate(rawValue);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    validate(e.target.value);
  };

  const handleClick = () => {
    hiddenInputRef.current?.showPicker();
  };

  return (
    <div style={{ marginBottom: '1rem', position: 'relative' }}>
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

      {/* Visual Input Field */}
      <div
        onClick={handleClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          padding: '9px 10px',
          border: 'none',
          borderRadius: '5px',
          backgroundColor: 'var(--input-background)',
          fontSize: '16px',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span style={{ fontSize: '18px', marginRight: '10px' }}>📅</span>
        <span style={{ paddingTop: '3px', color: 'var(--foreground)' }}>
          {displayValue || 'hari / bulan / tahun'}
        </span>
      </div>

      {/* Native Hidden Date Picker */}
      <input
        ref={hiddenInputRef}
        type="date"
        id={name}
        name={name}
        onChange={handleHiddenInputChange}
        onBlur={handleBlur}
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          height: 0,
          width: 0,
        }}
      />

      {/* Error Message */}
      {error && (
        <div style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>
          {error}
        </div>
      )}
    </div>
  );
}

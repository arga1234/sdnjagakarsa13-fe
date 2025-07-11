import React, { ChangeEvent } from 'react';

interface CheckboxFieldProps {
  label: string;
  name: string;
  value?: string;
  defaultChecked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function CheckboxField({
  label,
  name,
  defaultChecked = false,
  onChange,
}: CheckboxFieldProps) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          borderRadius: '5px',
          padding: '10px',
          cursor: 'pointer',
          userSelect: 'none',
          lineHeight: '1.5',
        }}
      >
        <input
          onChange={onChange}
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          style={{
            width: '16px',
            height: '16px',
            accentColor: '#0070f3',
            cursor: 'pointer',
          }}
        />
        {label}
      </label>
    </div>
  );
}

"use client";

import { useState } from "react";

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function AnimatedInput({ label, ...props }: AnimatedInputProps) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ marginBottom: 20 }}>
      {label && <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>{label}</label>}
      <input
        {...props}
        onFocus={e => { setFocus(true); props.onFocus?.(e); }}
        onBlur={e => { setFocus(false); props.onBlur?.(e); }}
        style={{
          padding: 12,
          borderRadius: 8,
          border: focus ? '2px solid #0070f3' : '1px solid #ccc',
          boxShadow: focus ? '0 0 0 3px rgba(0,112,243,0.10)' : 'none',
          outline: 'none',
          transition: 'border 0.2s, box-shadow 0.2s',
          width: '100%',
        }}
      />
    </div>
  );
} 
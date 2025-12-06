// src/components/BulkSender/InputForm.tsx
import React from "react";

interface InputFormProps {
  value: string;
  onChange: (val: string) => void;
  disabled: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        Masukkan Daftar Penerima
      </label>
      <p className="text-xs text-gray-500 mb-2">
        Format: <code className="bg-gray-800 p-1 rounded">ALAMAT JUMLAH</code> (pisahkan dengan spasi atau koma)
      </p>
      
      <textarea
        className={`w-full h-64 p-4 bg-gray-800 border border-gray-700 rounded-xl 
        focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none 
        font-mono text-sm text-white transition-all resize-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        placeholder={`Contoh:\n8xyt...abcd 0.5\nDnKw...99x 1.2\n...`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        spellCheck={false}
      />
    </div>
  );
};
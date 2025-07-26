// components/ui/time-picker.tsx
import { useState } from "react";

interface TimePickerProps {
  value?: string;
  onChange: (value: string) => void;
  step?: number; // step in minutes
}

export function TimePicker({ value, onChange, step = 30 }: TimePickerProps) {
  const [selectedTime, setSelectedTime] = useState(value || "");

  const generateTimeOptions = () => {
    const options: string[] = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += step) {
        const hh = String(h).padStart(2, "0");
        const mm = String(m).padStart(2, "0");
        options.push(`${hh}:${mm}`);
      }
    }
    return options;
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
    onChange(e.target.value);
  };

  return (
    <select
      value={selectedTime}
      onChange={handleChange}
      className="border rounded px-2 py-1"
    >
      <option value="">-- Pilih Waktu --</option>
      {generateTimeOptions().map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
}

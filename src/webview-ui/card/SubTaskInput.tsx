import React from "react";

interface SubTaskInputProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}

export const SubTaskInput: React.FC<SubTaskInputProps> = ({ value, onChange, onRemove }) => (
  <div className="subtask-input-row">
    <input
      type="text"
      placeholder="Subtask"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="subtask-input"
    />
    <button
      className="remove-btn add-btn"
      type="button"
      onClick={onRemove}
      aria-label="Remove subtask"
    >
      -
    </button>
  </div>
);
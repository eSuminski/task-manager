
import React from "react";

interface SubTaskInputProps {
  value: string;
}

export const SubTaskInput: React.FC<SubTaskInputProps> = ({ value }) => (
  <div>
    <input type="text" placeholder="Subtask" />
    <button className="remove-btn" type="button">-</button>
  </div>
);

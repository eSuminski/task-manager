import React, { useState } from "react";
import { SubTaskInput } from "./SubTaskInput";

export const CreateCard: React.FC = () => {
  const [subtasks, setSubtasks] = useState<string[]>([""]);

  const handleSubtaskChange = (index: number, value: string) => {
    const updated = [...subtasks];
    updated[index] = value;
    setSubtasks(updated);
  };

  const addSubtask = () => {
    setSubtasks([...subtasks, ""]);
  };

  const removeSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  return (
    <div className="task-card">
      <div className="task-card-title">
        <input type="text" placeholder="Task Title" />
      </div>
      <div className="task-card-description">
        <textarea placeholder="Task Description"></textarea>
      </div>
      <div>
        {subtasks.map((subtask, idx) => (
          <SubTaskInput
            key={idx}
            value={subtask}
            onChange={value => handleSubtaskChange(idx, value)}
            onRemove={() => removeSubtask(idx)}
          />
        ))}
        <button className="add-btn" type="button" onClick={addSubtask}>+</button>
      </div>
      <div className="right-align">
        <button className="add-btn">Add Task</button>
      </div>
    </div>
  );
};
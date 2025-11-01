import React, { useState } from "react";
import { SubTaskInput } from "./SubTaskInput";
import { CreateCardProps } from "../interface/KanbanTaskProps";
import { SubTask } from "../interface/KanbanTaskProps";

export const CreateCard: React.FC<CreateCardProps> = ({onCreateTask}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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

  const handleAddTask = () => {
    if(!title.trim()) return;
    const subtaskStrings = subtasks.filter((st) => st.trim());
    const subtaskData: SubTask[] = []
    subtaskStrings.forEach((st)=>{
      const subtask: SubTask = {
        title:st,
        completed:false
      }
      subtaskData.push(subtask);
    });
    onCreateTask(title, description, subtaskData);
    setTitle("");
    setDescription("");
    setSubtasks([""])
  }

  return (
    <div className="task-card">
      <div className="task-card-title">
        <input type="text" placeholder="Task Title" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="task-card-description">
        <textarea placeholder="Task Description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
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
        <button className="add-btn" onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};
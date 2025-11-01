import React from "react";
import { Task } from "../interface/KanbanTaskProps";


export const TaskCard: React.FC<Task> = ({ title, description, subtasks }) => {
  const [localSubtasks, setLocalSubtasks] = React.useState(subtasks?.map(s => ({ ...s })) || []);
  const handleToggleSubtask = (idx: number, completed: boolean) => {
    setLocalSubtasks(prev =>
      prev.map((s, i) =>
        i === idx ? { ...s, completed } : s
      )
    );
  };
  return (
    <div className="task-card">
      <div className="task-card-title">{title}</div>
      {description && (<div className="task-card-description">{description}</div>)}
      {localSubtasks.length > 0 && (
        <ul className="task-card-subtasks">
          {localSubtasks.map((subtask,idx)=> (
            <li key={idx} className="subtask-row">
              <input type="checkbox" checked={subtask.completed} onChange={e => handleToggleSubtask(idx, e.target.checked)}/>
              <span className={`subtask-title${subtask.completed ? " completed" : ""}`}>{subtask.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
)}
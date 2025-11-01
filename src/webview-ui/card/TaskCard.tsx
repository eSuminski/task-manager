import React from "react";
import { Task } from "../interface/KanbanTaskProps";


export const TaskCard: React.FC<Task> = ({ title, description, subtasks }) => (
  <div className="task-card">
    <div className="task-card-title">{title}</div>
    {description && (<div className="task-card-description">{description}</div>)}
    {subtasks && subtasks.length > 0 && (
      <ul className="task-card-subtasks">
        {subtasks.map((subtask,idx)=> (
          <li key={idx}>
            {subtask.title}
            <input type="checkbox" checked={subtask.completed}/>
          </li>
        ))}
      </ul>
    )}
  </div>
);
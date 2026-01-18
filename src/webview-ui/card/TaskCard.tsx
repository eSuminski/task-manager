import React from "react";
import { Task } from "../interface/KanbanTaskProps";


export const TaskCard: React.FC<Task> = ({ id, title, description, subtasks, status, order }) => {
  const [localSubtasks, setLocalSubtasks] = React.useState(subtasks?.map(s => ({ ...s })) || []);
  const [isDragging, setIsDragging] = React.useState(false);
  const handleToggleSubtask = (idx: number, completed: boolean) => {
    setLocalSubtasks(prev =>
      prev.map((s, i) =>
        i === idx ? { ...s, completed } : s
      )
    );
  };
  const allSubtasksCompleted = localSubtasks.length > 0 && localSubtasks.every(subtask => subtask.completed);
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    //TODO: handle missing id more gracefully
    if (!id) throw new Error("Task ID is missing");
    e.dataTransfer.setData("taskId", id);
    e.dataTransfer.setData("status", status);
    e.dataTransfer.setData("order", order.toString());
    setIsDragging(true);
  };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
  };
  return (
    <div 
      className={`task-card${allSubtasksCompleted ? " all-completed" : ""} ${isDragging ? " dragging" : ""}`} 
      draggable={true}  
      id={id} 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >
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
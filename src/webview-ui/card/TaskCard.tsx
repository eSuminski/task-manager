import React from "react";

interface TaskCardProps {
  title: string;
  description?: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({ title, description }) => (
  <div className="task-card">
    <div className="task-card-title">{title}</div>
    {description && (
      <div className="task-card-description">{description}</div>
    )}
  </div>
);
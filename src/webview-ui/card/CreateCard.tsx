import React from "react";

export const CreateCard: React.FC = () => (
  <div className="task-card">
    <div className="task-card-title">
        <input type="text" placeholder="Task Title" />
    </div>
    <div className="task-card-description">
        <textarea placeholder="Task Description"></textarea>
    </div>
    <div>
        <button className="add-task-btn">Add Task</button>
    </div>
  </div>
);
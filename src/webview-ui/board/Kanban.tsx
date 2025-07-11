import React from 'react';
import { KanbanColumn } from './column';

export const Kanban: React.FC = () => (
  <div className="kanban">
    <KanbanColumn title="To Do"/>
    <KanbanColumn title="In Progress"/>
    <KanbanColumn title="Done"/>
  </div>
);

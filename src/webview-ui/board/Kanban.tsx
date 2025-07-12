import React from 'react';
import { KanbanColumn } from './column';
import { StartColumn } from './StartColumn';
import { TaskCard } from '../card/TaskCard';
import { CreateCard } from '../card/CreateCard';

export const Kanban: React.FC = () => (
  <div className="kanban">
    <StartColumn title="To Do">
      <CreateCard/>
    </StartColumn>
    <KanbanColumn title="In Progress"/>
    <KanbanColumn title="Done"/>
  </div>
);

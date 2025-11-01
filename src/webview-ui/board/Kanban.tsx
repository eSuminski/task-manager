import React from 'react';
import { KanbanColumn } from './column';
import { StartColumn } from './StartColumn';
import { TaskCard } from '../card/TaskCard';
import { CreateCard } from '../card/CreateCard';
import { SubTask, Task } from '../interface/KanbanTaskProps';


export const Kanban: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const handleCreateTask = (title: string, description: string, subTasks: SubTask[]) => {
    const subTasksWithIds: SubTask[] = []
    subTasks.forEach((st,idx)=>{
      st.id = `${Date.now().toString()}-${idx}`;
      subTasksWithIds.push(st);
    });
    const newTask: Task = {
      id: `${Date.now().toString()}`,
      title: title,
      description: description,
      subtasks: subTasksWithIds,
      status:"todo"
    }
    setTasks((prev)=>[...prev, newTask])
  }
  const todoTasks = tasks.filter((task) => task.status === "todo" );
  const doingTasks = tasks.filter((task) => task.status === "doing");
  const doneTasks = tasks.filter((task) => task.status === "done");
  return (
    <div className="kanban">
      <StartColumn title="To Do">
        <CreateCard onCreateTask={handleCreateTask}/>
        {todoTasks.map((task) =>(
          <TaskCard key={task.id} {...task} />
        ))}
      </StartColumn>
      <KanbanColumn title="In Progress">
        {doingTasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}  
      </KanbanColumn>
      <KanbanColumn title="Done">
        {doneTasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </KanbanColumn>
    </div>
  );
}
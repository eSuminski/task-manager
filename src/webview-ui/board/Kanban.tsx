import React from 'react';
import { KanbanColumn } from './column';
import { TaskCard } from '../card/TaskCard';
import { CreateCard } from '../card/CreateCard';
import { SubTask, Task } from '../interface/KanbanTaskProps';
import { DropIndicator } from '../card/DropIndicator';


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
      status:"todo",
      order: tasks.length
    }
    setTasks((prev)=>[...prev, newTask])
  }
  const moveTask = (taskId: string, newStatus: string, newOrder: number) => {
    const task = tasks.find((task) => task.id === taskId);
    if (!task) {
      // TODO: handle gracefully
      throw new Error("Task not found");
    }
    const updatedTask = { ...task, status: newStatus as "todo" | "doing" | "done", order: newOrder };
    setTasks((prevTasks) =>
      prevTasks
        .filter((t) => t.id !== taskId)
        .concat(updatedTask)
    );
  }
  const todoTasks = tasks.filter((task) => task.status === "todo" ).sort((a,b)=> (a.order - b.order));
  const doingTasks = tasks.filter((task) => task.status === "doing").sort((a,b)=> (a.order - b.order));
  const doneTasks = tasks.filter((task) => task.status === "done").sort((a,b)=> (a.order - b.order));
  return (
    <div className="kanban">
      <KanbanColumn title="To Do">
        <CreateCard onCreateTask={handleCreateTask}/>
        {todoTasks.map((task) =>(
          <TaskCard key={task.id} {...task} />         
        ))}
      </KanbanColumn>
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
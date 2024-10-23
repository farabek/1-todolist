import React from 'react';
import { List } from '@mui/material';
// import { TodolistType, TasksStateType } from '../../../../../../app/App';
import { TodolistType } from '../../../../../../app/App';
// import { RootState } from '../../../../../../app/store';
import { Task } from './Task/Task';
import { useAppSelector } from '../../../../../../common/hooks/useAppSelector';
import { selectTasks } from '../../../../model/tasksSelectors';

type Props = {
  todolist: TodolistType;
};

export const Tasks = ({ todolist }: Props) => {
  // const tasks = useAppSelector<RootState, TasksStateType>((state) => state.tasks);
  const tasks = useAppSelector(selectTasks);

  ////////////

  const allTodolistTasks = tasks[todolist.id];
  let tasksForTodolist = allTodolistTasks;

  if (todolist.filter === 'active') {
    tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone);
  }

  if (todolist.filter === 'completed') {
    tasksForTodolist = allTodolistTasks.filter((task) => task.isDone);
  }

  //////////////////

  return (
    <>
      {tasksForTodolist.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist.map((task) => {
            return <Task todolist={todolist} task={task} />;
          })}
        </List>
      )}
    </>
  );
};

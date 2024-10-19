import { Grid2, Paper } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TodolistType, TasksStateType, FilterValuesType } from './app/App';
import { RootState } from './app/store';
import {
  removeTaskAC,
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
} from './model/tasks-reducer';
import {
  changeTodolistFilterAC,
  removeTodolistAC,
  changeTodolistTitleAC,
} from './model/todolists-reducer';
import { Todolist } from './Todolist';

export const Todolists = () => {
  const todolists = useSelector<RootState, TodolistType[]>((state) => state.todolists);
  const tasks = useSelector<RootState, TasksStateType>((state) => state.tasks);

  const dispatch = useDispatch();

  const removeTask = (taskId: string, todolistId: string) => {
    dispatch(removeTaskAC({ taskId, todolistId }));
  };

  const addTask = (title: string, todolistId: string) => {
    dispatch(addTaskAC({ title, todolistId }));
  };

  const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAC({ taskId, isDone: taskStatus, todolistId }));
  };

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC({ taskId, title, todolistId }));
  };

  const changeFilter = (filter: FilterValuesType, id: string) => {
    dispatch(changeTodolistFilterAC({ id, filter }));
  };

  const removeTodolist = (todolistId: string) => {
    dispatch(removeTodolistAC(todolistId));
  };

  const updateTodolist = (id: string, title: string) => {
    dispatch(changeTodolistTitleAC({ id, title }));
  };

  return (
    <>
      {todolists.map((tl) => {
        const allTodolistTasks = tasks[tl.id];
        let tasksForTodolist = allTodolistTasks;

        if (tl.filter === 'active') {
          tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone);
        }

        if (tl.filter === 'completed') {
          tasksForTodolist = allTodolistTasks.filter((task) => task.isDone);
        }

        return (
          <Grid2 key={tl.id}>
            <Paper sx={{ p: '0 20px 20px 20px' }}>
              <Todolist
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={tl.filter}
                removeTodolist={removeTodolist}
                updateTask={updateTask}
                updateTodolist={updateTodolist}
              />
            </Paper>
          </Grid2>
        );
      })}
    </>
  );
};

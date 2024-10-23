import React, { ChangeEvent } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListItem, Checkbox, IconButton } from '@mui/material';
import { TodolistType, TaskType } from '../../../../../../../app/App';
import { EditableSpan } from '../../../../../../../common/components/EditableSpan/EditableSpan';
import { getListItemSx } from './Task.styles';
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from '../../../../../model/tasks-reducer';
import { useAppDispatch } from '../../../../../../../common/hooks/useAppDispatch';

type Props = {
  todolist: TodolistType;
  task: TaskType;
};

export const Task = ({ todolist, task }: Props) => {
  const dispatch = useAppDispatch();

  const removeTaskHandler = () => {
    dispatch(removeTaskAC({ taskId: task.id, todolistId: todolist.id }));
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const isDone = e.currentTarget.checked;
    dispatch(changeTaskStatusAC({ taskId: task.id, isDone, todolistId: todolist.id }));
  };

  const changeTaskTitleHandler = (title: string) => {
    dispatch(changeTaskTitleAC({ taskId: task.id, title, todolistId: todolist.id }));
  };

  return (
    <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

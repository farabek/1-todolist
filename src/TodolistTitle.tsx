import { IconButton } from '@mui/material';
import React from 'react';
import { EditableSpan } from './EditableSpan';
import { removeTodolistAC, changeTodolistTitleAC } from './model/todolists-reducer';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { TodolistType } from './app/App';

type Props = {
  todolist: TodolistType;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist;

  const dispatch = useDispatch();

  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(id));
  };

  const updateTodolistHandler = (title: string) => {
    dispatch(changeTodolistTitleAC({ id, title }));
  };

  return (
    <div className={'todolist-title-container'}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolistHandler} />
      </h3>
      <IconButton onClick={removeTodolistHandler}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

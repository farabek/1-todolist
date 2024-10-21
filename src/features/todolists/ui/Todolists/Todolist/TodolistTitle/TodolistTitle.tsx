import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { TodolistType } from '../../../../../../app/App';
import { EditableSpan } from '../../../../../../common/components/EditableSpan/EditableSpan';
import { removeTodolistAC, changeTodolistTitleAC } from '../../../../model/todolists-reducer';

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

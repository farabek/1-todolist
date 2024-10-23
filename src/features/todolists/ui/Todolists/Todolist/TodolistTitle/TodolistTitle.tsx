import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { TodolistType } from '../../../../../../app/App';
import { EditableSpan } from '../../../../../../common/components/EditableSpan/EditableSpan';
import { removeTodolistAC, changeTodolistTitleAC } from '../../../../model/todolists-reducer';
import { useAppDispatch } from '../../../../../../common/hooks/useAppDispatch';

type Props = {
  todolist: TodolistType;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist;

  const dispatch = useAppDispatch();

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

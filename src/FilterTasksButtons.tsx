import { Box, Button } from '@mui/material';
import React from 'react';
import { filterButtonsContainerSx } from './Todolist.styles';
import { FilterValuesType, TodolistType } from './app/App';
import { changeTodolistFilterAC } from './model/todolists-reducer';
import { useDispatch } from 'react-redux';

type Props = {
  todolist: TodolistType;
};

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { filter, id } = todolist;

  const dispatch = useDispatch();

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC({ id, filter }));
  };

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={filter === 'all' ? 'outlined' : 'text'}
        color={'inherit'}
        onClick={() => changeFilterTasksHandler('all')}>
        All
      </Button>
      <Button
        variant={filter === 'active' ? 'outlined' : 'text'}
        color={'primary'}
        onClick={() => changeFilterTasksHandler('active')}>
        Active
      </Button>
      <Button
        variant={filter === 'completed' ? 'outlined' : 'text'}
        color={'secondary'}
        onClick={() => changeFilterTasksHandler('completed')}>
        Completed
      </Button>
    </Box>
  );
};

import React from 'react';

import { Box, Button } from '@mui/material';
import { TodolistType, FilterValuesType } from '../../../../../../app/App';
import { changeTodolistFilterAC } from '../../../../model/todolists-reducer';
import { filterButtonsContainerSx } from './FilterTasksButtons.styles';
import { useAppDispatch } from '../../../../../../common/hooks/useAppDispatch';

type Props = {
  todolist: TodolistType;
};

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { filter, id } = todolist;

  const dispatch = useAppDispatch();

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

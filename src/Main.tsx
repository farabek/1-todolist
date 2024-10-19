import React from 'react';
import { Container, Grid2 } from '@mui/material';
import { AddItemForm } from './AddItemForm';
import { Todolists } from './Todolists';
import { useDispatch } from 'react-redux';
import { addTodolistAC } from './model/todolists-reducer';

export const Main = () => {
  const dispatch = useDispatch();

  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title));
  };

  return (
    <Container fixed>
      <Grid2 container sx={{ mb: '30px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid2>

      <Grid2 container spacing={4}>
        <Todolists />
      </Grid2>
    </Container>
  );
};

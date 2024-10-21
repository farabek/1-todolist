import { Container, Grid2 } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm';
import { addTodolistAC } from '../features/todolists/model/todolists-reducer';
import { Todolists } from '../features/todolists/ui/Todolists/Todolists';

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

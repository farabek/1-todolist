import { Container, Grid2 } from '@mui/material';
import React from 'react';
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm';
import { addTodolistAC } from '../features/todolists/model/todolists-reducer';
import { Todolists } from '../features/todolists/ui/Todolists/Todolists';
import { useAppDispatch } from '../common/hooks/useAppDispatch';

export const Main = () => {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

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

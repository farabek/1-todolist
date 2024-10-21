import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { Header } from '../common/components/Header/Header';
import { getTheme } from '../common/theme/theme';
import { ThemeMode } from './app-reducer';
import { Main } from './Main';
import { RootState } from './store';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

export const App = () => {
  const themeMode = useSelector<RootState, ThemeMode>((state) => state.app.themeMode);

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  );
};

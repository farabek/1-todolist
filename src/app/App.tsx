// import './App.css';
// import CssBaseline from '@mui/material/CssBaseline';
// import { ThemeProvider } from '@mui/material/styles';
// import { RootState } from './store';
// import { Header } from '../Header';
// import { Main } from '../Main';
// import { ThemeMode } from './app-reducer';
// import { getTheme } from '../common/theme/theme';
// import { useSelector } from 'react-redux';

// export type TaskType = {
//   id: string;
//   title: string;
//   isDone: boolean;
// };

// export type FilterValuesType = 'all' | 'active' | 'completed';

// export type TodolistType = {
//   id: string;
//   title: string;
//   filter: FilterValuesType;
// };

// export type TasksStateType = {
//   [key: string]: TaskType[];
// };

// function App() {
//   const themeMode = useSelector<RootState, ThemeMode>((state) => state.app.themeMode);

//   return (
//     <ThemeProvider theme={getTheme(themeMode)}>
//       <CssBaseline />
//       <Header />
//       <Main />
//     </ThemeProvider>
//   );
// }

// export default App;

//////////////////////////////////////////

import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { RootState } from './store';
import { Header } from '../Header';
import { Main } from '../Main';
import { ThemeMode } from './app-reducer';
import { getTheme } from '../common/theme/theme';
import { useSelector } from 'react-redux';

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

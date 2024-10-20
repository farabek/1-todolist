import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, IconButton, Switch } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeMode, changeThemeAC } from '../../../app/app-reducer';
import { RootState } from '../../../app/store';
import { getTheme } from '../../theme/theme';
import { MenuButton } from '../MenuButton/MenuButton';

export const Header = () => {
  const themeMode = useSelector<RootState, ThemeMode>((state) => state.app.themeMode);

  const dispatch = useDispatch();

  const theme = getTheme(themeMode);

  const changeModeHandler = () => {
    dispatch(changeThemeAC());
  };

  return (
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          <MenuButton>Login</MenuButton>
          <MenuButton>Logout</MenuButton>
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={'default'} onChange={changeModeHandler} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

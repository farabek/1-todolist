import { RootState } from './store';

// 1. Без типизации возвращаемого значения
export const selectThemeMode = (state: RootState) => state.app.themeMode;

// // 2. С типизацией возвращаемого значения
// export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode

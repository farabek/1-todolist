// export type ThemeMode = 'dark' | 'light';

// type InitialState = typeof initialState;

// const initialState = {
//   themeMode: 'light' as ThemeMode,
// };

// export const appReducer = (
//   state: InitialState = initialState,
//   action: ActionsType,
// ): InitialState => {
//   switch (action.type) {
//     case 'CHANGE_THEME':
//     // 3
//     default:
//       return state;
//   }
// };

// // Action creators
// // 1
// export const changeThemeAC = () => {};

// // 2
// // Actions types
// type ChangeThemeActionType = any;

// type ActionsType = ChangeThemeActionType;

////////////////////////////////////////////////////

// export type ThemeMode = 'dark' | 'light';

// type InitialState = typeof initialState;

// const initialState = {
//   themeMode: 'light' as ThemeMode,
// };

// export const appReducer = (
//   state: InitialState = initialState,
//   action: ActionsType,
// ): InitialState => {
//   switch (action.type) {
//     case 'CHANGE_THEME':
//       // 3
//       return {
//         ...state,
//         themeMode: state.themeMode === 'light' ? 'dark' : 'light',
//       };
//     default:
//       return state;
//   }
// };

// // Action type
// const CHANGE_THEME = 'CHANGE_THEME';

// // Action creators
// // 1
// // export const changeThemeAC = () => {};
// export const changeThemeAC = () =>
//   ({
//     type: CHANGE_THEME,
//   } as const);

// // 2
// // Actions types
// // type ChangeThemeActionType = any;
// type ChangeThemeActionType = ReturnType<typeof changeThemeAC>;

// type ActionsType = ChangeThemeActionType;

////////////////////////////////////////////////////

export type ThemeMode = 'dark' | 'light';
// 1. Определяется новый тип `ThemeMode`, который может принимать одно из двух значений: 'dark' (темная тема) или 'light' (светлая тема). Это ограниченный тип, он помогает гарантировать, что тема может быть только одной из этих двух.

type InitialState = typeof initialState;
// 2. Определяется тип `InitialState` на основе типа объекта `initialState`. Это означает, что тип состояния будет автоматически выводиться из структуры объекта `initialState`.

const initialState = {
  themeMode: 'light' as ThemeMode,
};
// 3. Объявляется начальное состояние `initialState`, где свойство `themeMode` по умолчанию установлено в 'light' (светлая тема). Здесь используется приведение типа `as ThemeMode`, чтобы явно указать, что значение соответствует типу `ThemeMode`.

export const appReducer = (
  state: InitialState = initialState,
  action: ActionsType,
): InitialState => {
  // 4. Создается редьюсер `appReducer`, который принимает текущее состояние и действие (action) в качестве аргументов. По умолчанию состояние равно `initialState`. В итоге функция возвращает новое состояние типа `InitialState`.

  switch (action.type) {
    // 5. `switch` используется для обработки различных типов действий, которые могут быть отправлены в редьюсер.

    case 'CHANGE_THEME':
      // 6. Если тип действия равен 'CHANGE_THEME', выполняется логика изменения темы.

      return {
        ...state,
        themeMode: state.themeMode === 'light' ? 'dark' : 'light',
      };
    // 7. Возвращается новое состояние с тем же содержимым, что и в предыдущем состоянии, но с измененным значением `themeMode`. Если текущая тема светлая ('light'), она изменяется на темную ('dark'), и наоборот.

    default:
      return state;
    // 8. Если тип действия не соответствует 'CHANGE_THEME', то возвращается текущее состояние без изменений.
  }
};

// 9. Объявляется константа для строки, представляющей тип действия — 'CHANGE_THEME'. Это делается для предотвращения ошибок при написании строки вручную.
const CHANGE_THEME = 'CHANGE_THEME';

// Action creators
// 10. Объявляется функция-создатель действия `changeThemeAC` (Action Creator), которая возвращает объект действия с типом 'CHANGE_THEME'.
export const changeThemeAC = () =>
  ({
    type: CHANGE_THEME,
  } as const);

// Actions types
// 11. Определяется тип действия `ChangeThemeActionType`, который выводится на основе возвращаемого значения функции `changeThemeAC`. Используется `ReturnType` для автоматического вывода типа возвращаемого значения.
type ChangeThemeActionType = ReturnType<typeof changeThemeAC>;

// 12. Объявляется тип `ActionsType`, который в данном случае представляет собой объединение всех возможных типов действий (в данном примере — только `ChangeThemeActionType`). Это полезно для расширения функциональности в будущем, когда могут появиться новые действия.
type ActionsType = ChangeThemeActionType;

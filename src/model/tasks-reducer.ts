// import { TasksStateType } from '../App';

// export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
//   switch (action.type) {
//     case '': {
//       return state;
//     }

//     default:
//       throw new Error("I don't understand this type");
//   }
// };

// // Action creators
// export const someAC = (todolistId: string) => {
//   return { type: '', payload: {} } as const;
// };

// // Actions types
// export type SomeActionType = ReturnType<typeof someAC>;

// type ActionsType = SomeActionType;

// //////////////////////////////////////////////////////////////////

// import { TasksStateType } from '../App';

// // Action creators
// // export const removeTaskAC = (taskId: string, todolistId: string) => {
// //   return { type: 'REMOVE_TASK', payload: { taskId, todolistId } } as const;
// // };
// export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
//   return {
//     type: 'REMOVE_TASK',
//     payload,
//   } as const;
// };

// // Actions types
// export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;

// type ActionsType = RemoveTaskActionType;

// export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
//   switch (action.type) {
//     case 'REMOVE_TASK': {
//       const { taskId, todolistId } = action.payload;
//       return {
//         ...state,
//         [todolistId]: state[todolistId].filter((task) => task.id !== taskId),
//       };
//     }

//     default:
//       throw new Error("I don't understand this type");
//   }
// };

//////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// tasks-reducer.ts

import { v1 } from 'uuid';
import { TasksStateType } from '../App';
import { addTodolistAC, removeTodolistAC } from './todolists-reducer';

export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
  return {
    type: 'REMOVE_TASK',
    payload,
  } as const;
};

export const addTaskAC = (payload: { title: string; todolistId: string }) => {
  return {
    type: 'ADD_TASK',
    payload,
  } as const;
};

export const changeTaskStatusAC = (payload: {
  taskId: string;
  isDone: boolean;
  todolistId: string;
}) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    payload,
  } as const;
};

export const changeTaskTitleAC = (payload: { taskId: string; title: string; todolistId: string }) =>
  ({
    type: 'CHANGE-TASK-TITLE',
    payload,
  } as const);

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>;
export type changeTaskTitleType = ReturnType<typeof changeTaskTitleAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | changeTaskStatusType
  | changeTaskTitleType
  | AddTodolistActionType
  | RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE_TASK': {
      const { taskId, todolistId } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].filter((task) => task.id !== taskId),
      };
    }
    case 'ADD_TASK': {
      const { title, todolistId } = action.payload;
      const newTask = { id: v1(), title, isDone: false };
      return {
        ...state,
        [todolistId]: [newTask, ...state[todolistId]],
      };
    }
    case 'CHANGE-TASK-STATUS': {
      const stateCopy = { ...state };
      stateCopy[action.payload.todolistId] = state[action.payload.todolistId].map((task) =>
        task.id === action.payload.taskId ? { ...task, isDone: action.payload.isDone } : task,
      );
      return stateCopy;
    }
    case 'CHANGE-TASK-TITLE': {
      const { taskId, title, todolistId } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].map((task) =>
          task.id === taskId ? { ...task, title } : task,
        ),
      };
    }
    case 'ADD-TODOLIST': {
      return { ...state, [action.payload.todolistId]: [] };
    }
    case 'REMOVE-TODOLIST': {
      const stateCopy = { ...state };
      delete stateCopy[action.payload.id];
      return stateCopy;
    }
    default:
      throw new Error("I don't understand this type");
  }
};

//

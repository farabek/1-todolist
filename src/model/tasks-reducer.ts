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

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;

type ActionsType = RemoveTaskActionType | AddTaskActionType;

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

    default:
      throw new Error("I don't understand this type");
  }
};

//

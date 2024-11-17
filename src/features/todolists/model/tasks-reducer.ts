// import { v1 } from "uuid"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import { Dispatch } from "redux"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from "../api/tasksApi.types"
import { RootState } from "app/store"
// import { TaskPriority, TaskStatus } from "common/enums"

// export type TaskType = {
//   id: string
//   title: string
//   isDone: boolean
// }

// export type TasksStateType = {
//   [key: string]: TaskType[]
// }

export type TasksStateType = {
  [key: string]: DomainTask[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "SET-TASKS": {
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy
    }

    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      }
    }

    // case "ADD-TASK": {
    //   // const newTask: TaskType = {
    //   //   title: action.payload.title,
    //   //   isDone: false,
    //   //   id: v1(),
    //   // }
    //   const newTask: DomainTask = {
    //     title: action.payload.title,
    //     todoListId: action.payload.todolistId,
    //     startDate: "",
    //     priority: TaskPriority.Low,
    //     description: "",
    //     deadline: "",
    //     status: TaskStatus.New,
    //     addedDate: "",
    //     order: 0,
    //     id: v1(),
    //   }
    //   return { ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] }
    // }
    case "ADD-TASK": {
      const newTask = action.payload.task
      return { ...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]] }
    }

    // case "CHANGE_TASK_STATUS": {
    //   return {
    //     ...state,
    //     [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
    //       t.id === action.payload.taskId
    //         ? {
    //             ...t,
    //             isDone: action.payload.isDone,
    //           }
    //         : t,
    //     ),
    //   }
    // }

    // case "CHANGE_TASK_TITLE": {
    //   return {
    //     ...state,
    //     [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
    //       t.id === action.payload.taskId
    //         ? {
    //             ...t,
    //             title: action.payload.title,
    //           }
    //         : t,
    //     ),
    //   }
    // }

    case "UPDATE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId
            ? {
                ...t,
                ...action.payload.domainModel,
              }
            : t,
        ),
      }
    }

    case "ADD-TODOLIST":
      return { ...state, [action.payload.todolistId]: [] }

    case "REMOVE-TODOLIST": {
      let copyState = { ...state }
      delete copyState[action.payload.id]
      return copyState
    }

    default:
      return state
  }
}

// Action creators
export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
  return {
    type: "REMOVE-TASK",
    payload,
  } as const
}

// export const addTaskAC = (payload: { title: string; todolistId: string }) => {
//   return {
//     type: "ADD-TASK",
//     payload,
//   } as const
// }
export const addTaskAC = (payload: { task: DomainTask }) => {
  return { type: "ADD-TASK", payload } as const
}

// export const changeTaskStatusAC = (payload: { taskId: string; isDone: boolean; todolistId: string }) => {
//   return {
//     type: "CHANGE_TASK_STATUS",
//     payload,
//   } as const
// }

// export const changeTaskTitleAC = (payload: { taskId: string; title: string; todolistId: string }) => {
//   return {
//     type: "CHANGE_TASK_TITLE",
//     payload,
//   } as const
// }
export const updateTaskAC = (payload: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) => {
  return {
    type: "UPDATE-TASK",
    payload,
  } as const
}

// export const setTasksAC = (payload: { todolistId: string; tasks: TaskType[] }) => {
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return {
    type: "SET-TASKS",
    payload,
  } as const
}

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
// export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
// export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

export type SetTasksActionType = ReturnType<typeof setTasksAC>

// Thunks

// export const fetchTasksThunk = (dispatch: Dispatch) => {
//   tasksApi.getTasks(todolistId).then((res) => {
//     const tasks = res.data.items
//     dispatch(setTasksAC({ todolistId, tasks }))
//   })
// }
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  tasksApi.getTasks(todolistId).then((res) => {
    const tasks = res.data.items
    dispatch(setTasksAC({ todolistId, tasks }))
  })
}

export const removeTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
  tasksApi.deleteTask(arg).then((res) => {
    dispatch(removeTaskAC(arg))
  })
}

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
  tasksApi.createTask(arg).then((res) => {
    dispatch(addTaskAC({ task: res.data.data.item }))
  })
}

export const updateTaskTC =
  (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) =>
  (dispatch: Dispatch, getState: () => RootState) => {
    const { taskId, todolistId, domainModel } = arg

    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find((t) => t.id === taskId)

    if (task) {
      const model: UpdateTaskModel = {
        status: task.status,
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        ...domainModel,
      }

      tasksApi.updateTask({ taskId, todolistId, model }).then((res) => {
        dispatch(updateTaskAC(arg))
      })
    }
  }

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  // | ChangeTaskStatusActionType
  // | ChangeTaskTitleActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTasksActionType

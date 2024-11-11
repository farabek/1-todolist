// import axios from 'axios';
// import {
//   CreateTaskResponse,
//   DeleteTaskResponse,
//   GetTasksResponse,
//   UpdateTaskModel,
//   UpdateTaskResponse,
// } from './tasksApi.types';

// export const tasksApi = {
//   getTasks(todolistId: string) {
//     return axios.get<GetTasksResponse>(
//       `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
//       {
//         headers: {
//           Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
//           'API-KEY': '674ef64a-80a2-4caf-9fa7-d677d328cc97',
//         },
//       },
//     );
//   },

//   createTask(payload: { todolistId: string; title: string }) {
//     const { todolistId, title } = payload;
//     return axios.post<CreateTaskResponse>(
//       `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
//       { title },
//       {
//         headers: {
//           Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
//           'API-KEY': '674ef64a-80a2-4caf-9fa7-d677d328cc97',
//         },
//       },
//     );
//   },

//   deleteTask(payload: { todolistId: string; taskId: string }) {
//     const { todolistId, taskId } = payload;
//     return axios.delete<DeleteTaskResponse>(
//       `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
//       {
//         headers: {
//           Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
//           'API-KEY': '674ef64a-80a2-4caf-9fa7-d677d328cc97',
//         },
//       },
//     );
//   },

//   updateTaskTitle(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
//     const { todolistId, taskId, model } = payload;
//     return axios.put<UpdateTaskResponse>(
//       `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
//       model,
//       {
//         headers: {
//           Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
//           'API-KEY': '674ef64a-80a2-4caf-9fa7-d677d328cc97',
//         },
//       },
//     );
//   },

//   updateTaskStatus(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
//     const { todolistId, taskId, model } = payload;
//     return axios.put<UpdateTaskResponse>(
//       `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
//       model,
//       {
//         headers: {
//           Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
//           'API-KEY': '674ef64a-80a2-4caf-9fa7-d677d328cc97',
//         },
//       },
//     );
//   },
// };

// //
//////////////////////////////////////////////////

import { instance } from "../../../common/instance"
import { BaseResponse } from "../../../common/types"
import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { title: string; todolistId: string }) {
    const { title, todolistId } = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { taskId, todolistId } = payload
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { taskId, todolistId, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}

//

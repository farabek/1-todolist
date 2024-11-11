// import axios from 'axios';
// import {
//   CreateTodolistResponse,
//   DeleteTodolistResponse,
//   Todolist,
//   UpdateTodolistResponse,
// } from './todolistsApi.types';

// export const todolistsApi = {
//   getTodolists() {
//     const promise = axios.get<Todolist[]>(
//       'https://social-network.samuraijs.com/api/1.1/todo-lists',
//       {
//         headers: {
//           Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
//         },
//       },
//     );
//     return promise;
//   },

//   updateTodolist(payload: { id: string; title: string }) {
//     const { title, id } = payload;
//     const promise = axios.put<UpdateTodolistResponse>(
//       `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
//       { title },
//       {
//         headers: {
//           Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
//           'API-KEY': '674ef64a-80a2-4caf-9fa7-d677d328cc97',
//         },
//       },
//     );
//     return promise;
//   },

//   createTodolist(title: string) {
//     const promise = axios.post<CreateTodolistResponse>(
//       'https://social-network.samuraijs.com/api/1.1/todo-lists',
//       { title },
//       {
//         headers: {
//           Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
//           'API-KEY': '674ef64a-80a2-4caf-9fa7-d677d328cc97',
//         },
//       },
//     );
//     return promise;
//   },

//   deleteTodolist(id: string) {
//     const promise = axios.delete<DeleteTodolistResponse>(
//       `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
//       {
//         headers: {
//           Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
//           'API-KEY': '674ef64a-80a2-4caf-9fa7-d677d328cc97',
//         },
//       },
//     );
//     return promise;
//   },
// };

//
///////////////////////////////////////////////////////

// import { instance } from "../../../common/instance"
// import { Todolist, UpdateTodolistResponse, CreateTodolistResponse, DeleteTodolistResponse } from "./todolistsApi.types"

// export const todolistsApi = {
//   getTodolists() {
//     return instance.get<Todolist[]>("todo-lists")
//   },
//   updateTodolist(payload: { id: string; title: string }) {
//     const { title, id } = payload
//     return instance.put<UpdateTodolistResponse>(`todo-lists/${id}`, { title })
//   },
//   createTodolist(title: string) {
//     return instance.post<CreateTodolistResponse>("todo-lists", { title })
//   },
//   deleteTodolist(id: string) {
//     return instance.delete<DeleteTodolistResponse>(`todo-lists/${id}`)
//   },
// }

///////////////////////////////////////////////////

import { instance } from "../../../common/instance"
import { BaseResponse } from "../../../common/types"
import { Todolist } from "./todolistsApi.types"

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("todo-lists")
  },
  updateTodolist(payload: { id: string; title: string }) {
    const { title, id } = payload
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },
}

//

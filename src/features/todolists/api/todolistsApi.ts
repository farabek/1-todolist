import axios from 'axios';
import {
  CreateTodolistResponse,
  DeleteTodolistResponse,
  Todolist,
  UpdateTodolistResponse,
} from './todolistsApi.types';

export const todolistsApi = {
  getTodolists() {
    const promise = axios.get<Todolist[]>(
      'https://social-network.samuraijs.com/api/1.1/todo-lists',
      {
        headers: {
          Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
        },
      },
    );
    return promise;
  },

  updateTodolist(payload: { id: string; title: string }) {
    const { title, id } = payload;
    const promise = axios.put<UpdateTodolistResponse>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
      { title },
      {
        headers: {
          Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
          'API-KEY': '674ef64a-80a2-4caf-9fa7-d677d328cc97',
        },
      },
    );
    return promise;
  },

  createTodolist(title: string) {
    const promise = axios.post<CreateTodolistResponse>(
      'https://social-network.samuraijs.com/api/1.1/todo-lists',
      { title },
      {
        headers: {
          Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
          'API-KEY': '674ef64a-80a2-4caf-9fa7-d677d328cc97',
        },
      },
    );
    return promise;
  },

  deleteTodolist(id: string) {
    const promise = axios.delete<DeleteTodolistResponse>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
      {
        headers: {
          Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
          'API-KEY': '674ef64a-80a2-4caf-9fa7-d677d328cc97',
        },
      },
    );
    return promise;
  },
};

import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm';
import { EditableSpan } from '../common/components/EditableSpan/EditableSpan';

const token = '';
const apiKey = '';

const options = {
  headers: {
    Authorization: `Bearer ${token}`,
    'API-KEY': apiKey,
  },
};

type Todolist = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

type Task = {
  description: string | null;
  title: string;
  status: TaskStatus;
  priority: number;
  startDate: string | null;
  deadline: string | null;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

enum TaskStatus {
  notReady,
  done = 2,
}

type FieldError = {
  error: string;
  field: string;
};

type GetTasksResponse = {
  totalCount: number;
  error: string;
  items: Task[];
};

type UpdateTaskModel = {
  description: string | null;
  title: string;
  status: TaskStatus;
  priority: number;
  startDate: string | null;
  deadline: string | null;
};

type Response<T = {}> = {
  data: T;
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
};

type DeleteTaskResponse = {
  resultCode: number;
  messages: string[];
  data: object;
};

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([]);
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({});

  useEffect(() => {
    axios
      .get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const todolists = res.data;
        setTodolists(todolists);
        todolists.forEach((tl) => {
          axios
            .get<GetTasksResponse>(
              `https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`,
              options,
            )
            .then((res) => {
              setTasks((prevState) => ({
                ...prevState,
                [tl.id]: res.data.items,
              }));
            });
        });
      });
  }, []);

  const createTodolistHandler = (title: string) => {
    axios
      .post<Response<{ item: Todolist }>>(
        'https://social-network.samuraijs.com/api/1.1/todo-lists',
        { title },
        options,
      )
      .then((res) => {
        const newTodolist = res.data.data.item;
        setTodolists((prevState) => [newTodolist, ...prevState]);
      });
  };

  const removeTodolistHandler = (id: string) => {
    axios
      .delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, options)
      .then(() => {
        setTodolists((prevState) => prevState.filter((tl) => tl.id !== id));
      });
  };

  const updateTodolistHandler = (id: string, title: string) => {
    axios
      .put<Response>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
        { title },
        options,
      )
      .then(() => {
        setTodolists((prevState) => prevState.map((tl) => (tl.id === id ? { ...tl, title } : tl)));
      });
  };

  const createTaskHandler = (title: string, todolistId: string) => {
    axios
      .post<Response<{ item: Task }>>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
        { title },
        options,
      )
      .then((res) => {
        setTasks((prevState) => ({
          ...prevState,
          [todolistId]: [res.data.data.item, ...(prevState[todolistId] || [])],
        }));
      });
  };

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    axios
      .delete<DeleteTaskResponse>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
        options,
      )
      .then((res) => {
        if (res.data.resultCode === 0) {
          setTasks((prevState) => ({
            ...prevState,
            [todolistId]: prevState[todolistId].filter((task) => task.id !== taskId),
          }));
        }
      });
  };

  const changeTaskStatusHandler = (
    e: ChangeEvent<HTMLInputElement>,
    task: Task,
    todolistId: string,
  ) => {
    const model: UpdateTaskModel = {
      description: task.description,
      title: task.title,
      status: e.currentTarget.checked ? TaskStatus.done : TaskStatus.notReady,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    };

    axios
      .put<Response<{ item: Task }>>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`,
        model,
        options,
      )
      .then((res) => {
        const newTask = res.data.data.item;
        setTasks((prevState) => ({
          ...prevState,
          [todolistId]: prevState[todolistId].map((t) => (t.id === task.id ? newTask : t)),
        }));
      });
  };

  const changeTaskTitleHandler = (title: string, task: Task) => {
    const todolistId = task.todoListId;

    const model: UpdateTaskModel = {
      description: task.description,
      title: title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    };

    axios
      .put<Response<{ item: Task }>>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`,
        model,
        options,
      )
      .then((res) => {
        if (res.data.resultCode === 0) {
          const updatedTask = res.data.data.item;
          setTasks((prevState) => ({
            ...prevState,
            [todolistId]: prevState[todolistId].map((t) => (t.id === task.id ? updatedTask : t)),
          }));
        }
      });
  };

  return (
    <div style={{ margin: '20px' }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan
                value={tl.title}
                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
              />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task) => {
                return (
                  <div key={task.id}>
                    <Checkbox
                      checked={task.status === TaskStatus.done}
                      onChange={(e) => changeTaskStatusHandler(e, task, tl.id)}
                    />
                    <EditableSpan
                      value={task.title}
                      onChange={(title) => changeTaskTitleHandler(title, task)}
                    />
                    <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

// Styles
const todolist: React.CSSProperties = {
  border: '1px solid black',
  margin: '20px 0',
  padding: '10px',
  width: '300px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
};

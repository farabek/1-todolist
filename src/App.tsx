import './App.css';
import { Todolist } from './Todolist';
import { useState } from 'react';
import { v1 } from 'uuid';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

function App() {
  // const [tasks, setTasks] = useState<TaskType[]>([
  //   { id: v1(), title: 'HTML&CSS', isDone: true },
  //   { id: v1(), title: 'JS', isDone: true },
  //   { id: v1(), title: 'ReactJS', isDone: false },
  // ]);

  // const [filter, setFilter] = useState<FilterValuesType>('all');

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  });

  /////////////////////////////////////////////////////////////////
  // const removeTask = (taskId: string) => {
  //   const filteredTasks = tasks.filter((task) => {
  //     return task.id !== taskId;
  //   });
  //   setTasks(filteredTasks);
  // };

  // // 1 ВАРИАНТ
  // const removeTask = (taskId: string, todolistId: string) => {
  //   // 1. Найдем таски для тудулиста, в котором будет происходить удаление
  //   const todolistTasks = tasks[todolistId]
  //   // 2. Удалим таску по которой кликнули
  //   const newTodolistTasks = todolistTasks.filter(t => t.id !== taskId)
  //   // 3. Перезапишем массив тасок на новый (отфильтрованный) массив
  //   tasks[todolistId] = newTodolistTasks
  //   // 4. Засетаем в state копию объекта, чтобы React отреагировал перерисовкой
  //   setTasks({ ...tasks, newTodolistTasks })
  // }
  // 2 ВАРИАНТ
  const removeTask = (taskId: string, todolistId: string) => {
    const newTodolistTasks = {
      ...tasks,
      [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId),
    };
    setTasks(newTodolistTasks);
  };
  // // 3 ВАРИАНТ
  // setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) })

  /////////////////////////////////////////////////////////////////////

  // const addTask = (title: string) => {
  //   const newTask = {
  //     id: v1(),
  //     title: title,
  //     isDone: false,
  //   };
  //   const newTasks = [newTask, ...tasks];
  //   setTasks(newTasks);
  // };

  // // 1 ВАРИАНТ
  // const addTask = (title: string, todolistId: string) => {
  //   // 1. Создадим новую таску
  //   const newTask = {
  //     id: v1(),
  //     title: title,
  //     isDone: false,
  //   };
  //   // 2. Найдем массив тасок для тудулиста, в который будем добавлять новую таску
  //   const todolistTasks = tasks[todolistId];
  //   // 3. Перезапишем массив тасок на новый массив, добавив в начало новую таску
  //   tasks[todolistId] = [newTask, ...todolistTasks];
  //   // 4. Засетаем в state копию объекта, чтобы React отреагировал перерисовкой
  //   setTasks({ ...tasks });
  // };
  // 2 ВАРИАНТ
  const addTask = (title: string, todolistId: string) => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    const newTodolistTasks = { ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] };
    setTasks(newTodolistTasks);
  };
  // // 3 ВАРИАНТ
  // const addTask = (title: string, todolistId: string) => {
  //   const newTask = {
  //     id: v1(),
  //     title: title,
  //     isDone: false,
  //   };
  //   setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
  // };

  /////////////////////////////////////////////////////////////////////

  // const changeFilter = (filter: FilterValuesType) => {
  //   setFilter(filter);
  // };
  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    const newTodolists = todolists.map((tl) => {
      return tl.id === todolistId ? { ...tl, filter } : tl;
    });
    setTodolists(newTodolists);
  };

  /////////////////////////////////////////////////////////////////////

  // const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
  //   const newState = tasks.map((t) => (t.id === taskId ? { ...t, isDone: taskStatus } : t));
  //   setTasks(newState);
  // };
  // // 1 ВАРИАНТ
  // const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
  //   // 1. Найдем таски для тудулиста, в котором будет происходить изменение
  //   const todolistTasks = tasks[todolistId]
  //   // 2. Пробежимся по таскам и изменим статус таски по которой нажали
  //   const newTodolistTasks = todolistTasks.map(t =>
  //     t.id === taskId ? { ...t, isDone: taskStatus } : t
  //   )
  //   // 3. Перезапишем массив тасок на новый массив, с уже измененным статусом у таски
  //   tasks[todolistId] = newTodolistTasks
  //   // 4. Засетаем в state копию объекта, чтобы React отреагировал перерисовкой
  //   setTasks({ ...tasks })
  // }
  // 2 ВАРИАНТ
  const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
    const newTodolistTasks = {
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) =>
        t.id === taskId ? { ...t, isDone: taskStatus } : t,
      ),
    };
    setTasks(newTodolistTasks);
  };
  // // 3 ВАРИАНТ
  // const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
  //   setTasks({
  //     ...tasks,
  //     [todolistId]: tasks[todolistId].map((t) =>
  //       t.id === taskId ? { ...t, isDone: taskStatus } : t,
  //     ),
  //   });
  // };

  /////////////////////////////////////////////////////////////////////

  const removeTodolist = (todolistId: string) => {
    const newTodolists = todolists.filter((tl) => tl.id !== todolistId);
    setTodolists(newTodolists);

    // удалим таски для тудулиста из стейта где мы храним таски
    delete tasks[todolistId];
    // засетаем в state копию объекта
    setTasks({ ...tasks });
  };

  /////////////////////////////////////////////////////////////////////

  // let tasksForTodolist = tasks;
  // if (filter === 'active') {
  //   tasksForTodolist = tasks.filter((task) => !task.isDone);
  // }

  // if (filter === 'completed') {
  //   tasksForTodolist = tasks.filter((task) => task.isDone);
  // }

  // return (
  //   <div className="App">
  //     <Todolist
  //       title="What to learn"
  //       tasks={tasksForTodolist}
  //       removeTask={removeTask}
  //       changeFilter={changeFilter}
  //       addTask={addTask}
  //       changeTaskStatus={changeTaskStatus}
  //       filter={filter}
  //     />
  //   </div>
  // );

  return (
    <div className="App">
      {todolists.map((tl) => {
        const allTodolistTasks = tasks[tl.id];
        let tasksForTodolist = allTodolistTasks;

        if (tl.filter === 'active') {
          tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone);
        }

        if (tl.filter === 'completed') {
          tasksForTodolist = allTodolistTasks.filter((task) => task.isDone);
        }

        return (
          <Todolist
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;

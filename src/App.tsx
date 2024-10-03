// App.tsx

import AddItemForm from './AddItemForm';
import './App.css';
import {
  addTaskAC,
  changeStatusTask,
  changeStatusTitle,
  removeTaskAC,
  taskReducer,
} from './model/tasks-reducer';
import { Todolist } from './Todolist';
import { useReducer } from 'react';
import { v1 } from 'uuid';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from './model/todolists-reducer';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ]);

  let [tasks, dispatchTasks] = useReducer(taskReducer, {
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

  function removeTask(id: string, todolistId: string) {
    dispatchTasks(removeTaskAC(id, todolistId));
  }

  function addTask(title: string, todolistId: string) {
    dispatchTasks(addTaskAC(todolistId, title));
  }

  function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
    dispatchTasks(changeStatusTask(taskId, isDone, todolistId));
  }

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    dispatchTasks(changeStatusTitle(todolistId, taskId, title));
  };

  function changeFilter(filter: FilterValuesType, todolistId: string) {
    dispatchTodolists(changeTodolistFilterAC(todolistId, filter));
  }

  function removeTodolist(todolistId: string) {
    dispatchTodolists(removeTodolistAC(todolistId));
  }

  function addTodoList(title: string) {
    const todolistId = v1(); // Создаем новый уникальный ID для списка дел
    dispatchTodolists(addTodolistAC(todolistId, title)); // Добавляем список дел
    // и редюсер задач добавит пустой массив
  }

  function updateTodolist(todolistId: string, title: string) {
    dispatchTodolists(changeTodolistTitleAC(todolistId, title));
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />

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
            updateTask={updateTask}
            updateTodolist={updateTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;

//

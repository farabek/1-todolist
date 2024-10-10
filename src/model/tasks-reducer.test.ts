// tasks-reducer.test.ts

import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from './tasks-reducer';
import { TasksStateType } from '../App';
import { addTodolistAC, removeTodolistAC } from './todolists-reducer';

test('correct task should be deleted from correct array', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  };

  //   const endState = tasksReducer(startState, removeTaskAC('2', 'todolistId2'));
  const endState = tasksReducer(
    startState,
    removeTaskAC({
      taskId: '2',
      todolistId: 'todolistId2',
    }),
  );

  expect(endState).toEqual({
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '3', title: 'tea', isDone: false },
    ],
  });
});

test('correct task should be added to correct array', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  };

  const endState = tasksReducer(
    startState,
    addTaskAC({ title: 'juce', todolistId: 'todolistId2' }),
  );

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(4);
  expect(endState['todolistId2'][0].id).toBeDefined();
  expect(endState['todolistId2'][0].title).toBe('juce');
  expect(endState['todolistId2'][0].isDone).toBe(false);
});
// Здесь мы проверяем, что после добавления новой таски в правильный массив (todolistId2),
// количество тасок в todolistId1 остаётся прежним (3), так как мы ничего не добавляем в этот список.
// Количество тасок в todolistId2 увеличивается на одну, поэтому ожидаем 4 таски.
// Также проверяем, что новая таска добавлена в начало списка, для этого проверяем, что у первой таски есть id,
// её название соответствует 'juice', и она изначально не выполнена (isDone: false).
// Таким образом, мы проверяем, что редьюсер правильно добавляет новую задачу в список и не изменяет другие списки.
//
test('status of specified task should be changed', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  };

  const endState = tasksReducer(
    startState,
    changeTaskStatusAC({
      taskId: '2',
      isDone: false,
      todolistId: 'todolistId2',
    }),
  );

  // Проверяем, что у второй таски в todolistId2 статус изменился на false
  expect(endState['todolistId2'][1].isDone).toBe(false);

  // Проверяем, что в других списках и тасках статус не изменился
  expect(endState['todolistId1'][1].isDone).toBe(true); // JS в todolistId1 осталась true
  expect(endState['todolistId2'][2].isDone).toBe(false); // tea в todolistId2 осталась false
});

//

test('title of specified task should be changed', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  };

  const endState = tasksReducer(
    startState,
    changeTaskTitleAC({
      taskId: '2',
      title: 'water',
      todolistId: 'todolistId2',
    }),
  );

  expect(endState['todolistId2'][1].title).toBe('water');
  expect(endState['todolistId1'][1].title).toBe('JS');
});
// Здесь тест проверяет, что при изменении заголовка задачи в конкретном
// тудулисте, изменяется только указанная задача, а другие остаются нетронутыми.

//

test('property with todolistId should be deleted', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  };

  const action = removeTodolistAC('todolistId2');

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['todolistId2']).not.toBeDefined();
  // or
  expect(endState['todolistId2']).toBeUndefined();
});

//

test('new array should be added when new todolist is added', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  };

  const endState = tasksReducer(startState, addTodolistAC('new todolist'));

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== 'todolistId1' && k !== 'todolistId2');
  if (!newKey) {
    throw Error('new key should be added');
  }

  // Проверка на наличие нового массива для нового тудулиста
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
// Тест проверяет, что при добавлении нового тудулиста создается новый ключ в объекте state, который хранит массив задач.
// Проверка осуществляется через сравнение длины массива ключей Object.keys(endState) и через наличие пустого массива для нового тудулиста.

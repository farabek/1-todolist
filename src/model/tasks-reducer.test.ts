// tasks-reducer.test.ts

import { addTaskAC, removeTaskAC, tasksReducer } from './tasks-reducer';
import { TasksStateType } from '../App';

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

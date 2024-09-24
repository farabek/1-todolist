import { FilterValuesType, TaskType } from './App';
import { ChangeEvent } from 'react';
// import { Button } from './Button';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

type PropsType = {
  title: string;
  todolistId: string;
  tasks: TaskType[];
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (filter: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
  updateTask: (todolistId: string, taskId: string, title: string) => void;
  updateTodolist: (todolistId: string, title: string) => void;
};

export const Todolist = (props: PropsType) => {
  const {
    title,
    tasks,
    filter,
    removeTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    todolistId,
    removeTodolist,
    updateTask,
    updateTodolist,
  } = props;

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(filter, props.todolistId);
  };

  const removeTodolistHandler = () => {
    removeTodolist(todolistId);
  };

  const addTaskCallback = (title: string) => {
    addTask(title, props.todolistId);
  };

  const updateTodolistHandler = (title: string) => {
    updateTodolist(props.todolistId, title);
  };

  return (
    <div>
      <div className={'todolist-title-container'}>
        <h3>
          <EditableSpan value={title} onChange={updateTodolistHandler} />
        </h3>
        {/* <Button title={'x'} onClick={removeTodolistHandler} /> */}
        <IconButton onClick={removeTodolistHandler}>
          <DeleteIcon />
        </IconButton>{' '}
      </div>
      <AddItemForm addItem={addTaskCallback} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        // <ul>
        <List>
          {tasks.map((task) => {
            const removeTaskHandler = () => {
              removeTask(task.id, todolistId);
            };

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(task.id, newStatusValue, todolistId);
            };

            const changeTaskTitleHandler = (title: string) => {
              updateTask(todolistId, task.id, title);
            };

            return (
              //   <li
              <ListItem key={task.id} className={task.isDone ? 'is-done' : ''}>
                {/* <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} /> */}
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />{' '}
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
                <Button onClick={removeTaskHandler} title={'x'} />
                <IconButton onClick={removeTaskHandler}>
                  <DeleteIcon />
                </IconButton>{' '}
                {/* </li> */}
              </ListItem>
            );
          })}
          {/* </ul> */}
        </List>
      )}
      {/* <div>
        <Button
          className={filter === 'all' ? 'active-filter' : ''}
          title={'All'}
          onClick={() => changeFilterTasksHandler('all')}
        />
        <Button
          className={filter === 'active' ? 'active-filter' : ''}
          title={'Active'}
          onClick={() => changeFilterTasksHandler('active')}
        />
        <Button
          className={filter === 'completed' ? 'active-filter' : ''}
          title={'Completed'}
          onClick={() => changeFilterTasksHandler('completed')}
        />
      </div> */}
      <div>
        <Button
          variant={filter === 'all' ? 'outlined' : 'text'}
          color={'inherit'}
          onClick={() => changeFilterTasksHandler('all')}>
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'outlined' : 'text'}
          color={'primary'}
          onClick={() => changeFilterTasksHandler('active')}>
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'outlined' : 'text'}
          color={'secondary'}
          onClick={() => changeFilterTasksHandler('completed')}>
          Completed
        </Button>
      </div>{' '}
    </div>
  );
};

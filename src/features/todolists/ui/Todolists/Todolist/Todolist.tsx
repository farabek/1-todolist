// import { AddItemForm } from './AddItemForm';
// import { FilterValuesType, TaskType, TodolistType } from './app/App';
// import { FilterTasksButtons } from './FilterTasksButtons';
// import { TodolistTitle } from './TodolistTitle';
// import { Tasks } from './Tasks';

// type PropsType = {
//   //   title: string;
//   //   todolistId: string;
//   //   filter: FilterValuesType;
//   todolist: TodolistType;
//   tasks: TaskType[];
//   removeTask: (taskId: string, todolistId: string) => void;
//   changeFilter: (filter: FilterValuesType, todolistId: string) => void;
//   addTask: (title: string, todolistId: string) => void;
//   changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void;
//   removeTodolist: (todolistId: string) => void;
//   updateTask: (todolistId: string, taskId: string, title: string) => void;
//   updateTodolist: (todolistId: string, title: string) => void;
// };

// export const Todolist = (props: PropsType) => {
//   const {
//     todolist,
//     // tasks,
//     // removeTask,
//     addTask,
//     // changeTaskStatus,
//     // removeTodolist,
//     // updateTask,
//     // updateTodolist,
//   } = props;

//   //   const changeFilterTasksHandler = (filter: FilterValuesType) => {
//   //     changeFilter(filter, props.todolistId);
//   //   };

//   //   const removeTodolistHandler = () => {
//   //     removeTodolist(todolist.id);
//   //   };

//   const addTaskCallback = (title: string) => {
//     addTask(title, props.todolist.id);
//   };

//   //   const updateTodolistHandler = (title: string) => {
//   //     updateTodolist(props.todolist.id, title);
//   //   };

//   return (
//     <div>
//       <div className={'todolist-title-container'}>
//         <TodolistTitle todolist={todolist} />
//       </div>
//       <AddItemForm addItem={addTaskCallback} />
//       {/* {tasks.length === 0 ? (
//         <p>Тасок нет</p>
//       ) : (
//         <List>
//           {tasks.map((task) => {
//             const removeTaskHandler = () => {
//               removeTask(task.id, todolist.id);
//             };

//             const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
//               const newStatusValue = e.currentTarget.checked;
//               changeTaskStatus(task.id, newStatusValue, todolist.id);
//             };

//             const changeTaskTitleHandler = (title: string) => {
//               updateTask(todolist.id, task.id, title);
//             };
//             return (
//               <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
//                 <div>
//                   <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
//                   <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
//                 </div>
//                 <IconButton onClick={removeTaskHandler}>
//                   <DeleteIcon />
//                 </IconButton>
//               </ListItem>
//             );
//           })}
//         </List>
//       )} */}
//       <Tasks todolist={todolist} />
//       <FilterTasksButtons todolist={todolist} />
//     </div>
//   );
// };

///////////////////////////////////////////

import { useDispatch } from 'react-redux';
import { TodolistType } from '../../../../../app/App';
import { AddItemForm } from '../../../../../common/components/AddItemForm/AddItemForm';
import { addTaskAC } from '../../../model/tasks-reducer';
import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons';
import { Tasks } from './Tasks/Tasks';
import { TodolistTitle } from './TodolistTitle/TodolistTitle';

type PropsType = {
  todolist: TodolistType;
};

export const Todolist = ({ todolist }: PropsType) => {
  const dispatch = useDispatch();

  const addTaskCallback = (title: string) => {
    dispatch(addTaskAC({ title, todolistId: todolist.id }));
  };

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </>
  );
};

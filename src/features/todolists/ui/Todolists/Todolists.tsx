// import { Grid2, Paper } from '@mui/material';
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { TodolistType } from './app/App';
// import { RootState } from './app/store';
// import { Todolist } from './Todolist';

// export const Todolists = () => {
//   const todolists = useSelector<RootState, TodolistType[]>((state) => state.todolists);

//   return (
//     <>
//       {todolists.map((tl) => {
//         // const allTodolistTasks = tasks[tl.id];
//         // let tasksForTodolist = allTodolistTasks;

//         // if (tl.filter === 'active') {
//         //   tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone);
//         // }

//         // if (tl.filter === 'completed') {
//         //   tasksForTodolist = allTodolistTasks.filter((task) => task.isDone);
//         // }

//         return (
//           <Grid2 key={tl.id}>
//             <Paper sx={{ p: '0 20px 20px 20px' }}>
//               <Todolist
//                 key={tl.id}
//                 // todolistId={tl.id}
//                 // filter={tl.filter}
//                 // title={tl.title}
//                 todolist={tl}
//                 // tasks={tasksForTodolist}
//                 // removeTask={removeTask}
//                 // changeFilter={changeFilter}
//                 // addTask={addTask}
//                 // changeTaskStatus={changeTaskStatus}
//                 // removeTodolist={removeTodolist}
//                 // updateTask={updateTask}
//                 // updateTodolist={updateTodolist}
//               />
//             </Paper>
//           </Grid2>
//         );
//       })}
//     </>
//   );
// };

////////////////////////////////////////////////

import React from 'react';
import { Grid2, Paper } from '@mui/material';
// import { TodolistType } from '../../../../app/App';
// import { RootState } from '../../../../app/store';
import { Todolist } from './Todolist/Todolist';
import { useAppSelector } from '../../../../common/hooks/useAppSelector';
import { selectTodolists } from '../../model/todolistsSelectors';

export const Todolists = () => {
  // const todolists = useAppSelector<RootState, TodolistType[]>((state) => state.todolists);
  const todolists = useAppSelector(selectTodolists);

  return (
    <>
      {todolists.map((tl) => {
        return (
          <Grid2 key={tl.id}>
            <Paper sx={{ p: '0 20px 20px 20px' }}>
              <Todolist key={tl.id} todolist={tl} />
            </Paper>
          </Grid2>
        );
      })}
    </>
  );
};

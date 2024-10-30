// import Checkbox from '@mui/material/Checkbox';
// import React, { ChangeEvent, useEffect, useState } from 'react';
// import { AddItemForm } from '../common/components/AddItemForm/AddItemForm';
// import { EditableSpan } from '../common/components/EditableSpan/EditableSpan';
// import axios from 'axios';

// export type Todolist = {
//   id: string;
//   title: string;
//   addedDate: string;
//   order: number;
// };

// type FieldError = {
//   error: string;
//   field: string;
// };

// // type CreateTodolistResponse = {
// //   resultCode: number;
// //   messages: string[];
// //   fieldsErrors: FieldError[];
// //   data: {
// //     item: Todolist;
// //   };
// // };

// // type DeleteTodolistResponse = {
// //   resultCode: number;
// //   messages: string[];
// //   data: {};
// // };

// // type UpdateTodolistResponse = {
// //   resultCode: number;
// //   messages: string[];
// //   data: {};
// // };
// export type Response<T = {}> = {
//   resultCode: number;
//   messages: string[];
//   // fieldsErrors: string;
//   fieldsErrors: FieldError[];
//   data: T;
// };

// export const AppHttpRequests = () => {
//   const [todolists, setTodolists] = useState<Todolist[]>([]);
//   const [tasks, setTasks] = useState<any>({});

//   useEffect(() => {
//     axios
//       .get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
//         headers: {
//           Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
//         },
//       })
//       .then((res) => {
//         // console.log(res.data);
//         setTodolists(res.data);
//       });
//   }, []);

//   const createTodolistHandler = (title: string) => {
//     axios
//       .post<Response<{ item: Todolist }>>(
//         'https://social-network.samuraijs.com/api/1.1/todo-lists',
//         { title },
//         {
//           headers: {
//             Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
//             'API-KEY': '674ef64a-80a2-4caf-9fa7-d677d328cc97',
//           },
//         },
//       )
//       .then((res) => {
//         // console.log(res.data);
//         const newTodolist = res.data.data.item;
//         setTodolists([newTodolist, ...todolists]);
//       });
//   };

//   const removeTodolistHandler = (id: string) => {
//     axios
//       .delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
//         headers: {
//           Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
//           'API-KEY': '674ef64a-80a2-4caf-9fa7-d677d328cc97',
//         },
//       })
//       .then(() => {
//         setTodolists(todolists.filter((tl) => tl.id !== id));
//       });
//   };

//   const updateTodolistHandler = (id: string, title: string) => {
//     axios
//       .put<Response>(
//         `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
//         { title },
//         {
//           headers: {
//             Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
//             'API-KEY': '674ef64a-80a2-4caf-9fa7-d677d328cc97',
//           },
//         },
//       )
//       // .then(() => {
//       // console.log(res.data);
//       // .then(() => {
//       //   setTodolists((prevTodolists) =>
//       //     prevTodolists.map((tl) => (tl.id === id ? { ...tl, title } : tl)),
//       //   );
//       .then(() => {
//         setTodolists(todolists.map((tl) => (tl.id === id ? { ...tl, title } : tl)));
//       });
//   };

//   const createTaskHandler = (title: string, todolistId: string) => {
//     // create task
//   };

//   const removeTaskHandler = (taskId: string, todolistId: string) => {
//     // remove task
//   };

//   const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: any) => {
//     // update task status
//   };

//   const changeTaskTitleHandler = (title: string, task: any) => {
//     // update task title
//   };

//   return (
//     <div style={{ margin: '20px' }}>
//       <AddItemForm addItem={createTodolistHandler} />

//       {/* Todolists */}
//       {todolists.map((tl) => {
//         return (
//           <div key={tl.id} style={todolist}>
//             <div>
//               <EditableSpan
//                 value={tl.title}
//                 onChange={(title: string) => updateTodolistHandler(tl.id, title)}
//               />
//               <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
//             </div>
//             <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />

//             {/* Tasks */}
//             {!!tasks[tl.id] &&
//               tasks[tl.id].map((task: any) => {
//                 return (
//                   <div key={task.id}>
//                     <Checkbox
//                       checked={task.isDone}
//                       onChange={(e) => changeTaskStatusHandler(e, task)}
//                     />
//                     <EditableSpan
//                       value={task.title}
//                       onChange={(title) => changeTaskTitleHandler(title, task)}
//                     />
//                     <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
//                   </div>
//                 );
//               })}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // Styles
// const todolist: React.CSSProperties = {
//   border: '1px solid black',
//   margin: '20px 0',
//   padding: '10px',
//   width: '300px',
//   display: 'flex',
//   justifyContent: 'space-between',
//   flexDirection: 'column',
// };

// //
//////////////////////////////////////////////////

import Checkbox from '@mui/material/Checkbox';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm';
import { EditableSpan } from '../common/components/EditableSpan/EditableSpan';
import axios from 'axios';

export type Todolist = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

type FieldError = {
  error: string;
  field: string;
};

export type Response<T = {}> = {
  resultCode: number;
  messages: string[];
  // fieldsErrors: string;
  fieldsErrors: FieldError[];
  data: T;
};

export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: DomainTask[];
};

export type DomainTask = {
  description: string;
  title: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([]);
  // const [tasks, setTasks] = useState<any>({});
  const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({});

  // useEffect(() => {
  //   axios
  //     .get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
  //       headers: {
  //         Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
  //       },
  //     })
  //     .then((res) => {
  //       // console.log(res.data);
  //       setTodolists(res.data);
  //     });
  // }, []);
  useEffect(() => {
    axios
      .get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
        headers: {
          Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
        },
      })
      .then((res) => {
        const todolists = res.data;
        setTodolists(todolists);
        todolists.forEach((tl) => {
          axios
            .get<GetTasksResponse>(
              `https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`,
              {
                headers: {
                  Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
                  'API-KEY': '674ef64a-80a2-4caf-9fa7-d677d328cc97',
                },
              },
            )
            .then((res) => {
              setTasks({ ...tasks, [tl.id]: res.data.items });
            });
        });
      });
  }, []);

  const createTodolistHandler = (title: string) => {
    axios
      .post<Response<{ item: Todolist }>>(
        'https://social-network.samuraijs.com/api/1.1/todo-lists',
        { title },
        {
          headers: {
            Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
            'API-KEY': '674ef64a-80a2-4caf-9fa7-d677d328cc97',
          },
        },
      )
      .then((res) => {
        // console.log(res.data);
        const newTodolist = res.data.data.item;
        setTodolists([newTodolist, ...todolists]);
      });
  };

  const removeTodolistHandler = (id: string) => {
    axios
      .delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
        headers: {
          Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
          'API-KEY': '674ef64a-80a2-4caf-9fa7-d677d328cc97',
        },
      })
      .then(() => {
        setTodolists(todolists.filter((tl) => tl.id !== id));
      });
  };

  const updateTodolistHandler = (id: string, title: string) => {
    axios
      .put<Response>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
        { title },
        {
          headers: {
            Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
            'API-KEY': '674ef64a-80a2-4caf-9fa7-d677d328cc97',
          },
        },
      )
      // .then(() => {
      // console.log(res.data);
      // .then(() => {
      //   setTodolists((prevTodolists) =>
      //     prevTodolists.map((tl) => (tl.id === id ? { ...tl, title } : tl)),
      //   );
      .then(() => {
        setTodolists(todolists.map((tl) => (tl.id === id ? { ...tl, title } : tl)));
      });
  };

  const createTaskHandler = (title: string, todolistId: string) => {
    axios
      .post<Response<{ item: DomainTask }>>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
        { title },
        {
          headers: {
            Authorization: 'Bearer 76937f5f-4768-419a-900d-f97f3e4bfd1c',
            'API-KEY': '674ef64a-80a2-4caf-9fa7-d677d328cc97',
          },
        },
      )
      // .then((res) => {
      //   console.log(res.data);
      // });
      .then((res) => {
        const newTask = res.data.data.item;
        setTasks({
          ...tasks,
          [todolistId]: [newTask, ...(tasks[todolistId] || [])],
        });
      });
    // .catch((error) => console.error('Failed to create task:', error));
  };

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    // remove task
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: any) => {
    // update task status
  };

  const changeTaskTitleHandler = (title: string, task: any) => {
    // update task title
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
              tasks[tl.id].map((task: any) => {
                return (
                  <div key={task.id}>
                    <Checkbox
                      checked={task.isDone}
                      onChange={(e) => changeTaskStatusHandler(e, task)}
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

//

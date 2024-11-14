// import Paper from "@mui/material/Paper"
// import { useAppSelector } from "common/hooks"
// import { selectTodolists } from "../../model/todolistsSelectors"
// import { Todolist } from "./Todolist/Todolist"
// import { Grid2 } from "@mui/material"

// export const Todolists = () => {
//   const todolists = useAppSelector(selectTodolists)

//   return (
//     <>
//       {todolists.map((tl) => {
//         return (
//           <Grid2 key={tl.id}>
//             <Paper sx={{ p: "0 20px 20px 20px" }}>
//               <Todolist key={tl.id} todolist={tl} />
//             </Paper>
//           </Grid2>
//         )
//       })}
//     </>
//   )
// }

//////////////////////////////////////////////////

import Paper from "@mui/material/Paper"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectTodolists } from "../../model/todolistsSelectors"
import { Todolist } from "./Todolist/Todolist"
import { Grid2 } from "@mui/material"
import { useEffect } from "react"
import { todolistsApi } from "features/todolists/api/todolistsApi"
import { setTodolistsAC } from "features/todolists/model/todolists-reducer"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  // useEffect(() => {
  //   todolistsApi.getTodolists().then((res) => {
  //     const todolists = res.data
  //     console.log(todolists)
  //   })
  // }, [])

  const dispatch = useAppDispatch()

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      dispatch(setTodolistsAC(res.data))
    })
  }, [])

  return (
    <>
      {todolists.map((tl) => {
        return (
          <Grid2 key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <Todolist key={tl.id} todolist={tl} />
            </Paper>
          </Grid2>
        )
      })}
    </>
  )
}

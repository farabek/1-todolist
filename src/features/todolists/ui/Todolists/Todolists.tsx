import Paper from "@mui/material/Paper"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { fetchTodolistsTC } from "../../model/todolists-reducer"
import { selectTodolists } from "../../model/todolistsSelectors"
import { Todolist } from "./Todolist/Todolist"
import { Grid2 } from "@mui/material"
import { useEffect } from "react"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
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

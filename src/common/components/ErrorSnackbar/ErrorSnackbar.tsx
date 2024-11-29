// import { SyntheticEvent, useState } from "react"
import { SyntheticEvent } from "react"
import Alert from "@mui/material/Alert"
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import { selectError } from "app/appSelectors"
import { setAppErrorAC } from "app/app-reducer"
import { useAppDispatch, useAppSelector } from "common/hooks"

export const ErrorSnackbar = () => {
  // const [open, setOpen] = useState(true)
  const error = useAppSelector(selectError)

  const dispatch = useAppDispatch()

  const handleClose = (event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    // const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    // debugger
    if (reason === "clickaway") {
      return
    }

    // setOpen(false)
    dispatch(setAppErrorAC(null))
  }

  return (
    // <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    // <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {/* Error message */}
        {error}
      </Alert>
    </Snackbar>
  )
}

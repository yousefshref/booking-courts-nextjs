import React from 'react'
import { Backdrop, CircularProgress } from "@mui/material"

const Loading = () => {
  return (
    <Backdrop open={true} sx={{ color: 'white', backgroundColor: "black" }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Loading
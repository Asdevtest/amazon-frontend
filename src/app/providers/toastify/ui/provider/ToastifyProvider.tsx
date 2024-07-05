import { FC } from 'react'
import { Theme, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import classes from './ToastifyProvider.module.scss'

interface ToastifyProviderProps {
  theme: Theme
}

export const ToastifyProvider: FC<ToastifyProviderProps> = (/* { theme } */) => {
  return (
    <ToastContainer
      hideProgressBar
      pauseOnFocusLoss
      draggable
      limit={2}
      autoClose={3000}
      theme="colored" // {theme}
      closeOnClick={false}
      className={classes.toastContainer}
      position="bottom-right"
    />
  )
}

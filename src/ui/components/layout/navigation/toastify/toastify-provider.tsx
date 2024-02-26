import { FC } from 'react'
import { Theme, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useStyles } from '@components/layout/navigation/toastify/toastify.style'

interface ToastifyProviderProps {
  theme: Theme
}

export const ToastifyProvider: FC<ToastifyProviderProps> = (/* { theme } */) => {
  const { classes: styles } = useStyles()

  return (
    <ToastContainer
      hideProgressBar
      pauseOnFocusLoss
      draggable
      limit={2}
      autoClose={3000}
      theme="colored" // {theme}
      closeOnClick={false}
      className={styles.toastContainer}
      position="bottom-right"
    />
  )
}

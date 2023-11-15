import { FC } from 'react'
import { Theme, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import CloseIcon from '@mui/icons-material/Close'

import { useStyles } from '@components/layout/navigation/toastify/toastify.styles'

interface ToastiyProvderProps {
  theme: Theme
}

export const ToastifyProvder: FC<ToastiyProvderProps> = ({ theme }) => {
  const { classes: styles } = useStyles()

  return (
    <ToastContainer
      hideProgressBar
      pauseOnFocusLoss
      draggable
      limit={2}
      theme={theme}
      closeOnClick={false}
      className={styles.toast}
      position="bottom-right"
      closeButton={({ closeToast }) => (
        <div onClick={e => closeToast(e)}>
          <CloseIcon fontSize="small" className={styles.closeIcon} />
        </div>
      )}
    />
  )
}

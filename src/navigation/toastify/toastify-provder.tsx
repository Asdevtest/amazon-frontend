import CloseIcon from '@mui/icons-material/Close'

import React, {FC} from 'react'

import {Theme, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {useToastStyles} from '@navigation/toastify/toastify.styles'

interface ToastiyProvderProps {
  theme: Theme
}

export const ToastifyProvder: FC<ToastiyProvderProps> = props => {
  const {theme} = props
  const {classes: classNames} = useToastStyles()

  return (
    <ToastContainer
      hideProgressBar
      pauseOnFocusLoss
      draggable
      limit={5}
      theme={theme}
      closeOnClick={false}
      className={classNames.toast}
      position="bottom-right"
      closeButton={({closeToast}) => (
        <div onClick={e => closeToast(e)}>
          <CloseIcon fontSize="small" className={classNames.closeIcon} />
        </div>
      )}
    />
  )
}

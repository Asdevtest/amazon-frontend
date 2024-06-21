import { FC, PropsWithChildren, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

export const ModalPortal: FC<PropsWithChildren> = ({ children }) => {
  const modalRoot = document.getElementById('modal-root') || document.body
  const [modalElement] = useState(document.createElement('div'))

  useEffect(() => {
    modalRoot.appendChild(modalElement)

    return () => {
      modalRoot.removeChild(modalElement)
    }
  }, [modalElement, modalRoot])

  return ReactDOM.createPortal(children, modalElement)
}

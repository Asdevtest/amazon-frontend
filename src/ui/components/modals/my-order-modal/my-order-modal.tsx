import { FC, memo } from 'react'

import { Modal } from '@components/shared/modal'

import { useStyles } from './my-order-modal.style'

import { Header } from './components'

interface MyOrderModalProps {
  openModal: boolean
  handleOpenModal: () => void
  order: any
}

export const MyOrderModal: FC<MyOrderModalProps> = memo(props => {
  const { openModal, handleOpenModal, order } = props

  const { classes: styles } = useStyles()

  // console.log('order', order)

  return (
    <Modal openModal={openModal} setOpenModal={handleOpenModal}>
      <div className={styles.wrapper}>
        <Header order={order} />

        <div>footer</div>
      </div>
    </Modal>
  )
})

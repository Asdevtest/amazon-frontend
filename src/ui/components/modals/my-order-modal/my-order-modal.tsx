import { FC, memo } from 'react'

import { Modal } from '@components/shared/modal'

import { IDestination, IDestinationStorekeeper } from '@typings/destination'
import { IPlatformSettings } from '@typings/patform-settings'

import { useStyles } from './my-order-modal.style'

import { Footer, Header, Tabs } from './components'
import { SwitcherConditions } from './components/tabs/tabs.type'

interface MyOrderModalProps {
  openModal: boolean
  handleOpenModal: () => void
  order: any
  destinations: IDestination[]
  storekeepers: IDestinationStorekeeper[]
  platformSettings: IPlatformSettings
  onClickOpenNewTab: () => void
  switcherCondition: SwitcherConditions
  onClickChangeCondition: () => void
}

export const MyOrderModal: FC<MyOrderModalProps> = memo(props => {
  const {
    openModal,
    handleOpenModal,
    order,
    destinations,
    storekeepers,
    platformSettings,
    onClickOpenNewTab,
    switcherCondition,
    onClickChangeCondition,
  } = props

  const { classes: styles } = useStyles()

  // console.log('order', order)

  return (
    <Modal openModal={openModal} setOpenModal={handleOpenModal}>
      <div className={styles.wrapper}>
        <Header order={order} />

        <Tabs
          order={order}
          destinations={destinations}
          storekeepers={storekeepers}
          platformSettings={platformSettings}
          switcherCondition={switcherCondition}
          onClickChangeCondition={onClickChangeCondition}
        />

        <Footer onClickOpenNewTab={onClickOpenNewTab} />
      </div>
    </Modal>
  )
})

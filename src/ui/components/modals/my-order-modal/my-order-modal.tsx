import { FC, memo } from 'react'

import { Modal } from '@components/shared/modal'

import { IDestination, IDestinationStorekeeper } from '@typings/destination'
import { IOrderBox } from '@typings/order-box'
import { IPlatformSettings } from '@typings/patform-settings'

import { useStyles } from './my-order-modal.style'

import { Footer, Header, Tabs } from './components'
import { SwitcherConditions } from './components/tabs/tabs.type'

interface MyOrderModalProps {
  openModal: boolean
  handleOpenModal: () => void
  order: any
  orderBoxes: IOrderBox[]
  destinations: IDestination[]
  storekeepers: IDestinationStorekeeper[]
  platformSettings: IPlatformSettings
  onClickOpenNewTab: () => void
  switcherCondition: SwitcherConditions
  destinationsFavourites: IDestination[]
  setDestinationsFavouritesItem: () => void
  onClickChangeCondition: () => void
}

export const MyOrderModal: FC<MyOrderModalProps> = memo(props => {
  const {
    openModal,
    handleOpenModal,
    order,
    orderBoxes,
    destinations,
    storekeepers,
    platformSettings,
    onClickOpenNewTab,
    switcherCondition,
    destinationsFavourites,
    setDestinationsFavouritesItem,
    onClickChangeCondition,
  } = props

  const { classes: styles } = useStyles()

  return (
    <Modal openModal={openModal} setOpenModal={handleOpenModal}>
      <div className={styles.wrapper}>
        <Header order={order} />

        <Tabs
          order={order}
          orderBoxes={orderBoxes}
          destinations={destinations}
          storekeepers={storekeepers}
          platformSettings={platformSettings}
          switcherCondition={switcherCondition}
          destinationsFavourites={destinationsFavourites}
          setDestinationsFavouritesItem={setDestinationsFavouritesItem}
          onClickChangeCondition={onClickChangeCondition}
        />

        <Footer onClickOpenNewTab={onClickOpenNewTab} />
      </div>
    </Modal>
  )
})

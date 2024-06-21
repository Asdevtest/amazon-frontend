import isEqual from 'lodash.isequal'
import { FC, memo, useEffect, useState } from 'react'

import { Modal } from '@components/shared/modal'

import { OrderStatus } from '@typings/enums/order/order-status'
import { IOrder } from '@typings/models/orders/order'
import { IDestination, IDestinationStorekeeper } from '@typings/shared/destinations'
import { IPlatformSettings } from '@typings/shared/patform-settings'

import { useStyles } from './my-order-modal.style'

import { Footer, Header, Tabs } from './components'
import { MyOrderModalSwitcherConditions } from './components/tabs/tabs.type'
import { IOrderWithAdditionalFields } from './my-order-modal.type'

interface MyOrderModalProps {
  openModal: boolean
  onOpenModal: () => void
  order: IOrder
  destinations: IDestination[]
  storekeepers: IDestinationStorekeeper[]
  platformSettings: IPlatformSettings
  onClickOpenNewTab: (id: string) => void
  switcherCondition: MyOrderModalSwitcherConditions
  destinationsFavourites: string[]
  setDestinationsFavouritesItem: () => void
  onClickChangeCondition: () => void
  onClickCancelOrder: (id: string) => void
  onClickReorder: (order: IOrderWithAdditionalFields, isPendingOrder: boolean) => void
  onSubmitSaveOrder: (order: IOrderWithAdditionalFields) => void
  isClient?: boolean
  isPendingOrdering?: boolean
}

export const MyOrderModal: FC<MyOrderModalProps> = memo(props => {
  const {
    openModal,
    onOpenModal,
    order,
    destinations,
    storekeepers,
    platformSettings,
    onClickOpenNewTab,
    switcherCondition,
    destinationsFavourites,
    setDestinationsFavouritesItem,
    onClickChangeCondition,
    onClickCancelOrder,
    onClickReorder,
    onSubmitSaveOrder,
    isClient,
    isPendingOrdering,
  } = props

  const { classes: styles } = useStyles()

  const getInitialOrderState = (): IOrderWithAdditionalFields => ({
    ...order,
    destinationId: order?.destination?._id || null,
    storekeeperId: order?.storekeeper?._id || '',
    logicsTariffId: order?.logicsTariff?._id || '',
    variationTariffId: order?.variationTariff?._id || null,
    deadline: order?.deadline || null,
    tmpBarCode: [],
  })

  const [formFields, setFormFields] = useState<IOrderWithAdditionalFields>(getInitialOrderState())

  useEffect(() => {
    setFormFields(getInitialOrderState())
  }, [order])

  const isOrderEditable = formFields?.status <= OrderStatus.READY_FOR_BUYOUT
  const stateComparison = isEqual(getInitialOrderState(), formFields)

  return (
    <Modal openModal={openModal} setOpenModal={onOpenModal}>
      <div className={styles.wrapper}>
        <Header formFields={formFields} />

        <Tabs
          isOrderEditable={isOrderEditable}
          isClient={isClient}
          isPendingOrdering={isPendingOrdering}
          formFields={formFields}
          destinations={destinations}
          storekeepers={storekeepers}
          platformSettings={platformSettings}
          switcherCondition={switcherCondition}
          destinationsFavourites={destinationsFavourites}
          setDestinationsFavouritesItem={setDestinationsFavouritesItem}
          setFormFields={setFormFields}
          onClickChangeCondition={onClickChangeCondition}
        />

        <Footer
          isOrderEditable={isOrderEditable}
          isClient={isClient}
          formFields={formFields}
          stateComparison={stateComparison}
          onClickOpenNewTab={onClickOpenNewTab}
          onClickCancelOrder={onClickCancelOrder}
          onClickReorder={onClickReorder}
          onSubmitSaveOrder={onSubmitSaveOrder}
        />
      </div>
    </Modal>
  )
})

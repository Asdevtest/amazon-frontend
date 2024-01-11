/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChangeEvent, FC, memo, useState } from 'react'

import { orderPriority } from '@constants/orders/order-priority'

import { Modal } from '@components/shared/modal'

import { IDestination, IDestinationStorekeeper } from '@typings/destination'
import { IOrder } from '@typings/order'
import { IOrderBox } from '@typings/order-box'
import { IPlatformSettings } from '@typings/patform-settings'

import { useStyles } from './my-order-modal.style'

import { Footer, Header, Tabs } from './components'
import { SwitcherConditions } from './components/tabs/tabs.type'
import { IOrderWithAdditionalFields } from './my-order-modal.type'

interface MyOrderModalProps {
  openModal: boolean
  onOpenModal: () => void
  order: IOrder
  orderBoxes: IOrderBox[]
  destinations: IDestination[]
  storekeepers: IDestinationStorekeeper[]
  platformSettings: IPlatformSettings
  onClickOpenNewTab: (id: string) => void
  switcherCondition: SwitcherConditions
  destinationsFavourites: string[]
  setDestinationsFavouritesItem: () => void
  onClickChangeCondition: () => void
  onClickCancelOrder: (id: string) => void
  onClickReorder: (order: IOrderWithAdditionalFields, isPendingOrder: boolean) => void
  onSubmitSaveOrder: (order: IOrderWithAdditionalFields) => void
  isClient?: boolean
}

export const MyOrderModal: FC<MyOrderModalProps> = memo(props => {
  const {
    openModal,
    onOpenModal,
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
    onClickCancelOrder,
    onClickReorder,
    onSubmitSaveOrder,
    isClient,
  } = props

  const { classes: styles } = useStyles()

  const getInitialOrderState = (): IOrderWithAdditionalFields => ({
    ...order,
    destinationId: order?.destination?._id || null,
    storekeeperId: order?.storekeeper?._id || '',
    logicsTariffId: order?.logicsTariff?._id || '',
    variationTariffId: order?.variationTariff?._id || null,
    tmpBarCode: [],
  })

  const [formFields, setFormFields] = useState<IOrderWithAdditionalFields>(getInitialOrderState())

  const onChangeField = (fieldName: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormFields(prevFormFields => {
      const updatedFormFields: IOrderWithAdditionalFields = { ...prevFormFields }

      if (fieldName === 'buyerComment' || fieldName === 'clientComment') {
        updatedFormFields[fieldName] = event as unknown as string
      }

      if (fieldName === 'expressChinaDelivery' || fieldName === 'needsResearch') {
        updatedFormFields[fieldName] = event.target.checked
      }

      if (fieldName === 'priority') {
        updatedFormFields[fieldName] = event.target.checked
          ? String(orderPriority.urgentPriority)
          : String(orderPriority.normalPriority)
      }

      return updatedFormFields
    })
  }

  const isOrderEditable = order.status <= 3 // OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]

  return (
    <Modal openModal={openModal} setOpenModal={onOpenModal}>
      <div className={styles.wrapper}>
        <Header order={formFields} />

        <Tabs
          isOrderEditable={isOrderEditable}
          order={formFields}
          orderBoxes={orderBoxes}
          destinations={destinations}
          storekeepers={storekeepers}
          platformSettings={platformSettings}
          switcherCondition={switcherCondition}
          destinationsFavourites={destinationsFavourites}
          setDestinationsFavouritesItem={setDestinationsFavouritesItem}
          setFormFields={setFormFields}
          onClickChangeCondition={onClickChangeCondition}
          onChangeField={onChangeField}
        />

        <Footer
          order={formFields}
          isOrderEditable={isOrderEditable}
          isClient={isClient}
          onClickOpenNewTab={onClickOpenNewTab}
          onClickCancelOrder={onClickCancelOrder}
          onClickReorder={onClickReorder}
          onSubmitSaveOrder={onSubmitSaveOrder}
        />
      </div>
    </Modal>
  )
})

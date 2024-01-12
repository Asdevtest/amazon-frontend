import { FC, memo } from 'react'

import { IOrderWithAdditionalFields, SetFormFieldsType } from '@components/modals/my-order-modal/my-order-modal.type'

import { IDestination, IDestinationStorekeeper } from '@typings/destination'

import { useStyles } from './basic-info-tab.style'

import { AdditionalInfo, CommentsInfo, PhotosInfo, SupplierInfo } from './components'

interface BasicInfoTabProps {
  isOrderEditable: boolean
  order: IOrderWithAdditionalFields
  destinations: IDestination[]
  storekeepers: IDestinationStorekeeper[]
  destinationsFavourites: string[]
  setDestinationsFavouritesItem: () => void
  setFormFields: SetFormFieldsType
  isClient?: boolean
}

export const BasicInfoTab: FC<BasicInfoTabProps> = memo(props => {
  const {
    isOrderEditable,
    isClient,
    order,
    destinations,
    storekeepers,
    destinationsFavourites,
    setDestinationsFavouritesItem,
    setFormFields,
  } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <SupplierInfo isOrderEditable={isOrderEditable} order={order} setFormFields={setFormFields} />

      <AdditionalInfo
        isOrderEditable={isOrderEditable}
        order={order}
        destinations={destinations}
        storekeepers={storekeepers}
        destinationsFavourites={destinationsFavourites}
        setDestinationsFavouritesItem={setDestinationsFavouritesItem}
        setFormFields={setFormFields}
      />

      <PhotosInfo order={order} />

      <CommentsInfo isOrderEditable={isOrderEditable} isClient={isClient} order={order} setFormFields={setFormFields} />
    </div>
  )
})

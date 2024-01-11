import { FC, memo } from 'react'

import {
  ChangeFieldFunction,
  IOrderWithAdditionalFields,
  SetFormFieldsType,
} from '@components/modals/my-order-modal/my-order-modal.type'

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
  onChangeField: ChangeFieldFunction
}

export const BasicInfoTab: FC<BasicInfoTabProps> = memo(props => {
  const {
    isOrderEditable,
    order,
    destinations,
    storekeepers,
    destinationsFavourites,
    setDestinationsFavouritesItem,
    setFormFields,
    onChangeField,
  } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <SupplierInfo order={order} />

      <AdditionalInfo
        isOrderEditable={isOrderEditable}
        order={order}
        destinations={destinations}
        storekeepers={storekeepers}
        destinationsFavourites={destinationsFavourites}
        setDestinationsFavouritesItem={setDestinationsFavouritesItem}
        setFormFields={setFormFields}
        onChangeField={onChangeField}
      />

      <PhotosInfo order={order} />

      <CommentsInfo isOrderEditable={isOrderEditable} order={order} onChangeField={onChangeField} />
    </div>
  )
})

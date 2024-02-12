import { FC, memo } from 'react'

import { IOrderWithAdditionalFields, SetFormFieldsType } from '@components/modals/my-order-modal/my-order-modal.type'

import { IDestination, IDestinationStorekeeper } from '@typings/shared/destinations'

import { useStyles } from './basic-info-tab.style'

import { AdditionalInfo, CommentsInfo, PhotosInfo, SupplierInfo } from './components'

interface BasicInfoTabProps {
  isOrderEditable: boolean
  formFields: IOrderWithAdditionalFields
  destinations: IDestination[]
  storekeepers: IDestinationStorekeeper[]
  destinationsFavourites: string[]
  setDestinationsFavouritesItem: () => void
  setFormFields: SetFormFieldsType
  isClient?: boolean
  isPendingOrdering?: boolean
}

export const BasicInfoTab: FC<BasicInfoTabProps> = memo(props => {
  const {
    isOrderEditable,
    isClient,
    isPendingOrdering,
    formFields,
    destinations,
    storekeepers,
    destinationsFavourites,
    setDestinationsFavouritesItem,
    setFormFields,
  } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <SupplierInfo
        isOrderEditable={isOrderEditable}
        isPendingOrdering={isPendingOrdering}
        formFields={formFields}
        setFormFields={setFormFields}
      />

      <AdditionalInfo
        isOrderEditable={isOrderEditable}
        formFields={formFields}
        destinations={destinations}
        storekeepers={storekeepers}
        destinationsFavourites={destinationsFavourites}
        setDestinationsFavouritesItem={setDestinationsFavouritesItem}
        setFormFields={setFormFields}
      />

      <PhotosInfo formFields={formFields} />

      <CommentsInfo
        isOrderEditable={isOrderEditable}
        isClient={isClient}
        formFields={formFields}
        setFormFields={setFormFields}
      />
    </div>
  )
})

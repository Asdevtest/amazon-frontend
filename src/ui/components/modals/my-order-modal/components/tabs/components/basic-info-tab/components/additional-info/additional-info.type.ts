import { IOrderWithAdditionalFields, SetFormFieldsType } from '@components/modals/my-order-modal/my-order-modal.type'

import { IDestination, IDestinationStorekeeper } from '@typings/destination'

export interface AdditionalInfoProps {
  isOrderEditable: boolean
  formFields: IOrderWithAdditionalFields
  destinations: IDestination[]
  storekeepers: IDestinationStorekeeper[]
  destinationsFavourites: string[]
  setDestinationsFavouritesItem: () => void
  setFormFields: SetFormFieldsType
}

export interface InitialConfirmModalSettingsState {
  isWarning: boolean
  title: string
  confirmMessage: string
  onClickConfirm: () => void
  onClickCancelBtn: () => void
}

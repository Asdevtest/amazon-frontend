import { IOrderWithAdditionalFields, SetFormFieldsType } from '@components/modals/my-order-modal/my-order-modal.type'

import { IDestination, IDestinationStorekeeper } from '@typings/shared/destinations'

export interface AdditionalInfoProps {
  isOrderEditable: boolean
  formFields: IOrderWithAdditionalFields
  destinations: IDestination[]
  storekeepers: IDestinationStorekeeper[]
  destinationsFavourites: string[]
  setDestinationsFavouritesItem: () => void
  setFormFields: SetFormFieldsType
}

export interface UseAdditionalInfoParams extends AdditionalInfoProps {
  destinationId: string
  handleSetDestination: (destinationId: string) => void
  setShowSelectionStorekeeperAndTariffModal: (modalState: boolean) => void
}

export interface InitialConfirmModalSettingsState {
  isWarning: boolean
  title: string
  confirmMessage: string
  onClickConfirm: () => void
  onClickCancelBtn: () => void
}

import { IOrderWithAdditionalFields, SetFormFieldsType } from '@components/modals/my-order-modal/my-order-modal.type'

export interface SupplierInfoProps {
  isOrderEditable: boolean
  formFields: IOrderWithAdditionalFields
  setFormFields: SetFormFieldsType
  isPendingOrdering?: boolean
}

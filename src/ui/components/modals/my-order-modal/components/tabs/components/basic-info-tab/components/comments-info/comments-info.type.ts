import { IOrderWithAdditionalFields, SetFormFieldsType } from '@components/modals/my-order-modal/my-order-modal.type'

export interface CommentsInfoProps {
  isOrderEditable: boolean
  formFields: IOrderWithAdditionalFields
  setFormFields: SetFormFieldsType
  isClient?: boolean
}

export interface IFieldConfig {
  field: string
  title: string
  text: string
  element?: JSX.Element
  isEditable?: boolean
}

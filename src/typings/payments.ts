import { UploadFileType } from './upload-file'

export interface PaymentMethod {
  _id?: string
  title?: string
  iconImage?: string
}

export interface Payment {
  paymentDetails: string
  paymentImages: UploadFileType[]
  paymentMethod: PaymentMethod
  isChecked?: boolean
}

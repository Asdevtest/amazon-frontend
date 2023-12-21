import { IUploadFile } from './upload-file'

export interface PaymentMethod {
  _id: string
  title: string
  iconImage: string
}

export interface Payment {
  paymentDetails: string
  paymentImages: Array<string | IUploadFile>
  paymentMethod: PaymentMethod
  isChecked?: boolean
}

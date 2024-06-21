import { IPaymentMethod } from './payment-method'
import { UploadFileType } from './upload-file'

export interface IPayment {
  paymentDetails: string
  paymentImages: UploadFileType[]
  paymentMethod: IPaymentMethod
  isChecked: boolean
}

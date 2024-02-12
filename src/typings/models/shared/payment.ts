import { UploadFileType } from '../../upload-file'

import { IPaymentMethod } from './payment-method'

export interface IPayment {
  paymentDetails?: string
  paymentImages?: UploadFileType[]
  paymentMethod?: IPaymentMethod
  isChecked?: boolean
}

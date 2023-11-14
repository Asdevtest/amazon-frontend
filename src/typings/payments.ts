import { IUploadFile } from './upload-file'

export interface Payment {
  _id: string
  title: string
  iconImage: string
}

export interface Payments {
  paymentDetails: string
  paymentImages: Array<string | IUploadFile>
  paymentMethod: Payment
  photosForLoad: Array<string | IUploadFile>
}

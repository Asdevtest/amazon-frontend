import { UploadFileType } from '@typings/shared/upload-file'

export interface Contact {
  name: string
  phones: string[]
  email: string[]
  optionals: string[]
}

export interface FieldType {
  title: string
  country: string
  link: string
  files: UploadFileType[]
  paymentMethods: string[]
  contacts: Contact[]
  description: string
}

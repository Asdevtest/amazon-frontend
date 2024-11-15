import { UploadFileType } from '@typings/shared/upload-file'

export interface Contact {
  name: string
  phoneNumbers: string[]
  emails: string[]
  links: string[]
}

export interface CreateSupplier {
  companyName: string
  link: string
  images: UploadFileType[]
  countryId: string
  comment: string
  paymentMethodIds: string[]
  supplierEmployees: Contact[]
}

export interface PostSupplier extends CreateSupplier {
  images: string[]
}

import { UploadFileType } from '@typings/shared/upload-file'

export interface Contact {
  name: string
  contacts: string[]
  links: string[]
  phoneNumbers: string[]
}

export interface CreateSupplier {
  companyName: string
  link: string
  companyLogo: UploadFileType[]
  countryId: string
  comment: string
  paymentMethods: string[]
  supplierEmployees: Contact[]
}

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
  photo: string
  paymentMethods: string[]
  contacts: Contact[]
}

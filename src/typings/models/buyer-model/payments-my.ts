export interface IPaymentsMy {
  _id?: string
  createdAt?: string
  createdBy?: ICreatedPaymentsBy
  role?: number
  subUser?: ICreatedPaymentsBy
  entityId?: string
  paymentType?: PaymentsTypeEnum
  recipient?: ICreatedPaymentsBy
  sum?: number
  comment?: string
}

interface ICreatedPaymentsBy {
  _id?: string
  name: string
}

export enum PaymentsTypeEnum {
  Product = 'PRODUCT',
  Order = 'ORDER',
  Box = 'BOX',
  Batch = 'BATCH',
  User = 'USER',
  RequestCustom = 'REQUEST-CUSTOM',
  RequestSearchProduct = 'REQUEST-SEARCH_PRODUCT',
  RequestSearchNiche = 'REQUEST-SEARCH_NICHE',
  RequestProposalCustom = 'REQUEST-PROPOSAL-CUSTOM',
  RequestProposalSearchProduct = 'REQUEST-PROPOSAL-SEARCH_PRODUCT',
  RequestProposalSearchNiche = 'REQUEST-PROPOSAL-SEARCH_NICHE',
  Other = 'OTHER',
}

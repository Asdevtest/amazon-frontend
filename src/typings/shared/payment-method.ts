/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPaymentMethod {
  map(arg0: (item: any) => {}): IPaymentMethod
  _id: string
  title: string
  iconImage: string
  createdAt?: string
  updatedAt?: string
}

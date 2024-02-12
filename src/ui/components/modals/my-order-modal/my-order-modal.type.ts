import { Dispatch, SetStateAction } from 'react'

import { IOrder } from '@typings/models/orders/order'

export interface IOrderWithAdditionalFields extends IOrder {
  destinationId: string
  storekeeperId: string
  tmpBarCode: string[]
}

export type SetFormFieldsType = Dispatch<SetStateAction<IOrderWithAdditionalFields>>

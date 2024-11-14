import { Dispatch, SetStateAction } from 'react'

import { IOrder } from '@typings/models/orders/order'
import { ISupplier } from '@typings/models/suppliers/supplier'

export interface IOrderWithAdditionalFields extends IOrder {
  destinationId: string | null
  storekeeperId: string
  tmpBarCode: string[]
  currentSupplierCard?: ISupplier
}

export type SetFormFieldsType = Dispatch<SetStateAction<IOrderWithAdditionalFields>>

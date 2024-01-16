import { Dispatch, SetStateAction } from 'react'

import { IOrder } from '@typings/order'

export interface IOrderWithAdditionalFields extends IOrder {
  destinationId: string | null
  storekeeperId: string | null
  logicsTariffId: string | null
  variationTariffId: string | null
  deadline: string | null
  tmpBarCode: string[]
}

export type SetFormFieldsType = Dispatch<SetStateAction<IOrderWithAdditionalFields>>

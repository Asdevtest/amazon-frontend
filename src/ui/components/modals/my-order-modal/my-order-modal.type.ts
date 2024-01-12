import { Dispatch, SetStateAction } from 'react'

import { IOrder } from '@typings/order'
import { IUploadFile } from '@typings/upload-file'

export interface IOrderWithAdditionalFields extends IOrder {
  destinationId: string | null
  storekeeperId: string | null
  logicsTariffId: string | null
  variationTariffId: string | null
  deadline: string | null
  tmpBarCode: Array<string | IUploadFile>
}

export type SetFormFieldsType = Dispatch<SetStateAction<IOrderWithAdditionalFields>>

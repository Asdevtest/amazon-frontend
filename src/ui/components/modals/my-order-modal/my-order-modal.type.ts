import { ChangeEvent, Dispatch, SetStateAction } from 'react'

import { IOrder } from '@typings/order'
import { IUploadFile } from '@typings/upload-file'

export interface IOrderWithAdditionalFields extends IOrder {
  destinationId: string | null
  storekeeperId: string
  logicsTariffId: string
  variationTariffId: string | null
  tmpBarCode: Array<string | IUploadFile>
}

export type ChangeFieldFunction = (fieldName: string) => (event: ChangeEvent<HTMLInputElement>) => void

export type SetFormFieldsType = Dispatch<SetStateAction<IOrderWithAdditionalFields>>

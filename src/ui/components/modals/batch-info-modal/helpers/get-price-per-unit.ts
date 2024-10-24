import { IBox } from '@typings/models/boxes/box'
import { IBoxItem } from '@typings/models/boxes/box-item'

export const getPricePerUnit = (item: IBoxItem) => item?.order?.totalPrice / item?.order?.amount

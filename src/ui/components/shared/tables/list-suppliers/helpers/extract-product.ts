import { IOrderWithAdditionalFields } from '@components/modals/my-order-modal/my-order-modal.type'

import { IProduct } from '@typings/models/products/product'

export const extractProduct = (data: IOrderWithAdditionalFields | IProduct) => ('product' in data ? data.product : data)

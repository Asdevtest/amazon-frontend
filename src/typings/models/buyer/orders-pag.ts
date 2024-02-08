import { IBuyerOrdersMy } from './orders-my'

interface IOrdersPag {
  count?: number

  rows?: Array<IBuyerOrdersMy>
}

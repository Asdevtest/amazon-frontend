import { ILogicTariff } from '../../shared/logic-tariff'

export interface IStorekeeper {
  _id: string
  name: string
  tariffLogistics: Array<ILogicTariff>
  tariffWarehouses: Array<ITariffWarehouse>
  boxesCount: number
}

interface ITariffWarehouse {
  _id: string
  name: string
  description: string
  price: number
  updatedAt: string
}

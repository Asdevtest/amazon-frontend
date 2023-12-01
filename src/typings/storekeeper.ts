import { LogisticTariffInterface } from './logistics-tariff'

export interface IStorekeeper {
  _id: string
  name?: string
  tariffLogistics?: LogisticTariffInterface[]
  tariffWarehouses?: Array<IStorekeepersTariffWarehouses>
  boxesCount?: number
}

export interface IStorekeepersTariffWarehouses {
  _id?: string
  name?: string
  description?: string
  price?: number
  updatedAt?: string
}

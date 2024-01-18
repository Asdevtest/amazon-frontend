import { ILogisticTariff } from './logistics-tariff'

export interface IStorekeeper {
  _id: string
  name?: string
  tariffLogistics?: ILogisticTariff[]
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

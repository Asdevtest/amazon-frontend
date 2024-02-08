import { ILogicTariff } from '../shared/logic-tariff'

export interface IStorekeepers {
  _id: string
  name?: string
  tariffLogistics?: Array<ILogicTariff>
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

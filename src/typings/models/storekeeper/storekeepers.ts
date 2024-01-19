import { ILogicTariffs } from '../shared/logic-tariffs'

export interface IStorekeepers {
  _id: string
  name?: string
  tariffLogistics?: Array<ILogicTariffs>
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

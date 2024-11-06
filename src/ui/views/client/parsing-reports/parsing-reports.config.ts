import { action, observable } from 'mobx'

import { formatSnakeCaseString } from '@utils/text'

import { ParsingReportsType } from './parsing-reports.type'

const exceptions: Partial<Record<ParsingReportsType, string>> = {
  [ParsingReportsType.FBA_INVENTORY]: 'FBA Inventory',
  [ParsingReportsType.PPC_ORGANIC]: 'PPC Organic',
}

export const getSelectConfig = () =>
  Object.values(ParsingReportsType).map(type => ({
    label: exceptions[type] || formatSnakeCaseString(type),
    value: type,
  }))

export const parsingReportsModelConfig = {
  table: observable,

  onChangeActiveTable: action.bound,
}

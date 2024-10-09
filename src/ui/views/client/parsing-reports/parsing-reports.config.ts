import { action, observable } from 'mobx'

import { formatSnakeCaseString } from '@utils/text'

import { ParsingReportsType } from './parsing-reports.type'

export const getSelectConfig = () =>
  Object.values(ParsingReportsType).map(type => ({ label: formatSnakeCaseString(type), value: type }))

export const parsingReportsModelConfig = {
  table: observable,

  onChangeActiveTable: action.bound,
}

import { formatSnakeCaseString } from '@utils/text'

import { ParsingReportsType } from './parsing-reports.type'

export const getSelectConfig = () =>
  Object.values(ParsingReportsType).map(type => ({ label: formatSnakeCaseString(type), value: type }))

import { ParsingReportsType } from '../parsing-reports.type'

export const getMainMethodUrl = (activeTable: ParsingReportsType) => {
  const baseMainUrl = 'integrations/reports?table='

  return baseMainUrl + `${activeTable}&`
}

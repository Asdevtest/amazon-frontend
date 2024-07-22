/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridExceljsProcessInput } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { formatDateWithoutTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

export const editExcelReport = (
  { worksheet }: GridExceljsProcessInput,
  columnsModel: IGridColumn[],
  currentData: any,
) => {
  for (let i = worksheet.rowCount; i >= 1; i--) {
    worksheet.spliceRows(i, 1)
  }

  const header = []
  for (const column of columnsModel) {
    if (!column.disableExport) {
      header.push(column.headerName)

      if (column.field === 'launchType') {
        header.push(`${t(TranslationKey['Launch type'])} - ${t(TranslationKey.Result)}`)
        header.push(`${t(TranslationKey['Launch type'])} - ${t(TranslationKey.Comment)}`)
        header.push(`${t(TranslationKey['Launch type'])} - ${t(TranslationKey['Start date'])}`)
        header.push(`${t(TranslationKey['Launch type'])} - ${t(TranslationKey['End date'])}`)
      }
    }
  }
  worksheet.addRow(header)

  // FIXME: refactor
  for (const row of currentData) {
    const listingLaunches = row?.listingLaunches
    let newRow = []

    if (listingLaunches?.length > 0) {
      for (const launch of listingLaunches) {
        for (const column of columnsModel) {
          if (column.disableExport) {
            continue
          }

          if (column.field === 'launchType') {
            newRow.push(column?.valueGetter?.(launch))
            newRow.push(launch?.result)
            newRow.push(launch?.comment)
            newRow.push(formatDateWithoutTime(launch?.dateFrom))
            newRow.push(formatDateWithoutTime(launch?.dateTo))
          } else {
            newRow.push(column?.valueGetter ? column?.valueGetter?.(row) : row[column.field])
          }
        }
        worksheet.addRow(newRow)
        newRow = []
      }
    } else {
      for (const column of columnsModel) {
        if (column.disableExport) {
          continue
        }

        if (column.field === 'launchType') {
          newRow.push('')
          newRow.push('')
          newRow.push('')
          newRow.push('')
          newRow.push('')
        } else {
          newRow.push(column?.valueGetter ? column?.valueGetter?.(row) : row[column.field])
        }
      }
      worksheet.addRow(newRow)
      newRow = []
    }
  }
}

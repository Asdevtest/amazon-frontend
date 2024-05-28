import dayjs from 'dayjs'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { CustomInputNumber } from '@components/shared/custom-input-number'
import { CustomRangeDatePicker } from '@components/shared/custom-range-date-picker'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { Launches } from '@components/shared/launches'
import { getLaunchName } from '@components/shared/launches/helpers/get-launch-name'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { ChangeCommentCellValueType, ChangeDateCellValueType, ChangeNumberCellValueType } from './report-modal.type'

interface ReportModalColumnsProps {
  onChangeNumberCellValue: ChangeNumberCellValueType
  onChangeCommentCellValue: ChangeCommentCellValueType
  onChangeDateCellValue: ChangeDateCellValueType
}

export const reportModalColumns = ({
  onChangeNumberCellValue,
  onChangeCommentCellValue,
  onChangeDateCellValue,
}: ReportModalColumnsProps) => {
  const columns: IGridColumn[] = [
    {
      field: 'launchType',
      headerName: t(TranslationKey['Launch type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Launch type'])} />,
      renderCell: ({ row }: GridRowModel) => (
        <Launches cell launchLabel={getLaunchName(row.type)} launches={[{ type: row.type, value: row.value }]} />
      ),
      width: 150,
    },

    {
      field: 'value',
      headerName: t(TranslationKey.Discount),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Discount)} />,
      renderCell: ({ row }: GridRowModel) => (
        <CustomInputNumber
          cell
          addonAfter="%"
          min={0}
          max={100}
          value={row.value}
          onChange={onChangeNumberCellValue(row._id, 'value')}
        />
      ),
      width: 110,
    },

    {
      field: 'dates',
      headerName: t(TranslationKey.Dates),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Dates)} />,
      renderCell: ({ row }: GridRowModel) => (
        <CustomRangeDatePicker
          cell
          value={[row.dateFrom ? dayjs(row.dateFrom) : null, row.dateFrom ? dayjs(row.dateTo) : null]}
          onChange={onChangeDateCellValue(row._id, 'dateFrom')} // or dateTo - same overall value
        />
      ),
      width: 260,
    },

    {
      field: 'description',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
      renderCell: ({ row }: GridRowModel) => (
        <CustomTextarea
          cell
          rows={2}
          placeholder="Enter"
          value={row.comment}
          onChange={onChangeCommentCellValue(row._id, 'comment')}
        />
      ),
      width: 210,
    },

    {
      field: 'result',
      headerName: t(TranslationKey.Result),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Result)} />,
      renderCell: ({ row }: GridRowModel) => (
        <CustomTextarea
          cell
          disabled
          rows={2}
          placeholder="Enter"
          value={row.result}
          onChange={onChangeCommentCellValue(row._id, 'result')}
        />
      ),
      width: 210,
    },
  ]

  for (const column of columns) {
    column.sortable = false
    column.disableColumnMenu = true
  }

  return columns
}

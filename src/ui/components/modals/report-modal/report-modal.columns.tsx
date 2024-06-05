import dayjs from 'dayjs'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { CustomInputNumber } from '@components/shared/custom-input-number'
import { CustomRangeDatePicker } from '@components/shared/custom-range-date-picker'
import { CustomTextarea } from '@components/shared/custom-textarea'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { LaunchCell, ResultCell } from './components'
import { ReportModalColumnsProps } from './report-modal.type'

export const reportModalColumns = (props: ReportModalColumnsProps) => {
  const {
    onChangeNumberCellValue,
    onChangeCommentCellValue,
    onChangeDateCellValue,
    onAddRequest,
    onRemoveLaunch,
    product,
  } = props

  const columns: IGridColumn[] = [
    {
      field: 'launchType',
      headerName: t(TranslationKey['Launch type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Launch type'])} />,
      renderCell: ({ row }: GridRowModel) => <LaunchCell row={row} product={product} onAddRequest={onAddRequest} />,
      width: 170,
    },

    {
      field: 'value',
      headerName: t(TranslationKey.Discount),
      renderHeader: () => <MultilineTextHeaderCell text={`${t(TranslationKey.Discount)}, %`} />,
      renderCell: ({ row }: GridRowModel) => (
        <CustomInputNumber
          isCell
          min={0}
          max={100}
          precision={0}
          maxLength={3}
          value={row.value}
          onChange={onChangeNumberCellValue(row._id, 'value')}
        />
      ),
      width: 90,
    },

    {
      field: 'dates',
      headerName: t(TranslationKey.Dates),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Dates)} />,
      renderCell: ({ row }: GridRowModel) => (
        <CustomRangeDatePicker
          isCell
          minDate={dayjs()}
          defaultValue={[row.dateFrom ? dayjs(row.dateFrom) : null, row.dateTo ? dayjs(row.dateTo) : null]}
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
          isCell
          allowClear
          rows={2}
          maxLength={512}
          placeholder="Enter"
          value={row.comment}
          onChange={onChangeCommentCellValue(row._id, 'comment')}
        />
      ),
      width: 215,
    },

    {
      field: 'result',
      headerName: t(TranslationKey.Result),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Result)} />,
      renderCell: ({ row }: GridRowModel) => (
        <ResultCell row={row} onChangeCommentCellValue={onChangeCommentCellValue} onRemoveLaunch={onRemoveLaunch} />
      ),
      width: 235,
    },
  ]

  for (const column of columns) {
    column.sortable = false
    column.disableColumnMenu = true
  }

  return columns
}

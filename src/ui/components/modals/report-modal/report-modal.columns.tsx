import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { CustomInputNumber } from '@components/shared/custom-input-number'
import { CustomRangeDatePicker } from '@components/shared/custom-range-date-picker'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { getLaunchName } from '@components/shared/launches/helpers/get-launch-name'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { ChangeCellCommentValueType, ChangeCellValueType } from './report-modal.type'

interface ReportModalColumnsProps {
  onChangeCellValue: ChangeCellValueType
  onChangeCellCommentValue: ChangeCellCommentValueType
}

export const reportModalColumns = ({ onChangeCellValue, onChangeCellCommentValue }: ReportModalColumnsProps) => {
  const columns: IGridColumn[] = [
    {
      field: 'launchType',
      headerName: t(TranslationKey['Launch type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Launch type'])} />,
      renderCell: ({ row }: GridRowModel) => <MultilineTextCell leftAlign twoLines text={getLaunchName(row.type)} />,
      width: 160,
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
          onChange={onChangeCellValue(row._id, 'value')}
        />
      ),
      width: 105,
    },

    {
      field: 'dates',
      headerName: t(TranslationKey.Dates),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Dates)} />,
      renderCell: ({ row }: GridRowModel) => <CustomRangeDatePicker cell />,
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
          onChange={onChangeCellCommentValue(row._id, 'comment')}
        />
      ),
      width: 200,
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
          onChange={onChangeCellCommentValue(row._id, 'result')}
        />
      ),
      width: 200,
    },
  ]

  for (const column of columns) {
    column.sortable = false
    column.disableColumnMenu = true
  }

  return columns
}

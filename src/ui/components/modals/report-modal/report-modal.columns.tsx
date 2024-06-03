import { Button } from 'antd'
import dayjs from 'dayjs'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { CustomInputNumber } from '@components/shared/custom-input-number'
import { CustomRangeDatePicker } from '@components/shared/custom-range-date-picker'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { Launches } from '@components/shared/launches'
import { getLaunchName } from '@components/shared/launches/helpers/get-launch-name'
import { CrossIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { Launches as LaunchesEnum } from '@typings/enums/launches'
import { IGridColumn } from '@typings/shared/grid-column'

import { ReportModalColumnsProps } from './report-modal.type'

export const reportModalColumns = (props: ReportModalColumnsProps) => {
  const {
    onChangeNumberCellValue,
    onChangeCommentCellValue,
    onChangeDateCellValue,
    onAddRequest,
    onRemoveLaunch,
    product,
    editMode,
  } = props

  const columns: IGridColumn[] = [
    {
      field: 'launchType',
      headerName: t(TranslationKey['Launch type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Launch type'])} />,
      renderCell: ({ row }: GridRowModel) => {
        const generatedSoloLaunch = { type: row.type, value: row.value }
        const isLinkRequest = row.type === LaunchesEnum.CUSTOM || row.type === LaunchesEnum.AB_TEST

        return (
          <Launches
            isCell
            product={product}
            isLinkRequest={isLinkRequest}
            launchLabel={getLaunchName(row.type)}
            launches={[generatedSoloLaunch]}
            onAddRequest={request => onAddRequest(generatedSoloLaunch, request)}
          />
        )
      },
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
          disabled={!editMode}
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
          disabled={!editMode}
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
          disabled={!editMode || row.expired}
          value={row.comment}
          onChange={onChangeCommentCellValue(row._id, 'comment')}
        />
      ),
      width: 220,
    },

    {
      field: 'result',
      headerName: t(TranslationKey.Result),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Result)} />,
      renderCell: ({ row }: GridRowModel) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <CustomTextarea
            isCell
            allowClear
            disabled={!editMode || !row.expired}
            rows={2}
            maxLength={1024}
            placeholder="Enter"
            value={row.result}
            onChange={onChangeCommentCellValue(row._id, 'result')}
          />

          <Button
            danger
            shape="circle"
            size="small"
            disabled={!editMode}
            icon={<CrossIcon style={{ width: 12, height: 12 }} onClick={() => onRemoveLaunch(row._id)} />}
          />
        </div>
      ),
      width: 240,
    },
  ]

  for (const column of columns) {
    column.sortable = false
    column.disableColumnMenu = true
  }

  return columns
}

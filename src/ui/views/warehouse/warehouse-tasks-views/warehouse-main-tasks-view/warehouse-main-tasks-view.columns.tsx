import { colorByTaskPriorityStatus, taskPriorityStatusTranslate } from '@constants/task/task-priority-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  MultipleAsinCell,
  NormDateFromUnixCell,
  StringListCell,
  TaskDescriptionCell,
  TaskTypeCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { TaskPriority } from '@typings/enums/task-priority'
import { IGridColumn } from '@typings/shared/grid-column'

import { ColumnsProps } from './warehouse-main-tasks-view.config'

export const WarehouseMainTasksViewColumns = ({ onChangeTask }: ColumnsProps) => {
  const columns: IGridColumn[] = [
    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
      renderCell: ({ row }) => (
        <ActionButtonsCell showFirst firstContent={t(TranslationKey.View)} onClickFirst={() => onChangeTask(row._id)} />
      ),
      width: 120,
    },
    {
      field: 'operationType',
      headerName: t(TranslationKey.Type),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Type)} />,
      renderCell: ({ row }) => <TaskTypeCell operationType={row.operationType} />,
      width: 140,
    },
    {
      field: 'priority',
      headerName: t(TranslationKey.Priority),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Priority)} />,
      renderCell: ({ row }) => (
        <Text
          isCell
          color={colorByTaskPriorityStatus(TaskPriority[row.priority])}
          text={taskPriorityStatusTranslate(TaskPriority[row.priority])}
        />
      ),
      width: 120,
    },
    {
      field: 'description',
      headerName: t(TranslationKey.Description),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,
      renderCell: ({ row }) => <TaskDescriptionCell task={row} />,
      width: 320,
    },
    {
      field: 'asin',
      headerName: 'ASIN',
      renderHeader: () => <MultilineTextHeaderCell text="ASIN" />,
      renderCell: ({ row }) => <MultipleAsinCell asinList={row.asin} />,
      width: 160,
    },
    {
      field: 'trackNumber',
      headerName: t(TranslationKey['Track number']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Track number'])} />,
      renderCell: ({ row }) => (
        <StringListCell withCopy maxItemsDisplay={4} maxLettersInItem={10} sourceString={row.trackNumber} />
      ),
      width: 160,
    },
    {
      field: 'orderId',
      headerName: t(TranslationKey['Order number']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Order number'])} />,
      renderCell: ({ row }) => <StringListCell maxItemsDisplay={4} maxLettersInItem={10} sourceString={row.orderId} />,
      width: 160,
    },
    {
      field: 'item',
      headerName: 'item',
      renderHeader: () => <MultilineTextHeaderCell text="item" />,
      renderCell: ({ row }) => <StringListCell maxItemsDisplay={4} maxLettersInItem={10} sourceString={row.item} />,
      width: 160,
    },
    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: ({ row }) => <NormDateFromUnixCell value={row.createdAt} />,
      width: 115,
    },
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: ({ row }) => <NormDateFromUnixCell value={row.updatedAt} />,
      width: 115,
    },
  ]

  for (const column of columns) {
    column.sortable = false
    column.filterable = false
  }

  return columns
}

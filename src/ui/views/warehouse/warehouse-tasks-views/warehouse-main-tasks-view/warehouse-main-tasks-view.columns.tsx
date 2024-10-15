import { GridRowModel } from '@mui/x-data-grid-premium'

import { TaskOperationType } from '@constants/task/task-operation-type'
import { colorByTaskPriorityStatus, taskPriorityStatusTranslate } from '@constants/task/task-priority-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  CheckboxCell,
  MultilineTextHeaderCell,
  MultipleAsinCell,
  NormDateFromUnixCell,
  StringListCell,
  TaskDescriptionCell,
  TaskPriorityCell,
  TaskTypeCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { TaskPriority } from '@typings/enums/task-priority'
import { TaskStatus } from '@typings/enums/task-status'
import { ITask } from '@typings/models/tasks/task'
import { IGridColumn } from '@typings/shared/grid-column'

import { ColumnsProps } from './warehouse-main-tasks-view.config'

export const warehouseMainTasksViewColumns = (props: ColumnsProps) => {
  const { onChangeTask, onPickupTask, onCancelTask, onUpdateTaskPriority, onUpdateTask, status } = props

  const isNewOrMyTasks = [TaskStatus.NEW, TaskStatus.AT_PROCESS].includes(status)
  const isMyTask = status === TaskStatus.AT_PROCESS
  const isNewTask = status === TaskStatus.NEW

  const commentColumn = isNewOrMyTasks
    ? {
        field: 'reason',
        headerName: t(TranslationKey.Comment),
        renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
        renderCell: ({ row }: GridRowModel) => (
          <Text
            isCell
            editMode
            text={row.reason}
            onClickSubmit={reason => onUpdateTask(row._id, row.priority, reason)}
          />
        ),
        width: 280,
      }
    : null
  const isBarCodeAttachedColumn = isNewOrMyTasks
    ? {
        field: 'isBarCodeAttached',
        headerName: 'barcode',
        renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,
        renderCell: ({ row }: GridRowModel) => <CheckboxCell disabled checked={row.isBarCodeAttached} />,
        width: 80,
      }
    : null

  const columns: IGridColumn[] = [
    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
      renderCell: ({ row }) => {
        const firstContent = t(TranslationKey[isNewTask ? 'Get to work' : isMyTask ? 'Resolve' : 'View'])
        const onClickFirst = () => (isNewTask ? onPickupTask(row as ITask) : onChangeTask(row._id))

        return (
          <ActionButtonsCell
            showFirst
            secondDanger
            firstContent={firstContent}
            showSecond={isNewOrMyTasks}
            secondDisabled={row.operationType === TaskOperationType.RECEIVE}
            secondContent={t(TranslationKey['Cancel task'])}
            secondConfirmText="After confirmation, the task will be cancelled. Confirm?"
            onClickFirst={onClickFirst}
            onClickSecond={() => onCancelTask(row.boxes[0]?._id, row._id, row.operationType)}
          />
        )
      },
      width: isNewOrMyTasks ? 150 : 120,
    },
    commentColumn as IGridColumn,
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
      renderCell: ({ row }) =>
        isNewOrMyTasks ? (
          <TaskPriorityCell curPriority={row.priority} taskId={row._id} onChangePriority={onUpdateTaskPriority} />
        ) : (
          <Text
            isCell
            color={colorByTaskPriorityStatus(TaskPriority[row.priority])}
            text={taskPriorityStatusTranslate(TaskPriority[row.priority])}
          />
        ),
      width: isNewOrMyTasks ? 170 : 120,
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
    isBarCodeAttachedColumn as IGridColumn,
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

  const filteredColumns = columns.filter(column => column)

  for (const column of filteredColumns) {
    column.sortable = false
    column.filterable = false
  }

  return filteredColumns
}

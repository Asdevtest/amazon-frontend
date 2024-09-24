import { TaskStatus, mapTaskStatusEmumToKey } from '@constants/task/task-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  CheckboxCell,
  ClientTasksActionBtnsCell,
  MultilineTextHeaderCell,
  NormDateFromUnixCell,
  StringListCell,
  TaskDescriptionCell,
  TaskPriorityCell,
  TaskStatusCell,
  TaskTypeCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

export const clientTasksViewColumns = handlers => {
  const columns = [
    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

      width: 130,

      renderCell: params => <ClientTasksActionBtnsCell handlers={handlers} row={params.row} />,
      filterable: false,
      disableCustomSort: true,
      align: 'center',
    },

    {
      field: 'priority',
      headerName: t(TranslationKey.Priority),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Priority)} />,

      width: window.innerWidth < 1282 ? 140 : 170,
      renderCell: params => (
        <TaskPriorityCell
          disabled={
            params.row.status === mapTaskStatusEmumToKey[TaskStatus.SOLVED] ||
            params.row.status === mapTaskStatusEmumToKey[TaskStatus.NOT_SOLVED]
          }
          curPriority={params.value}
          taskId={params.row._id}
          onChangePriority={handlers.updateTaskPriority}
        />
      ),
    },

    {
      field: 'reason',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

      width: 280,

      renderCell: params => (
        <Text
          isCell
          editMode
          text={params.row.reason}
          onClickSubmit={reason => handlers.updateTaskComment(params.row._id, params.row.priority, reason)}
        />
      ),
    },

    {
      field: 'operationType',
      headerName: t(TranslationKey.Type),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Type)} />,

      width: 180,
      renderCell: params => <TaskTypeCell operationType={params.value} />,
    },

    {
      field: 'description',
      headerName: t(TranslationKey.Description),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,

      width: 290,
      renderCell: params => <TaskDescriptionCell task={params.row} />,
      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'asin',
      headerName: 'ASIN',
      renderHeader: () => <MultilineTextHeaderCell text={'ASIN'} />,

      renderCell: params => (
        <StringListCell
          withCopy
          maxItemsDisplay={4}
          maxLettersInItem={10}
          sourceString={params.row?.boxesBefore?.reduce(
            (ac, c) => [...ac, ...c.items.reduce((acc, cur) => [...acc, cur?.product?.asin], [])],
            [],
          )}
        />
      ),

      disableCustomSort: true,
      width: window.innerWidth < 1282 ? 100 : 160,
    },

    {
      field: 'storekeeper',
      headerName: t(TranslationKey['Int warehouse']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,

      renderCell: params => <UserCell name={params.row.storekeeper?.name} id={params.row.storekeeper?._id} />,
      width: 170,
      disableCustomSort: true,
    },

    {
      field: 'orderId',
      headerName: t(TranslationKey['Order number']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Order number'])} />,

      renderCell: params => (
        <StringListCell
          maxItemsDisplay={4}
          maxLettersInItem={10}
          sourceString={params.row?.boxesBefore.reduce(
            (ac, c) => [...ac, ...c.items.reduce((acc, cur) => [...acc, cur?.order?.id], [])],
            [],
          )}
        />
      ),
      type: 'number',
      disableCustomSort: true,
      width: window.innerWidth < 1282 ? 73 : 160,
    },

    {
      field: 'isBarCodeAttached',
      headerName: 'barcode',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

      renderCell: params => <CheckboxCell disabled checked={params.value} />,
      width: window.innerWidth < 1282 ? 65 : 160,
      type: 'boolean',
    },

    {
      field: 'item',
      headerName: 'item',
      renderHeader: () => <MultilineTextHeaderCell text="item" />,

      renderCell: params => (
        <StringListCell
          maxItemsDisplay={4}
          maxLettersInItem={10}
          sourceString={params.row?.boxesBefore.reduce(
            (ac, c) => [...ac, ...c.items.reduce((acc, cur) => [...acc, cur.order.item && cur.order.item], [])],
            [],
          )}
        />
      ),
      disableCustomSort: true,
      width: window.innerWidth < 1282 ? 54 : 160,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

      width: 130,
      renderCell: params => <TaskStatusCell status={params.value} />,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

      width: 130,
      renderCell: params => <NormDateFromUnixCell value={params.value} />,
      // type: 'date',
    },
  ]

  for (const column of columns) {
    column.sortable = false
  }

  return columns
}

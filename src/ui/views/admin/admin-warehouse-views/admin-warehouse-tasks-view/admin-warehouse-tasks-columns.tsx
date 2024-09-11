import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateFromUnixCell,
  TaskDescriptionCell,
  TaskStatusCell,
  TaskTypeCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { ITask } from '@typings/models/tasks/task'
import { IGridColumn } from '@typings/shared/grid-column'

interface IHandlers {
  setCurrentOpenedTask: (item: ITask) => void
}

export const adminWarehouseTasksColumns = (handlers: IHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'operationType',
      headerName: t(TranslationKey.Type),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Type)} />,

      width: 180,
      renderCell: params => <TaskTypeCell operationType={params.row.operationType} />,
    },

    {
      field: 'description',
      headerName: t(TranslationKey.Description),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,

      width: 330,
      renderCell: params => <TaskDescriptionCell task={params.row} />,

      disableCustomSort: true,
    },

    {
      field: 'storekeeper',
      headerName: t(TranslationKey.Storekeeper),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Storekeeper)} />,

      width: 180,
      align: 'center',
      renderCell: params => <UserLinkCell blackText name={params.value.name} userId={params.value?._id} />,
    },

    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

      width: 190,
      align: 'center',
      renderCell: params => (
        <ActionButtonsCell
          showFirst
          firstContent={t(TranslationKey.Details)}
          onClickFirst={() => handlers.setCurrentOpenedTask(params.row as ITask)}
        />
      ),
      disableCustomSort: true,
    },
    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

      width: 130,
      align: 'center',
      renderCell: params => <TaskStatusCell status={params.value} />,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

      width: 110,
      renderCell: params => <NormDateFromUnixCell value={params.value} />,
    },
  ]

  for (const column of columns) {
    column.sortable = false
    column.filterable = false
  }

  return columns
}

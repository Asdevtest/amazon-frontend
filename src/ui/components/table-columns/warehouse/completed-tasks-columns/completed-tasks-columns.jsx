import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  TaskDescriptionCell,
  NormalActionBtnCell,
  NormDateFromUnixCell,
  TaskTypeCell,
  MultilineTextHeaderCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const warehouseCompletedTasksViewColumns = (handlers, firstRowId) => [
  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 250,
    renderCell: params => (
      <NormalActionBtnCell
        isFirstRow={firstRowId === params.row.id}
        tooltipText={t(TranslationKey['Open the window with task information'])}
        bTnText={t(TranslationKey.View)}
        onClickOkBtn={() => handlers.setCurrentOpenedTask(params.row.originalData)}
      />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'operationType',
    headerName: t(TranslationKey.Type),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Type)} />,

    width: 200,
    renderCell: params => <TaskTypeCell task={params.row.originalData} />,
  },
  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,

    width: 600,
    renderCell: params => <TaskDescriptionCell task={params.row.originalData} />,
    filterable: false,
    sortable: false,
  },
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    width: 150,
    renderCell: params => <NormDateFromUnixCell value={params.value} />,
    type: 'date',
  },
]

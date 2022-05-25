import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  NormDateFromUnixCell,
  TaskDescriptionCell,
  renderFieldValueCell,
  ClientTasksActionBtnsCell,
  UserLinkCell,
  TaskTypeCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const clientTasksViewColumns = handlers => [
  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    width: 110,
    renderCell: params => <NormDateFromUnixCell value={params.value} />,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    width: 110,
    renderCell: params => <NormDateFromUnixCell value={params.value} />,
    type: 'date',
  },

  {
    field: 'operationType',
    headerName: t(TranslationKey.Type),
    width: 130,
    renderCell: params => <TaskTypeCell task={params.row.originalData} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    width: 450,
    renderCell: params => <TaskDescriptionCell task={params.row.originalData} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey['Int warehouse']),
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.storekeeper?._id} />,
    width: 170,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    width: 330,

    renderCell: params => <ClientTasksActionBtnsCell handlers={handlers} row={params.row.originalData} />,
    filterable: false,
    sortable: false,
  },
  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    width: 130,
    renderCell: params => renderFieldValueCell(params.value),
    filterable: false,
    sortable: false,
  },
]

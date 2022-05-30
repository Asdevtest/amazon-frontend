import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  EditOrRemoveBtnsCell,
  NormDateCell,
  renderFieldValueCell,
  ScrollingCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const adminSinglePermissionsColumns = handlers => [
  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderCell: params => <NormDateCell params={params} />,
    width: 130,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderCell: params => <NormDateCell params={params} />,
    width: 130,
    type: 'date',
  },

  {
    field: 'key',
    headerName: t(TranslationKey.Key),
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'role',
    headerName: t(TranslationKey.Role),
    width: 140,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    width: 400,
    renderCell: params => <ScrollingCell value={params.value} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    width: 200,
    renderCell: params => <EditOrRemoveBtnsCell handlers={handlers} row={params.row.originalData} />,
    filterable: false,
    sortable: false,
  },
]

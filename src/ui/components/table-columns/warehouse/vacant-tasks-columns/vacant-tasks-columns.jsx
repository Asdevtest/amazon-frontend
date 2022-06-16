import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  NormDateFromUnixCell,
  TaskDescriptionCell,
  renderFieldValueCell,
  NormalActionBtnCell,
  TaskTypeCell,
  MultilineTextHeaderCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const warehouseVacantTasksViewColumns = handlers => [
  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    width: 150,
    renderCell: params => <NormDateFromUnixCell value={params.value} />,
    type: 'date',
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

    width: 400,
    renderCell: params => <TaskDescriptionCell task={params.row.originalData} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    width: 150,
    renderCell: params => renderFieldValueCell(params.value),
    filterable: false,
    sortable: false,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 250,
    renderCell: params => (
      <NormalActionBtnCell
        bTnText={t(TranslationKey['Get to work'])}
        onClickOkBtn={() => handlers.onClickPickupBtn(params.row.originalData)}
      />
    ),
    filterable: false,
    sortable: false,
  },
]

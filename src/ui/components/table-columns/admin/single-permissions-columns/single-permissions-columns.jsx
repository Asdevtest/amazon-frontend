import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateCell,
  MultilineTextCell,
  ScrollingCell,
  EditOrRemoveIconBtnsCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const adminSinglePermissionsColumns = handlers => [
  {
    field: 'key',
    headerName: t(TranslationKey.Key),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Key)} />,

    width: 250,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'role',
    headerName: t(TranslationKey.Role),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Role)} />,

    width: 140,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

    width: 250,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,

    width: 430,
    renderCell: params => <ScrollingCell value={params.value} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    width: 180,
    renderCell: params => (
      <EditOrRemoveIconBtnsCell
        tooltipFirstButton={t(TranslationKey.Edit)}
        tooltipSecondButton={t(TranslationKey.Remove)}
        handlers={handlers}
        row={params.row.originalData}
      />
    ),

    filterable: false,
    sortable: false,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    renderCell: params => <NormDateCell params={params} />,
    width: 130,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell params={params} />,
    width: 150,
    type: 'date',
  },
]

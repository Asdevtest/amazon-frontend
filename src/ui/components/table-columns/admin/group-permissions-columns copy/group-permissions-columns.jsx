import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineTextAlignLeftHeaderCell,
  EditOrRemoveIconBtnsCell,
  ShortDateCell,
  MultilineTextAlignLeftCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const adminGroupPermissionsColumns = (handlers, firstRowId) => [
  {
    field: 'key',
    headerName: t(TranslationKey.Key),
    renderHeader: () => <MultilineTextAlignLeftHeaderCell text={t(TranslationKey.Key)} />,

    width: 280,
    renderCell: params => <MultilineTextAlignLeftCell text={params.value} />,
  },

  {
    field: 'role',
    headerName: t(TranslationKey.Role),
    renderHeader: () => <MultilineTextAlignLeftHeaderCell text={t(TranslationKey.Role)} />,

    width: 140,
    renderCell: params => <MultilineTextAlignLeftCell text={params.value} />,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextAlignLeftHeaderCell text={t(TranslationKey.Title)} />,

    width: 200,
    renderCell: params => <MultilineTextAlignLeftCell text={params.value} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextAlignLeftHeaderCell text={t(TranslationKey.Description)} />,

    width: 450,
    renderCell: params => <MultilineTextAlignLeftCell text={params.value} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextAlignLeftHeaderCell text={t(TranslationKey.Actions)} />,

    width: 180,
    renderCell: params => (
      <EditOrRemoveIconBtnsCell
        tooltipFirstButton={t(TranslationKey.Edit)}
        tooltipSecondButton={t(TranslationKey.Remove)}
        handlers={handlers}
        row={params.row.originalData}
        isFirstRow={firstRowId === params.row.id}
      />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextAlignLeftHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <ShortDateCell params={params} />,
    width: 110,
    type: 'date',
  },
]

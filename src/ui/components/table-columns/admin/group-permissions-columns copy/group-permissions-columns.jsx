import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  NormDateCell,
  MultilineTextCell,
  MultilineTextAlignLeftCell,
  EditOrRemoveIconBtnsCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const adminGroupPermissionsColumns = handlers => [
  {
    field: 'key',
    headerName: t(TranslationKey.Key),
    renderHeader: () => <MultilineTextAlignLeftCell text={t(TranslationKey.Key)} />,

    width: 252,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'role',
    headerName: t(TranslationKey.Role),
    renderHeader: () => <MultilineTextAlignLeftCell text={t(TranslationKey.Role)} />,

    width: 140,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextAlignLeftCell text={t(TranslationKey.Title)} />,

    width: 155,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextAlignLeftCell text={t(TranslationKey.Description)} />,

    width: 265,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextAlignLeftCell text={t(TranslationKey.Actions)} />,

    width: 311,
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
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextAlignLeftCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell params={params} />,
    width: 405,
    type: 'date',
  },
]

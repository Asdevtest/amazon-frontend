import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  MultilineTextCell,
  EditOrRemoveIconBtnsCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const tagsColumns = handlers => [
  {
    field: 'title',
    headerName: t(TranslationKey['Tag name']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Tag name'])} />,
    renderCell: params => <MultilineTextCell text={params.value} />,

    width: 240,
  },

  {
    field: 'productCount',
    headerName: t(TranslationKey['Number of uses']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Number of uses'])} />,
    renderCell: params => <MultilineTextCell text={params.value} />,

    width: 170,
  },

  // TODO: When they add methods, remove disableActionBtn
  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    renderCell: params => <EditOrRemoveIconBtnsCell disableActionBtn handlers={handlers} row={params.row} />,

    filterable: false,
    sortable: false,
    width: 150,
  },
]

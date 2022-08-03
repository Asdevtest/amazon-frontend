import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  MultilineTextCell,
  NormalActionBtnCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const depersonalizedPickColumns = handlers => [
  {
    field: 'number',
    headerName: '№',
    renderHeader: () => <MultilineTextHeaderCell text={'№'} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 300,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: params => (
      <NormalActionBtnCell
        isFirstRow
        tooltipText={t(TranslationKey['Assign the task of finding a supplier to Bayer'])}
        bTnText={t(TranslationKey['Get to work'])}
        onClickOkBtn={() => handlers.onPickUp(params.row.originalData)}
      />
    ),
    width: 550,
  },
]

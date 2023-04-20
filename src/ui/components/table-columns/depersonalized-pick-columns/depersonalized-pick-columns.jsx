import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  MultilineTextCell,
  NormalActionBtnCell,
  NormDateCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const depersonalizedPickColumns = (handlers, isSupervisor, firstRowId) => [
  {
    field: 'number',
    headerName: '№',
    renderHeader: () => <MultilineTextHeaderCell text={'№'} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 300,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: params => (
      <NormalActionBtnCell
        isFirstRow={firstRowId === params.row.id}
        tooltipText={
          isSupervisor
            ? t(TranslationKey['Assign a product card to a supervisor'])
            : t(TranslationKey['To assign the order to Byer'])
        }
        bTnText={t(TranslationKey['Get to work'])}
        onClickOkBtn={() => handlers.onPickUp(params.row.originalData)}
      />
    ),
    width: 550,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    minWidth: 150,
    flex: 1,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },
]

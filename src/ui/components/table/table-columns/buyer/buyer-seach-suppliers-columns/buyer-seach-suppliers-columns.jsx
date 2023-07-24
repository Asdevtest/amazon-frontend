/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextAlignLeftCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  NormalActionBtnCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const buyerSearchSuppliersViewColumns = handlers => [
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

    renderCell: params => {
      const onPickUpeMemo = useCallback(() => handlers.onPickUp(params.row.originalData), [])

      return (
        <NormalActionBtnCell
          isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
          tooltipText={t(TranslationKey['Assign the task of finding a supplier to the Buyer'])}
          bTnText={t(TranslationKey['Get to work'])}
          onClickOkBtn={onPickUpeMemo}
        />
      )
    },
    width: 550,
    filterable: false,
    sortable: false,
  },

  {
    field: 'checkednotes',
    headerName: t(TranslationKey['Comments from the supervisor']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Comments from the supervisor'])} />,

    renderCell: params => <MultilineTextAlignLeftCell withTooltip text={params.value} />,
    width: 400,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    minWidth: 150,
    flex: 1,
    renderCell: params => <NormDateCell value={params.value} />,
    // type: 'date',
  },
]

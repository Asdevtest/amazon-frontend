import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  NormDateCell,
  renderFieldValueCell,
  ScrollingCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const financesViewColumns = () => [
  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderCell: params => <NormDateCell params={params} />,
    width: 110,
    type: 'date',
  },

  {
    field: 'type',
    headerName: t(TranslationKey.Type),
    width: 90,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'sum',
    headerName: t(TranslationKey.Sum),
    width: 110,
    type: 'number',
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
  },

  {
    field: 'creatorName',
    headerName: t(TranslationKey.Initiator),
    width: 170,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'recipientName',
    headerName: t(TranslationKey.Recipient),
    width: 170,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'paymentType',
    headerName: t(TranslationKey.Category),
    width: 230,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'comment',
    headerName: t(TranslationKey.Comment),
    width: 800,
    renderCell: params => (
      <ScrollingCell
        value={`${params.value} ${params.row?.originalData?.product ? params.row.originalData.product?.id : ''}`}
      />
    ),
  },
]

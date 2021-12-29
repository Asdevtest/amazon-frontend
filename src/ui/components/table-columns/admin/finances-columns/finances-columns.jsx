import React from 'react'

import {texts} from '@constants/texts'

import {
  NormDateCell,
  renderFieldValueCell,
  ScrollingCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').adminFinancesTableColumns

export const adminFinancesViewColumns = () => [
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    renderCell: params => <NormDateCell params={params} />,
    width: 130,
    type: 'date',
  },

  {
    field: 'comment',
    headerName: textConsts.commentField,
    width: 400,
    renderCell: params => (
      <ScrollingCell
        value={`${params.value} ${params.row?.originalData?.product ? params.row.originalData.product?.id : ''}`}
      />
    ),
  },

  {
    field: 'sum',
    headerName: textConsts.sumField,
    width: 160,
    type: 'number',
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
  },

  {
    field: 'creatorName',
    headerName: textConsts.creatorNameField,
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'recipientName',
    headerName: textConsts.recipientNameField,
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },
]

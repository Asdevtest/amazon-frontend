import React from 'react'

import {texts} from '@constants/texts'

import {
  NormDateCell,
  renderFieldValueCell,
  ScrollingCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').financesTableColumns

export const financesViewColumns = () => [
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    renderCell: params => <NormDateCell params={params} />,
    width: 130,
    type: 'date',
  },

  {
    field: 'type',
    headerName: textConsts.typeField,
    width: 110,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'sum',
    headerName: textConsts.sumField,
    width: 110,
    type: 'number',
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
  },

  {
    field: 'creatorName',
    headerName: textConsts.creatorNameField,
    width: 170,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'recipientName',
    headerName: textConsts.recipientNameField,
    width: 170,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'comment',
    headerName: textConsts.commentField,
    width: 800,
    renderCell: params => (
      <ScrollingCell
        value={`${params.value} ${params.row?.originalData?.product ? params.row.originalData.product?.id : ''}`}
      />
    ),
  },
]

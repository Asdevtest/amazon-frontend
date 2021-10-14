import React from 'react'

import {texts} from '@constants/texts'

import {renderFieldValueCell, ToFixedWithDollarSignCell} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').adminFinancesTableColumns

export const adminFinancesViewColumns = () => [
  {
    field: 'comment',
    headerName: textConsts.commentField,
    width: 400,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'sum',
    headerName: textConsts.sumField,
    width: 160,
    type: 'number',
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
  },

  {
    field: 'tmpCreatorName',
    headerName: textConsts.creatorNameField,
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'tmpRecipientName',
    headerName: textConsts.recipientNameField,
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },
]

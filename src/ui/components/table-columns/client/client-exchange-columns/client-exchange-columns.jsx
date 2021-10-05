import React from 'react'

import {texts} from '@constants/texts'

import {
  renderFieldValueCell,
  SmallRowImageCell,
  SuccessActionBtnCell,
  ToFixedWithDollarSignCell,
  ToFixedWithKgSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {calcProductPrice} from '@utils/calculation'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign} from '@utils/text'

const textConsts = getLocalizedTexts(texts, 'ru').clientExchangeTableColumns

export const clientExchangeViewColumns = handlers => [
  {
    field: 'image',
    headerName: textConsts.imageField,
    width: 150,
    renderCell: params => <SmallRowImageCell images={params.row.images} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'category',
    headerName: textConsts.categoryField,
    renderCell: params => renderFieldValueCell(params.row.category),
    width: 150,
  },

  {
    field: 'amazon',
    headerName: textConsts.priceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.row.amazon} fix={2} />,
    width: 150,
    type: 'number',
  },

  {
    field: 'weight',
    headerName: textConsts.weightField,
    renderCell: params => <ToFixedWithKgSignCell value={params.row.weight} fix={2} />,
    width: 150,
    type: 'number',
  },

  {
    field: 'bsr',
    headerName: textConsts.bsrField,
    renderCell: params => renderFieldValueCell(params.row.bsr),
    width: 150,
    type: 'number',
  },

  {
    field: 'fbaamount',
    headerName: textConsts.fbaamountField,
    renderCell: params => renderFieldValueCell(params.row.bsr),
    width: 150,
    type: 'number',
  },

  {
    field: 'tmpResearcherName',
    headerName: textConsts.researcherField,
    renderCell: params => renderFieldValueCell(params.row.tmpResearcherName),
    width: 200,
  },

  {
    field: 'tmpBuyerName',
    headerName: textConsts.buyerField,
    renderCell: params => renderFieldValueCell(params.row.tmpBuyerName),
    width: 200,
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 250,
    renderCell: params => (
      <SuccessActionBtnCell
        bTnText={`${textConsts.byForBtn} ${toFixedWithDollarSign(calcProductPrice(params.row))}`}
        onClickOkBtn={() => handlers.onClickLaunchPrivateLabelBtn(params.row)}
      />
    ),
    filterable: false,
    sortable: false,
  },
]

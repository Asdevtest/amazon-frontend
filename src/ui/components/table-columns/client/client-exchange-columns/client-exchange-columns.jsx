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
    width: 100,
    renderCell: params => <SmallRowImageCell images={params.row.images} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'strategyStatus',
    headerName: textConsts.strategyStatusField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },

  {
    field: 'category',
    headerName: textConsts.categoryField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'amazon',
    headerName: textConsts.priceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 130,
    type: 'number',
  },

  {
    field: 'weight',
    headerName: textConsts.weightField,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    width: 130,
    type: 'number',
  },

  {
    field: 'bsr',
    headerName: textConsts.bsrField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 130,
    type: 'number',
  },

  {
    field: 'fbaamount',
    headerName: textConsts.fbaamountField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 130,
    type: 'number',
  },

  {
    field: 'researcherName',
    headerName: textConsts.researcherField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'buyerName',
    headerName: textConsts.buyerField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 250,
    renderCell: params => (
      <SuccessActionBtnCell
        bTnText={`${textConsts.byForBtn} ${toFixedWithDollarSign(calcProductPrice(params.row.originalData), 2)}`}
        onClickOkBtn={() => handlers.onClickLaunchPrivateLabelBtn(params.row.originalData)}
      />
    ),
    filterable: false,
    sortable: false,
  },
]

import React from 'react'

import {texts} from '@constants/texts'

import {AsinCell, DateCell, PriceCell, renderFieldValueCell} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').exchangeCheckingColumns

export const exchangeWaitingColumns = () => [
  {
    field: 'asinCell',
    headerName: textConsts.asinField,
    renderCell: params => <AsinCell params={params} />,
    width: 300,
  },
  {
    field: 'price',
    headerName: textConsts.priceField,
    renderCell: params => <PriceCell params={params} />,
    width: 150,
  },
  {
    field: 'createdat',
    headerName: textConsts.createDateField,
    renderCell: params => <DateCell params={params} />,
    width: 150,
  },
  {
    field: 'checkedat',
    headerName: textConsts.checkDateField,
    renderCell: params => <DateCell params={params} />,
    width: 150,
  },
  {
    field: 'updateDate',
    headerName: textConsts.updateDateField,
    renderCell: params => <DateCell params={params} />,
    width: 150,
  },
  {
    field: 'profit',
    headerName: textConsts.profitField,
    renderCell: params => renderFieldValueCell({params}),
    width: 150,
  },
  {
    field: 'margin',
    headerName: textConsts.marginField,
    renderCell: params => renderFieldValueCell({params}),
    width: 150,
  },
  {
    field: 'bsr',
    headerName: textConsts.bsrField,
    renderCell: params => renderFieldValueCell({params}),
    width: 150,
  },
  {
    field: 'fbafee',
    headerName: textConsts.fbaField,
    renderCell: params => renderFieldValueCell({params}),
    width: 150,
  },
  {
    field: 'fbaamount',
    headerName: textConsts.fbaAmountField,
    renderCell: params => renderFieldValueCell({params}),
    width: 150,
  },
  {
    field: 'barCode',
    headerName: textConsts.barcodeField,
    renderCell: params => renderFieldValueCell({params}),
    width: 150,
  },
]

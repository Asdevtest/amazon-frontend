import React from 'react'

import {texts} from '@constants/texts'

import {
  AsinCell,
  BuyerCell,
  DateCell,
  PriceCell,
  ResearcherCell,
  SupervisorCell,
  SupplierCell,
  renderFieldValueCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').exchangeBuyerWorkColumns

export const exchangeBuyerWorkColumns = () => [
  {
    field: 'asinCell',
    headerName: textConsts.asinField,
    renderCell: params => <AsinCell params={params} />,
    width: 300,
  },
  {
    field: 'amazon',
    headerName: textConsts.priceField,
    renderCell: params => <PriceCell params={params} />,
    width: 150,
  },
  {
    field: 'researcher',
    headerName: textConsts.researcherField,
    renderCell: params => <ResearcherCell params={params} />,
    width: 150,
  },

  {
    field: 'buyer',
    headerName: textConsts.buyerField,
    renderCell: params => <BuyerCell params={params} />,
    width: 150,
  },
  {
    field: 'supervisor',
    headerName: textConsts.supervisorField,
    renderCell: params => <SupervisorCell params={params} />,
    width: 150,
  },
  {
    field: 'currentSupplier',
    headerName: textConsts.supplierField,
    renderCell: params => <SupplierCell params={params} />,
    width: 150,
  },
  {
    field: 'dateFind',
    headerName: textConsts.supervisorDateFindField,
    renderCell: params => <DateCell params={params} />,
    flex: 1,
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

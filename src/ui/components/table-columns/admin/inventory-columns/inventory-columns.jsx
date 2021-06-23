import React from 'react'

import {texts} from '@constants/texts'

import {
  AsinCell,
  BuyerCell,
  FeesValuesWithCalculateBtnCell,
  PriceCell,
  RankCell,
  RatingCell,
  ResearcherCell,
  SalesCell,
  SalesTotalCell,
  SupervisorCell,
  SupplierCell,
  TypeCell,
  renderFieldValueCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').exchangeInventoryColumns

export const exchangeInventoryColumns = () => [
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
    field: 'fees-net',
    headerName: textConsts.feesAndNetField,
    renderCell: params => <FeesValuesWithCalculateBtnCell params={params} />,
    width: 150,
  },

  {
    field: 'supplier',
    headerName: textConsts.supplierField,
    renderCell: params => <SupplierCell params={params} />,
    width: 150,
  },
  {
    field: 'supervisor',
    headerName: textConsts.supervisorField,
    renderCell: params => <SupervisorCell params={params} />,
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
    field: 'rank',
    headerName: textConsts.rankField,
    renderCell: params => <RankCell params={params} />,
    width: 150,
  },
  {
    field: 'rating',
    headerName: textConsts.ratingField,
    renderCell: params => <RatingCell params={params} />,
    width: 300,
  },
  {
    field: 'sales',
    headerName: textConsts.salesField,
    renderCell: params => <SalesCell params={params} />,
    width: 150,
  },
  {
    field: 'salersTotal',
    headerName: textConsts.salesTotalField,
    renderCell: params => <SalesTotalCell params={params} />,
    width: 150,
  },
  {
    field: 'type',
    headerName: textConsts.typeField,
    renderCell: params => <TypeCell params={params} />,
    width: 150,
  },

  {
    field: 'revenue',
    headerName: textConsts.revenueField,
    renderCell: params => renderFieldValueCell({params}),
    width: 150,
  },
  {
    field: 'amazonPrice',
    headerName: textConsts.amazonPriceField,
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
    field: 'barCode',
    headerName: textConsts.barcodeField,
    renderCell: params => renderFieldValueCell({params}),
    width: 150,
  },
]

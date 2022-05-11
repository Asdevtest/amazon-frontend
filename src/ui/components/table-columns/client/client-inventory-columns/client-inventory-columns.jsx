import React from 'react'

import {texts} from '@constants/texts'

import {
  AsinCell,
  renderFieldValueCell,
  ToFixedCell,
  BarcodeCell,
  ShortDateCell,
  MultilineStatusCell,
  ActiveBarcodeCell,
  NoActiveBarcodeCell,
  HsCodeCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').clientInventoryColumns

export const clientInventoryColumns = (barCodeHandlers, hsCodeHandlers) => [
  {
    field: 'asin',
    headerName: textConsts.asinField,
    renderCell: params => <AsinCell product={params.row.originalData} />,
    minWidth: 300,
  },

  {
    field: 'strategyStatus',
    headerName: textConsts.strategyStatusField,
    renderCell: params => <MultilineStatusCell status={params.value} />,
    width: 100,
  },

  {
    field: 'amountInOrders',
    headerName: textConsts.amountInOrdersField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 80,
  },

  {
    field: 'amountInBoxes',
    headerName: textConsts.amountInBoxesField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 80,
  },

  {
    field: 'stockValue',
    headerName: textConsts.stockValueField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 80,
  },

  {
    field: 'reserved',
    headerName: textConsts.reservedField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 100,
  },

  {
    field: 'inBoard',
    headerName: textConsts.inBoardField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 100,
  },

  {
    field: 'amazon',
    headerName: textConsts.priceField,
    renderCell: params => <ToFixedCell value={params.value} fix={2} />,
    width: 80,
    headerAlign: 'center',
  },

  {
    field: 'profit',
    headerName: textConsts.profitField,
    renderCell: params => <ToFixedCell value={params.value} fix={2} />,
    width: 80,
    type: 'number',
    headerAlign: 'center',
  },

  {
    field: 'margin',
    headerName: textConsts.marginField,
    renderCell: params => <ToFixedCell value={params.value} fix={2} />,
    width: 80,
    type: 'number',
    headerAlign: 'center',
  },
  {
    field: 'bsr',
    headerName: textConsts.bsrField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 80,
    type: 'number',
    headerAlign: 'center',
  },

  {
    field: 'fbafee',
    headerName: textConsts.fbaField,
    renderCell: params => <ToFixedCell value={params.value} fix={2} />,

    width: 80,
    type: 'number',
    headerAlign: 'center',
  },

  {
    field: 'fbaamount',
    headerName: textConsts.fbaAmountField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 80,
    type: 'number',
    headerAlign: 'center',
  },

  {
    field: 'barCode',
    headerName: textConsts.barcodeField,
    renderCell: params =>
      params.row.originalData.archive ? (
        <ActiveBarcodeCell barCode={params.row.originalData.barCode} />
      ) : (
        <BarcodeCell product={params.row.originalData} handlers={barCodeHandlers} />
      ),
    minWidth: 100,
    headerAlign: 'center',
  },

  {
    field: 'hsCode',
    headerName: textConsts.hsCodeField,
    renderCell: params =>
      params.row.originalData.archive ? (
        <NoActiveBarcodeCell barCode={params.row.originalData.hsCode} />
      ) : (
        <HsCodeCell product={params.row.originalData} handlers={hsCodeHandlers} />
      ),
    minWidth: 100,
    headerAlign: 'center',
  },

  {
    field: 'status',
    headerName: textConsts.statusField,
    renderCell: params => <MultilineStatusCell status={params.value} />,
    width: 120,
  },

  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    renderCell: params => <ShortDateCell params={params} />,
    minWidth: 100,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: textConsts.updateDateField,
    renderCell: params => <ShortDateCell params={params} />,
    minWidth: 100,
    type: 'date',
  },
]

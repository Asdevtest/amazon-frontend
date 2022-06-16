import React from 'react'

import {texts} from '@constants/texts'
import {TranslationKey} from '@constants/translations/translation-key'

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
  MultilineTextHeaderCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {t} from '@utils/translations'

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
    headerName: t(TranslationKey.Strategy),
    renderCell: params => <MultilineStatusCell status={params.value} />,
    width: 100,
  },

  {
    field: 'amountInOrders',
    headerName: 'Order',
    renderCell: params => renderFieldValueCell(params.value),
    width: 80,
  },

  {
    field: 'amountInBoxes',
    headerName: 'In stock',
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
    headerName: t(TranslationKey.Reserved),
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
    field: 'stockSum',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Stock sum'])} />,
    renderCell: params => renderFieldValueCell(params.value),
    width: 100,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
    renderCell: params => <ToFixedCell value={params.value} fix={2} />,
    width: 80,
    headerAlign: 'center',
  },

  {
    field: 'profit',
    headerName: t(TranslationKey.Profit),
    renderCell: params => <ToFixedCell value={params.value} fix={2} />,
    width: 80,
    type: 'number',
    headerAlign: 'center',
  },

  {
    field: 'margin',
    headerName: t(TranslationKey.Margin),
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
    headerName: t(TranslationKey.BarCode),
    renderCell: params =>
      params.row.originalData.archive ? (
        <ActiveBarcodeCell barCode={params.row.originalData.barCode} />
      ) : (
        <BarcodeCell product={params.row.originalData} handlers={barCodeHandlers} />
      ),
    minWidth: 100,
    headerAlign: 'center',
    type: 'actions',
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
    headerName: t(TranslationKey.Status),
    renderCell: params => <MultilineStatusCell status={params.value} />,
    width: 120,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderCell: params => <ShortDateCell params={params} />,
    minWidth: 100,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderCell: params => <ShortDateCell params={params} />,
    minWidth: 100,
    type: 'date',
  },
]

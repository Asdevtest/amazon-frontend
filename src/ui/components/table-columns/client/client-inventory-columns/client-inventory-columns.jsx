import React from 'react'

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

import {t} from '@utils/translations'

export const clientInventoryColumns = (barCodeHandlers, hsCodeHandlers) => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,

    renderCell: params => <AsinCell product={params.row.originalData} />,
    minWidth: 300,
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,

    renderCell: params => <MultilineStatusCell status={params.value} />,
    width: 100,
  },

  {
    field: 'amountInOrders',
    headerName: 'Order',
    renderHeader: () => <MultilineTextHeaderCell text={'Order'} />,

    renderCell: params => renderFieldValueCell(params.value),
    width: 80,
  },

  {
    field: 'amountInBoxes',
    headerName: 'In stock',
    renderHeader: () => <MultilineTextHeaderCell text={'In stock'} />,

    renderCell: params => renderFieldValueCell(params.value),
    width: 80,
  },

  {
    field: 'stockValue',
    headerName: 'Amazon',
    renderHeader: () => <MultilineTextHeaderCell text={'Amazon'} />,

    renderCell: params => renderFieldValueCell(params.value),
    width: 80,
  },

  {
    field: 'reserved',
    headerName: t(TranslationKey.Reserved),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Reserved)} />,

    renderCell: params => renderFieldValueCell(params.value),
    width: 100,
  },

  {
    field: 'inBoard',
    headerName: 'In Board',
    renderHeader: () => <MultilineTextHeaderCell text={'In Board'} />,

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
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,

    renderCell: params => <ToFixedCell value={params.value} fix={2} />,
    width: 80,
    headerAlign: 'center',
  },

  {
    field: 'profit',
    headerName: t(TranslationKey.Profit),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Profit)} />,

    renderCell: params => <ToFixedCell value={params.value} fix={2} />,
    width: 80,
    type: 'number',
    headerAlign: 'center',
  },

  {
    field: 'margin',
    headerName: t(TranslationKey.Margin),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Margin)} />,

    renderCell: params => <ToFixedCell value={params.value} fix={2} />,
    width: 80,
    type: 'number',
    headerAlign: 'center',
  },
  {
    field: 'bsr',
    headerName: t(TranslationKey.BSR),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

    renderCell: params => renderFieldValueCell(params.value),
    width: 80,
    type: 'number',
    headerAlign: 'center',
  },

  {
    field: 'fbafee',
    headerName: t(TranslationKey.FBA),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.FBA)} />,

    renderCell: params => <ToFixedCell value={params.value} fix={2} />,

    width: 80,
    type: 'number',
    headerAlign: 'center',
  },

  {
    field: 'fbaamount',
    headerName: t(TranslationKey['Recommend amount']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Recommend amount'])} />,
    renderCell: params => renderFieldValueCell(params.value),
    width: 110,
    type: 'number',
    headerAlign: 'center',
  },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

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
    headerName: 'HS code',
    renderHeader: () => <MultilineTextHeaderCell text={'HS code'} />,

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
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    renderCell: params => <MultilineStatusCell status={params.value} />,
    width: 120,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    renderCell: params => <ShortDateCell params={params} />,
    minWidth: 100,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <ShortDateCell params={params} />,
    minWidth: 100,
    type: 'date',
  },
]

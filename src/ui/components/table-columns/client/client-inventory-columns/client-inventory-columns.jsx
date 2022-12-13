/* eslint-disable no-unused-vars */
import React from 'react'

import {colorByProductStatus, ProductStatusByCode} from '@constants/product-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  ToFixedCell,
  BarcodeCell,
  ShortDateCell,
  MultilineStatusCell, // ActiveBarcodeCell,
  // NoActiveBarcodeCell,
  HsCodeCell,
  MultilineTextHeaderCell,
  MultilineTextCell,
  ShowBarcodeOrHscodeCell,
  FourMonthesStockCell,
  MultilineTextAlignLeftCell,
  ChangeInputCell,
  InStockCell,
  CommentOfSbCell,
  ProductAsinCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const clientInventoryColumns = (barCodeHandlers, hsCodeHandlers, fourMonthesStockHandlers, stockUsHandlers) => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,

    renderCell: params => (
      <ProductAsinCell /* key={`${params.field}_${params.row.id}`}*/ product={params.row.originalData} />
    ),
    width: 300,
  },

  {
    field: 'shop',
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

    renderCell: params => <MultilineTextCell /* key={`${params.field}_${params.row.id}`}*/ text={params.value} />,
    width: 90,
    sortable: false,
    filterable: false,
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,

    renderCell: params => <MultilineStatusCell /* key={`${params.field}_${params.row.id}`}*/ status={params.value} />,
    width: 80,
  },

  {
    field: 'stockValue',
    headerName: 'Available',
    renderHeader: () => <MultilineTextHeaderCell text={'Available'} />,

    renderCell: params => <MultilineTextCell /* key={`${params.field}_${params.row.id}`}*/ text={params.value} />,
    width: 70,
    sortable: false,
  },

  {
    field: 'reserved',
    headerName: t(TranslationKey.Reserved),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Reserved)} />,

    renderCell: params => <MultilineTextCell /* key={`${params.field}_${params.row.id}`}*/ text={params.value} />,
    width: 65,
    sortable: false,
  },

  {
    field: 'inBoard',
    headerName: t(TranslationKey.Inbound),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Inbound)} />,

    renderCell: params => <MultilineTextCell /* key={`${params.field}_${params.row.id}`}*/ text={params.value} />,
    width: 70,
    sortable: false,
  },

  {
    field: 'amountInOrders',
    headerName: 'Order',
    renderHeader: () => <MultilineTextHeaderCell text={'Order'} />,

    renderCell: params => <MultilineTextCell /* key={`${params.field}_${params.row.id}`}*/ text={params.value} />,
    width: 60,
  },

  {
    field: 'stockUSA',
    headerName: t(TranslationKey.Set) + ' ' + t(TranslationKey.Additionally),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Set) + ' ' + t(TranslationKey.Additionally)} />,

    renderCell: params => (
      <ChangeInputCell
        /* key={`${params.field}_${params.row.id}`}*/
        isInts
        row={params.row.originalData}
        // text={Number(params.value) > 0 ? params.value : `-`}
        text={params.value}
        onClickSubmit={stockUsHandlers.onClickSaveStockUs}
      />
    ),
    width: 130,
  },

  {
    field: 'inTransfer',
    headerName: 'in Transfer',
    renderHeader: () => <MultilineTextHeaderCell text={'in Transfer'} />,

    renderCell: params => <MultilineTextCell /* key={`${params.field}_${params.row.id}`}*/ text={params.value} />,
    width: 80,
  },

  {
    field: 'amountInBoxes',
    headerName: 'In stock',
    renderHeader: () => <MultilineTextHeaderCell text={'In stock'} />,

    renderCell: params => (
      <InStockCell /* key={`${params.field}_${params.row.id}`}*/ boxAmounts={params.row.originalData.boxAmounts} />
    ),
    width: 160,
    sortable: false,
    type: 'actions',
    filterable: false,
  },

  {
    field: 'stockSum',
    headerName: t(TranslationKey['Stock sum']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Stock sum'])} />,
    renderCell: params => <MultilineTextCell /* key={`${params.field}_${params.row.id}`}*/ text={params.value} />,
    width: 75,
    sortable: false,
  },

  {
    field: 'fourMonthesStock',
    headerName: t(TranslationKey['Recommendation for additional purchases']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Recommendation for additional purchases'])} />,
    renderCell: params => (
      <FourMonthesStockCell
        /* key={`${params.field}_${params.row.id}`}*/
        handlers={fourMonthesStockHandlers}
        params={params}
        value={params.value}
      />
    ),

    width: 150,
    // type: 'number',
    headerAlign: 'center',
    type: 'actions',
    filterable: false,
    sortable: false,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,

    renderCell: params => <ToFixedCell /* key={`${params.field}_${params.row.id}`}*/ value={params.value} fix={2} />,
    width: 80,
    headerAlign: 'center',
  },

  {
    field: 'profit',
    headerName: t(TranslationKey.Profit),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Profit)} />,

    renderCell: params => <ToFixedCell /* key={`${params.field}_${params.row.id}`}*/ value={params.value} fix={2} />,
    width: 90,
  },

  {
    field: 'fbafee',
    headerName: t(TranslationKey.FBA),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.FBA)} />,

    renderCell: params => <ToFixedCell /* key={`${params.field}_${params.row.id}`}*/ value={params.value} fix={2} />,

    width: 70,
    type: 'number',
    headerAlign: 'center',
  },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

    renderCell: params =>
      params.row.originalData.archive ? (
        <ShowBarcodeOrHscodeCell
          /* key={`${params.field}_${params.row.id}`}*/
          barCode={params.row.originalData.barCode}
          handlers={barCodeHandlers}
        />
      ) : (
        // <ActiveBarcodeCell barCode={params.row.originalData.barCode} handlers={barCodeHandlers} />
        <BarcodeCell
          /* key={`${params.field}_${params.row.id}`}*/
          product={params.row.originalData}
          handlers={barCodeHandlers}
        />
      ),
    minWidth: 100,
    headerAlign: 'center',
    type: 'actions',
    sortable: false,
    filterable: false,
  },

  {
    field: 'hsCode',
    headerName: 'HS code',
    renderHeader: () => <MultilineTextHeaderCell text={'HS code'} />,

    renderCell: params =>
      params.row.originalData.archive ? (
        <ShowBarcodeOrHscodeCell
          /* key={`${params.field}_${params.row.id}`}*/
          hsCode={params.row.originalData.hsCode}
          handlers={barCodeHandlers}
        />
      ) : (
        // <NoActiveBarcodeCell barCode={params.row.originalData.hsCode} />
        <HsCodeCell
          /* key={`${params.field}_${params.row.id}`}*/
          product={params.row.originalData}
          handlers={hsCodeHandlers}
        />
      ),
    minWidth: 100,
    headerAlign: 'center',
    type: 'actions',
    sortable: false,
    filterable: false,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: params => (
      <MultilineTextCell
        /* key={`${params.field}_${params.row.id}`}*/
        text={params.value}
        color={colorByProductStatus(ProductStatusByCode[params.row.originalData.status])}
      />
    ),
    width: 100,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    renderCell: params => <ShortDateCell /* key={`${params.field}_${params.row.id}`}*/ params={params} />,
    minWidth: 90,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <ShortDateCell /* key={`${params.field}_${params.row.id}`}*/ params={params} />,
    minWidth: 90,
    type: 'date',
  },

  {
    field: 'commentSb',
    headerName: t(TranslationKey['Comment of SB']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Comment of SB'])} />,

    renderCell: params => (
      <CommentOfSbCell
        /* key={`${params.field}_${params.row.id}`}*/
        productsInWarehouse={params.row.originalData.productsInWarehouse}
      />
    ),
    width: 400,
    filterable: false,
    sortable: false,
  },

  {
    field: 'clientComment',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

    renderCell: params => (
      <MultilineTextAlignLeftCell /* key={`${params.field}_${params.row.id}`}*/ withTooltip text={params.value} />
    ),
    width: 400,
    filterable: false,
    sortable: false,
  },
]

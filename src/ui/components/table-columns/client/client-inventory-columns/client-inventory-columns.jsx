/* eslint-disable no-unused-vars */
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React from 'react'

import {columnnsKeys} from '@constants/data-grid-columns-keys'
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

export const clientInventoryColumns = (
  barCodeHandlers,
  hsCodeHandlers,
  fourMonthesStockHandlers,
  stockUsHandlers,
  otherHandlers,
) => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextHeaderCell withIcon text={t(TranslationKey.ASIN)} />,

    renderCell: params => <ProductAsinCell product={params.row.originalData} />,
    width: 300,
  },

  {
    field: 'shop',
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell withIcon text={t(TranslationKey.Shop)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 90,
    sortable: false,
    filterable: false,
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderHeader: () => <MultilineTextHeaderCell withIcon text={t(TranslationKey.Strategy)} />,

    renderCell: params => <MultilineStatusCell status={params.value} />,
    width: 80,
  },

  {
    field: 'stockValue',
    headerName: 'Available',
    renderHeader: () => <MultilineTextHeaderCell withIcon text={'Available'} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 70,
    sortable: false,
  },

  {
    field: 'reserved',
    headerName: t(TranslationKey.Reserved),
    renderHeader: () => <MultilineTextHeaderCell withIcon text={t(TranslationKey.Reserved)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 65,
    sortable: false,
  },

  {
    field: 'inBoard',
    headerName: t(TranslationKey.Inbound),
    renderHeader: () => <MultilineTextHeaderCell withIcon text={t(TranslationKey.Inbound)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 70,
    sortable: false,
  },

  {
    field: 'amountInOrders',
    headerName: 'Order',
    renderHeader: () => <MultilineTextHeaderCell withIcon text={'Order'} />,

    renderCell: params => (
      <MultilineTextCell
        text={params.value}
        onClickText={e => {
          e.stopPropagation()

          otherHandlers.onClickOrderCell(params.row.originalData._id)
        }}
      />
    ),
    type: 'number',
    width: 60,
  },

  {
    field: 'stockUSA',
    headerName: t(TranslationKey.Set) + ' ' + t(TranslationKey.Additionally),
    renderHeader: () => (
      <MultilineTextHeaderCell withIcon text={t(TranslationKey.Set) + ' ' + t(TranslationKey.Additionally)} />
    ),

    renderCell: params => (
      <ChangeInputCell
        isInts
        row={params.row.originalData}
        text={params.value}
        onClickSubmit={stockUsHandlers.onClickSaveStockUs}
      />
    ),
    width: 150,
  },

  {
    field: 'inTransfer',
    headerName: 'in Transfer',
    renderHeader: () => <MultilineTextHeaderCell withIcon text={'in Transfer'} />,

    renderCell: params => (
      <MultilineTextCell
        text={params.value}
        onClickText={e => {
          e.stopPropagation()

          otherHandlers.onClickInTransfer(params.row.originalData._id)
        }}
      />
    ),
    type: 'number',
    width: 80,
  },

  {
    field: 'amountInBoxes',
    headerName: 'In stock',
    renderHeader: () => <MultilineTextHeaderCell withIcon text={'In stock'} />,

    renderCell: params => (
      <InStockCell
        boxAmounts={params.row.originalData.boxAmounts}
        box={params.row.originalData}
        onClickInStock={otherHandlers.onClickInStock}
      />
    ),
    width: 160,
    sortable: false,
    type: 'actions',
    filterable: false,
  },

  {
    field: 'sumStock',
    headerName: t(TranslationKey['Stock sum']),
    renderHeader: () => <MultilineTextHeaderCell withIcon text={t(TranslationKey['Stock sum'])} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 75,
    type: 'number',
  },

  {
    field: 'purchaseQuantity',
    headerName: t(TranslationKey['Recommendation for additional purchases']),
    renderHeader: () => (
      <MultilineTextHeaderCell withIcon text={t(TranslationKey['Recommendation for additional purchases'])} />
    ),
    renderCell: params => (
      <FourMonthesStockCell handlers={fourMonthesStockHandlers} params={params} value={params.value} />
    ),

    width: 150,
    type: 'number',
    headerAlign: 'center',
    filterable: false,

    columnKey: columnnsKeys.client.INVENTORY_PURCHASE_QUANTITY,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
    renderHeader: () => <MultilineTextHeaderCell withIcon text={t(TranslationKey['Amazon price'])} />,

    renderCell: params => <ToFixedCell value={params.value} fix={2} />,
    type: 'number',
    width: 80,
    headerAlign: 'center',
  },

  {
    field: 'profit',
    headerName: t(TranslationKey.Profit),
    renderHeader: () => <MultilineTextHeaderCell withIcon text={t(TranslationKey.Profit)} />,

    renderCell: params => <ToFixedCell value={params.value} fix={2} />,
    type: 'number',
    width: 90,
  },

  {
    field: 'fbafee',
    headerName: t(TranslationKey.FBA),
    renderHeader: () => <MultilineTextHeaderCell withIcon text={t(TranslationKey.FBA)} />,

    renderCell: params => <ToFixedCell value={params.value} fix={2} />,

    width: 70,
    type: 'number',
    headerAlign: 'center',
  },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    renderHeader: () => <MultilineTextHeaderCell withIcon text={t(TranslationKey.BarCode)} />,

    renderCell: params => <BarcodeCell product={params.row.originalData} handlers={barCodeHandlers} />,
    minWidth: 100,
    headerAlign: 'center',
    type: 'actions',
    sortable: false,
    filterable: false,
  },

  {
    field: 'hsCode',
    headerName: 'HS code',
    renderHeader: () => <MultilineTextHeaderCell withIcon text={'HS code'} />,

    renderCell: params => <HsCodeCell product={params.row.originalData} handlers={hsCodeHandlers} />,
    minWidth: 100,
    headerAlign: 'center',
    type: 'actions',
    sortable: false,
    filterable: false,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell withIcon text={t(TranslationKey.Status)} />,
    renderCell: params => (
      <MultilineTextCell
        text={params.value}
        color={colorByProductStatus(ProductStatusByCode[params.row.originalData.status])}
      />
    ),
    width: 100,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell withIcon text={t(TranslationKey.Created)} />,

    renderCell: params => <ShortDateCell params={params} />,
    minWidth: 90,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell withIcon text={t(TranslationKey.Updated)} />,

    renderCell: params => <ShortDateCell params={params} />,
    minWidth: 90,
    type: 'date',
  },

  {
    field: 'commentSb',
    headerName: t(TranslationKey['Comment of SB']),
    renderHeader: () => <MultilineTextHeaderCell withIcon text={t(TranslationKey['Comment of SB'])} />,

    renderCell: params => <CommentOfSbCell productsInWarehouse={params.row.originalData.productsInWarehouse} />,
    width: 400,
    filterable: false,
    sortable: false,
  },

  {
    field: 'clientComment',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell withIcon text={t(TranslationKey.Comment)} />,

    renderCell: params => <MultilineTextAlignLeftCell withTooltip text={params.value} />,
    width: 400,
    filterable: false,
    sortable: false,
  },
]

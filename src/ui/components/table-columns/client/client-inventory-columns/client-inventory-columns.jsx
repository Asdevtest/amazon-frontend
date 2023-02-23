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
  columnMenuSettings,
  onHover,
) => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.ASIN)}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={
          columnMenuSettings?.asin?.currentFilterData?.length ||
          columnMenuSettings?.skusByClient?.currentFilterData?.length ||
          columnMenuSettings?.amazonTitle?.currentFilterData?.length
        }
      />
    ),

    renderCell: params => <ProductAsinCell product={params.row.originalData} />,
    // renderCell: params => console.log('onHover', onHover),
    width: 300,

    columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'shopIds',
    headerName: t(TranslationKey.Shop),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Shop)}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 90,
    sortable: false,
    filterable: false,

    columnKey: columnnsKeys.client.INVENTORY_SHOPS,
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Strategy)}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineStatusCell status={params.value} />,
    width: 90,

    columnKey: columnnsKeys.client.INVENTORY_STRATEGY_STATUS,
  },

  {
    field: 'fbaFbmStockSum',
    headerName: 'Available',
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={'Available'}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 90,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'reservedSum',
    headerName: t(TranslationKey.Reserved),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Reserved)}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 85,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'sentToFbaSum',
    headerName: t(TranslationKey.Inbound),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Inbound)}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 90,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'amountInOrders',
    headerName: 'Order',
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={'Order'}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),

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
    width: 90,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'stockUSA',
    headerName: t(TranslationKey.Set) + ' ' + t(TranslationKey.Additionally),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Set) + ' ' + t(TranslationKey.Additionally)}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
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

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'inTransfer',
    headerName: 'in Transfer',
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={'in Transfer'}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),

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
    width: 90,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'boxAmounts',
    headerName: 'In stock',
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={'In stock'}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => (
      <InStockCell
        boxAmounts={params.row.originalData.boxAmounts}
        box={params.row.originalData}
        onClickInStock={otherHandlers.onClickInStock}
      />
    ),
    width: 160,
    sortable: false,
    columnKey: columnnsKeys.client.INVENTORY_IN_STOCK,
  },

  {
    field: 'sumStock',
    headerName: t(TranslationKey['Stock sum']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Stock sum'])}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 75,
    type: 'number',

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'purchaseQuantity',
    headerName: t(TranslationKey['Recommendation for additional purchases']),
    renderHeader: () => (
      <MultilineTextHeaderCell
        withIcon
        isFilterActive
        text={t(TranslationKey['Recommendation for additional purchases'])}
      />
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
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Amazon price'])}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <ToFixedCell value={params.value} fix={2} />,
    type: 'number',
    width: 80,
    headerAlign: 'center',
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'profit',
    headerName: t(TranslationKey.Profit),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Profit)}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <ToFixedCell value={params.value} fix={2} />,
    type: 'number',
    width: 90,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'fbafee',
    headerName: t(TranslationKey.FBA),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.FBA)}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <ToFixedCell value={params.value} fix={2} />,

    width: 70,
    type: 'number',
    headerAlign: 'center',

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

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
    renderHeader: () => <MultilineTextHeaderCell text={'HS code'} />,

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
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Status)}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => (
      <MultilineTextCell
        text={params.value}
        color={colorByProductStatus(ProductStatusByCode[params.row.originalData.status])}
      />
    ),
    width: 100,

    columnKey: columnnsKeys.client.INVENTORY_STATUS,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Created)}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <ShortDateCell params={params} />,
    minWidth: 90,
    type: 'date',

    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Updated)}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <ShortDateCell params={params} />,
    minWidth: 90,
    type: 'date',

    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'ideaCount',
    headerName: t(TranslationKey['Ideas to Check']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Ideas to Check'])}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 100,
    type: 'number',

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'commentSb',
    headerName: t(TranslationKey['Comment of SB']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Comment of SB'])}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <CommentOfSbCell productsInWarehouse={params.row.originalData.productsInWarehouse} />,
    width: 400,
    filterable: false,
    sortable: false,
  },

  {
    field: 'clientComment',
    headerName: t(TranslationKey.Comment),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Comment)}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineTextAlignLeftCell withTooltip text={params.value} />,
    width: 400,
    filterable: false,
    sortable: false,
  },
]

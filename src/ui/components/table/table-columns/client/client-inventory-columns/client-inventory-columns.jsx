/* eslint-disable no-unused-vars */
import React, {useCallback, useMemo} from 'react'

import {columnnsKeys} from '@constants/data-grid/data-grid-columns-keys'
import {colorByProductStatus, ProductStatusByCode} from '@constants/product/product-status'
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
  FourMonthesStockCell,
  MultilineTextAlignLeftCell,
  ChangeInputCell,
  InStockCell,
  CommentOfSbCell,
  ProductAsinCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import {toFixed} from '@utils/text'
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

    renderCell: params => {
      const product = params.row.originalData

      return (
        <ProductAsinCell
          image={product?.images?.slice()[0]}
          amazonTitle={product?.amazonTitle}
          asin={product?.asin}
          skusByClient={product?.skusByClient?.slice()[0]}
        />
      )
    },
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

    renderCell: params => {
      const onClickTextMemo = useCallback(e => {
        e.stopPropagation()

        otherHandlers.onClickOrderCell(params.row.originalData._id)
      }, [])

      return <MultilineTextCell text={params.value} onClickText={onClickTextMemo} />
    },
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

    renderCell: params => {
      const onClickSaveStockUsMemo = useCallback(stockUsHandlers.onClickSaveStockUs, [])

      return (
        <ChangeInputCell
          isInts
          rowId={params.row.originalData._id}
          text={params.value}
          onClickSubmit={onClickSaveStockUsMemo}
        />
      )
    },
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

    renderCell: params => {
      const onClickInTransferMemo = useCallback(e => {
        e.stopPropagation()

        otherHandlers.onClickInTransfer(params.row.originalData._id)
      }, [])

      return <MultilineTextCell text={params.value} onClickText={onClickInTransferMemo} />
    },
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

    renderCell: params => {
      const onClickInStockMemo = useCallback(otherHandlers.onClickInStock, [])
      const boxAmountsMemo = useMemo(() => params.row.originalData.boxAmounts, [])

      return (
        <InStockCell
          boxAmounts={boxAmountsMemo}
          boxId={params.row.originalData._id}
          onClickInStock={onClickInStockMemo}
        />
      )
    },
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
    field: 'stockCost',
    headerName: t(TranslationKey['Stock cost']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Stock cost'])}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell text={toFixed(params.value, 2)} />,
    width: 120,
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
    renderCell: params => {
      const onClickSaveFourMonthsStock = useCallback(fourMonthesStockHandlers.onClickSaveFourMonthsStock, [])

      return (
        <FourMonthesStockCell
          rowId={params.row.originalData._id}
          value={params.value}
          fourMonthesStock={params.row.fourMonthesStock}
          onClickSaveFourMonthsStock={onClickSaveFourMonthsStock}
        />
      )
    },

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
    renderHeader: () => <MultilineTextHeaderCell withIcon isFilterActive text={t(TranslationKey.BarCode)} />,

    renderCell: params => {
      const barCodeHandlersMemo = useMemo(() => barCodeHandlers, [])
      const productMemo = useMemo(() => params.row.originalData, [])

      return <BarcodeCell product={productMemo} handlers={barCodeHandlersMemo} />
    },
    minWidth: 100,
    headerAlign: 'center',
    filterable: false,
    sortable: false,

    columnKey: columnnsKeys.client.INVENTORY_BARCODE,
  },

  {
    field: 'hsCode',
    headerName: 'HS code',
    renderHeader: () => <MultilineTextHeaderCell text={'HS code'} />,

    renderCell: params => {
      const hsCodeHandlersMemo = useMemo(() => hsCodeHandlers, [])
      const productMemo = useMemo(() => params.row.originalData, [])

      return <HsCodeCell product={productMemo} handlers={hsCodeHandlersMemo} />
    },
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

    renderCell: params => <ShortDateCell value={params.value} />,
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

    renderCell: params => <ShortDateCell value={params.value} />,
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

    renderCell: params => {
      const productsInWarehouseMemo = useMemo(() => params.row.originalData.productsInWarehouse, [])

      return <CommentOfSbCell productsInWarehouse={productsInWarehouseMemo} />
    },
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

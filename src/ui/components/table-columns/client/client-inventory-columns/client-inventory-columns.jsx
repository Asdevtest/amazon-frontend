import React from 'react'

import {colorByProductStatus, ProductStatusByCode} from '@constants/product-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  AsinCell,
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
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const clientInventoryColumns = (barCodeHandlers, hsCodeHandlers, fourMonthesStockHandlers, stockUsHandlers) => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,

    renderCell: params => <AsinCell product={params.row.originalData} />,
    width: 300,
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,

    renderCell: params => <MultilineStatusCell status={params.value} />,
    width: 80,
  },

  {
    field: 'stockValue',
    headerName: 'Available',
    renderHeader: () => <MultilineTextHeaderCell text={'Available'} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 70,
  },

  {
    field: 'reserved',
    headerName: t(TranslationKey.Reserved),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Reserved)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 65,
  },

  {
    field: 'inBoard',
    headerName: t(TranslationKey.Inbound),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Inbound)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 70,
  },

  {
    field: 'amountInOrders',
    headerName: 'Order',
    renderHeader: () => <MultilineTextHeaderCell text={'Order'} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 60,
  },

  {
    field: 'stockUSA',
    headerName: t(TranslationKey.Set) + ' ' + t(TranslationKey.Additionally),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Set) + ' ' + t(TranslationKey.Additionally)} />,
    // renderCell: params => (
    //   <ChangeChipCell
    //     row={params.row.originalData}
    //     text={Number(params.value) > 0 ? params.value : `-`}
    //     onClickChip={() => stockUsHandlers.onClickStockUs(params.row.originalData)}
    //   />
    // ),

    renderCell: params => (
      <ChangeInputCell
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
    field: 'amountInBoxes',
    headerName: 'In stock',
    renderHeader: () => <MultilineTextHeaderCell text={'In stock'} />,

    renderCell: params => <InStockCell boxAmounts={params.row.originalData.boxAmounts} />,
    width: 160,
  },

  {
    field: 'stockSum',
    headerName: t(TranslationKey['Stock sum']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Stock sum'])} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 75,
  },

  {
    field: 'fourMonthesStock',
    headerName: t(TranslationKey['Recommendation for additional purchases']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Recommendation for additional purchases'])} />,
    renderCell: params => (
      <FourMonthesStockCell handlers={fourMonthesStockHandlers} params={params} value={params.value} />
    ),

    width: 150,
    // type: 'number',
    headerAlign: 'center',
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
    width: 90,

    // headerAlign: 'center',
  },

  // {
  //   field: 'margin',
  //   headerName: t(TranslationKey.Margin),
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Margin)} />,

  //   renderCell: params => <ToFixedCell value={params.value} fix={2} />,
  //   width: 80,
  //   // type: 'number',
  //   headerAlign: 'center',
  // },
  // {
  //   field: 'bsr',
  //   headerName: t(TranslationKey.BSR),
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

  //   renderCell: params => <MultilineTextCell text={params.value} />,
  //   width: 60,
  //   type: 'number',
  //   headerAlign: 'center',
  // },

  {
    field: 'fbafee',
    headerName: t(TranslationKey.FBA),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.FBA)} />,

    renderCell: params => <ToFixedCell value={params.value} fix={2} />,

    width: 70,
    type: 'number',
    headerAlign: 'center',
  },

  // {
  //   field: 'fbaamount',
  //   headerName: t(TranslationKey['Recommend amount']),
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Recommend amount'])} />,
  //   renderCell: () => <MultilineTextCell text={'' /* params.value*/} />, // столбец пока без значений
  //   width: 90,
  //   type: 'number',
  //   headerAlign: 'center',
  // },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

    renderCell: params =>
      params.row.originalData.archive ? (
        <ShowBarcodeOrHscodeCell barCode={params.row.originalData.barCode} handlers={barCodeHandlers} />
      ) : (
        // <ActiveBarcodeCell barCode={params.row.originalData.barCode} handlers={barCodeHandlers} />
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
        <ShowBarcodeOrHscodeCell hsCode={params.row.originalData.hsCode} handlers={barCodeHandlers} />
      ) : (
        // <NoActiveBarcodeCell barCode={params.row.originalData.hsCode} />
        <HsCodeCell product={params.row.originalData} handlers={hsCodeHandlers} />
      ),
    minWidth: 100,
    headerAlign: 'center',
    type: 'actions',
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

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
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    renderCell: params => <ShortDateCell params={params} />,
    minWidth: 90,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <ShortDateCell params={params} />,
    minWidth: 90,
    type: 'date',
  },

  {
    field: 'commentSb',
    headerName: t(TranslationKey['Comment of SB']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Comment of SB'])} />,

    renderCell: params => <CommentOfSbCell productsInWarehouse={params.row.originalData.productsInWarehouse} />,
    width: 400,
  },

  {
    field: 'clientComment',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

    renderCell: params => <MultilineTextAlignLeftCell withTooltip text={params.value} />,
    width: 400,
  },
]

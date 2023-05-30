import React, { useCallback } from 'react'

import { colorByProductStatus, ProductStatusByCode } from '@constants/product/product-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ProductAsinCell,
  FeesValuesWithCalculateBtnCell,
  MultilineTextHeaderCell,
  NormDateCell,
  MultilineTextCell,
  MultilineStatusCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const buyerProductsViewColumns = handlers => [
  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

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
    width: 350,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    width: 150,
    renderCell: params => (
      <MultilineTextCell
        text={params.value}
        color={colorByProductStatus(ProductStatusByCode[params.row.originalData.status])}
      />
    ),
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,

    renderCell: params => <MultilineStatusCell status={params.value} />,
    width: 120,
  },

  {
    field: 'feesAndNet',
    headerName: t(TranslationKey['Fees & Net']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Fees & Net'])} />,

    renderCell: params => {
      const onClickFeesCalculateMemo = useCallback(handlers.onClickFeesCalculate, [])

      return (
        <FeesValuesWithCalculateBtnCell
          noCalculate={!['30', '40', '50', '60'].includes(params.row.status)}
          fbafee={params.row.originalData.fbafee}
          reffee={params.row.originalData.reffee}
          productId={params.row.originalData._id}
          onClickCalculate={onClickFeesCalculateMemo}
        />
      )
    },
    minWidth: 110,

    filterable: false,
    sortable: false,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    type: 'number',
    minWidth: 90,
  },

  {
    field: 'profit',
    headerName: t(TranslationKey.Profit),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Profit)} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    type: 'number',
    width: 90,
  },

  {
    field: 'bsr',
    headerName: t(TranslationKey.BSR),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    minWidth: 50,
  },

  {
    field: 'fbaamount',
    headerName: t(TranslationKey['Recommend amount']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Recommend amount'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    minWidth: 150,
  },

  {
    field: 'ideasOnCheck',
    headerName: t(TranslationKey['Ideas to Check']),
    renderHeader: () => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Ideas to Check'])}
        // isShowIconOnHover={onHover && params.field && onHover === params.field}
        // isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 100,
    type: 'number',

    // columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ideasClosed',
    headerName: t(TranslationKey['Closed Ideas']),
    renderHeader: () => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Closed Ideas'])}
        // isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        // isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 100,
    type: 'number',

    // columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ideasVerified',
    headerName: t(TranslationKey['Verified ideas']),
    renderHeader: () => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Verified ideas'])}
        // isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        // isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
    type: 'number',

    // columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    minWidth: 120,
    renderCell: params => <NormDateCell value={params.value} />,
    // type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    minWidth: 150,
    flex: 1,
    renderCell: params => <NormDateCell value={params.value} />,
    // type: 'date',
  },
]

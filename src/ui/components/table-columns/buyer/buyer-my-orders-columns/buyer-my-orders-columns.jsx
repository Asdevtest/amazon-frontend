import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  ActiveBarcodeCell,
  OrderCell,
  MultilineTextCell,
  NormDateCell,
  UserLinkCell,
  MultilineTextHeaderCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const buyerMyOrdersViewColumns = () => [
  {
    field: 'ID',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

    width: 70,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },
  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    width: 200,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Orders),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Orders)} />,

    width: 300,
    renderCell: params => <OrderCell product={params.row.originalData.product} />,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 130,
  },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

    renderCell: params => <ActiveBarcodeCell barCode={params.value} />,
    width: 200,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey['Int warehouse']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,

    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.storekeeper?._id} />,
    width: 200,
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,

    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.product.client?._id} />,
    width: 200,
  },

  {
    field: 'warehouses',
    headerName: t(TranslationKey.Warehouse),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Warehouse)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 200,
  },

  {
    field: 'clientComment',
    headerName: t(TranslationKey['Client comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 300,
  },

  {
    field: 'buyerComment',
    headerName: t(TranslationKey['Buyer comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 300,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },
]

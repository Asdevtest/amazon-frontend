import React from 'react'

import {t} from 'i18n-js'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  ActiveBarcodeCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OrderCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
} from '@components/data-grid-cells/data-grid-cells'

export const clientOrdersViewColumns = () => [
  {
    field: 'id',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: params => renderFieldValueCell(params.value),
    width: 60,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Orders),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Orders)} />,

    width: 400,
    renderCell: params => <OrderCell product={params.row.originalData.product} />,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    width: 230,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

    width: 150,
    renderCell: params => <ActiveBarcodeCell barCode={params.value} />,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,

    renderCell: params => renderFieldValueCell(params.value),
    type: 'number',
    width: 90,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey['Int warehouse']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,

    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.storekeeper?._id} />,
    width: 200,
  },

  {
    field: 'warehouses',
    headerName: t(TranslationKey['Where to']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Where to'])} />,

    renderCell: params => renderFieldValueCell(params.value),
    width: 160,
  },

  {
    field: 'totalPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,

    width: 100,
    type: 'number',
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
  },

  {
    field: 'grossWeightKg',
    headerName: t(TranslationKey['Total weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total weight'])} />,

    width: 110,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
  },
  {
    field: 'trackingNumberChina',
    headerName: t(TranslationKey['Track number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Track number'])} />,

    width: 160,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    width: 100,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    width: 100,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },
]

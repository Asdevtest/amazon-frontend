import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  AsinCell,
  SupplierCell,
  MultilineTextCell,
  FeesValuesWithCalculateBtnCell,
  ActiveBarcodeCell,
  NormDateCell,
  UserLinkCell,
  MultilineTextHeaderCell,
} from '@components/data-grid-cells/data-grid-cells'

import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

export const exchangeInventoryColumns = () => [
  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    renderCell: params => <NormDateCell params={params} />,
    width: 120,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell params={params} />,
    width: 150,
    type: 'date',
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    renderCell: params => <AsinCell product={params.row.originalData} />,
    width: 300,
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 250,
  },

  {
    field: 'fees-net',
    headerName: t(TranslationKey['Fees & Net']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Fees & Net'])} />,

    renderCell: params => <FeesValuesWithCalculateBtnCell noCalculate product={params.row.originalData} />,
    width: 200,
    filterable: false,
    sortable: false,
  },
  {
    field: 'amazon',
    headerName: t(TranslationKey.Price),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Price)} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 150,
  },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

    width: 150,
    renderCell: params => <ActiveBarcodeCell barCode={params.value} />,
  },

  {
    field: 'clientName',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,

    renderCell: params => <UserLinkCell blackText name={params.value} userId={params.row.originalData.client?._id} />,
    width: 200,
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey['Created by']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.createdBy?._id} />
    ),
    width: 250,
  },
  {
    field: 'supervisor',
    headerName: t(TranslationKey.Supervisor),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supervisor)} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.checkedBy?._id} />
    ),
    width: 250,
  },

  {
    field: 'buyer',
    headerName: t(TranslationKey.Buyer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Buyer)} />,

    renderCell: params => <UserLinkCell blackText name={params.value} userId={params.row.originalData.buyer?._id} />,
    width: 250,
  },
  {
    field: 'currentSupplierName',
    headerName: t(TranslationKey.Supplier),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supplier)} />,

    renderCell: params => <SupplierCell product={params.row.originalData} />,
    width: 170,
    filterable: false,
  },

  {
    field: 'profit',
    headerName: t(TranslationKey.Profit),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Profit)} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 150,
    type: 'number',
  },
  {
    field: 'margin',
    headerName: t(TranslationKey.Margin),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Margin)} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 150,
    type: 'number',
  },
  {
    field: 'bsr',
    headerName: t(TranslationKey.BSR),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 150,
    type: 'number',
  },
  {
    field: 'fbafee',
    headerName: t(TranslationKey['FBA fee , $']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['FBA fee , $'])} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 150,
    type: 'number',
  },
  {
    field: 'fbaamount',
    headerName: t(TranslationKey['FBA Amount']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['FBA Amount'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 150,
    type: 'number',
  },
]

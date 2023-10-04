import React from 'react'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { ProductStatusByCode, colorByProductStatus, productStatusTranslateKey } from '@constants/product/product-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OpenInNewTabCell,
  ProductAsinCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const adminExchangeColumns = () => [
  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={''} />,

    renderCell: params => {
      return <OpenInNewTabCell href={`/admin/inventory/product?product-id=${params.row._id}`} />
    },
    width: 60,
    filterable: false,
    sortable: false,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    renderCell: params => {
      const product = params.row

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
    sortable: false,
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,

    renderCell: params => (
      <MultilineTextCell
        color={colorByProductStatus(ProductStatusByCode[params.value])}
        text={t(productStatusTranslateKey(ProductStatusByCode[params.value]))}
      />
    ),

    width: 250,
    columnKey: columnnsKeys.admin.STRATEGY_STATUS,
    sortable: false,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey.Price),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Price)} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 150,
    type: 'number',

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey['Created by']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

    renderCell: params => <UserLinkCell blackText name={params.value.name} userId={params.value._id} />,
    width: 200,

    columnKey: columnnsKeys.shared.OBJECT,
  },
  {
    field: 'checkedBy',
    headerName: t(TranslationKey.Supervisor),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supervisor)} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.row.checkedBy?.name} userId={params.row.checkedBy?._id} />
    ),
    width: 200,

    columnKey: columnnsKeys.shared.OBJECT,
    sortable: false,
  },

  {
    field: 'buyer',
    headerName: t(TranslationKey.Buyer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Buyer)} />,

    renderCell: params => <UserLinkCell blackText name={params.value?.name} userId={params.value?._id} />,
    width: 200,

    columnKey: columnnsKeys.shared.OBJECT,
    sortable: false,
  },

  {
    field: 'checkednotes',
    headerName: t(TranslationKey['Supervisor comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Supervisor comment'])} />,

    renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={140} text={params.value} />,
    width: 200,
    sortable: false,

    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'profit',
    headerName: t(TranslationKey.Profit),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Profit)} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 150,
    type: 'number',

    columnKey: columnnsKeys.shared.QUANTITY,
  },
  {
    field: 'margin',
    headerName: t(TranslationKey.Margin),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Margin)} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 150,
    type: 'number',

    columnKey: columnnsKeys.shared.QUANTITY,
  },
  {
    field: 'bsr',
    headerName: t(TranslationKey.BSR),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 150,
    type: 'number',

    columnKey: columnnsKeys.shared.QUANTITY,
  },
  {
    field: 'fbafee',
    headerName: t(TranslationKey['FBA fee , $']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['FBA fee , $'])} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 150,
    type: 'number',

    columnKey: columnnsKeys.shared.QUANTITY,
  },
  {
    field: 'fbaamount',
    headerName: t(TranslationKey['FBA Amount']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['FBA Amount'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 150,
    type: 'number',

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    width: 150,

    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    renderCell: params => <NormDateCell value={params?.value} />,
    width: 120,

    columnKey: columnnsKeys.shared.DATE,
  },
]

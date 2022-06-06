import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  ActiveBarcodeCell,
  OrderCell,
  renderFieldValueCell,
  NormDateCell,
  NormalActionBtnCell,
  UserLinkCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const buyerFreeOrdersViewColumns = handlers => [
  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderCell: params => <NormDateCell params={params} />,
    width: 120,
    type: 'date',
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    width: 170,
    renderCell: params => (
      <NormalActionBtnCell
        bTnText={t(TranslationKey['Get to work'])}
        onClickOkBtn={() => handlers.onClickTableRowBtn(params.row)}
      />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Orders),
    width: 400,
    renderCell: params => <OrderCell product={params.row.originalData.product} />,
  },

  {field: 'amount', headerName: t(TranslationKey.Quantity), type: 'number', width: 100},

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    renderCell: params => <ActiveBarcodeCell barCode={params.value} />,
    width: 200,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey['Int warehouse']),
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.storekeeper?._id} />,
    width: 200,
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.product.client?._id} />,
    width: 200,
  },

  {
    field: 'warehouses',
    headerName: t(TranslationKey.Warehouse),
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'clientComment',
    headerName: t(TranslationKey['Client comment']),
    renderCell: params => renderFieldValueCell(params.value),
    width: 300,
  },
]

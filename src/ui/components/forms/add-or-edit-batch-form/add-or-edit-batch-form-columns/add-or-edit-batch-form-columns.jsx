import {TranslationKey} from '@constants/translations/translation-key'

import {
  NormDateCell,
  OrderCell,
  OrderManyItemsCell,
  MultilineTextCell,
  SuperboxQtyCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
} from '@components/data-grid-cells/data-grid-cells'

import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

export const addOrEditBatchFormColumns = () => [
  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 70,
  },

  {
    field: 'qty',
    headerName: t(TranslationKey.Quantity),
    renderCell: params =>
      params.row.originalData.amount > 1 ? (
        <SuperboxQtyCell qty={params.row.qty} superbox={params.row.originalData.amount} />
      ) : (
        <MultilineTextCell text={params.value} />
      ),
    width: 70,
    type: 'number',
  },

  {
    field: 'orders',
    headerName: t(TranslationKey.Product),
    width: 330,
    renderCell: params =>
      params.row.originalData.items.length > 1 ? (
        <OrderManyItemsCell box={params.row.originalData} />
      ) : (
        <OrderCell
          product={params.row.originalData.items[0].product}
          superbox={params.row.originalData.amount > 1 && params.row.originalData.amount}
          box={params.row.originalData}
        />
      ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 130,
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderCell: params => <UserLinkCell blackText name={params.value} userId={params.row.originalData.client._id} />,
    width: 160,
  },

  {
    field: 'logicsTariff',
    headerName: t(TranslationKey.Tariff),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 160,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderCell: params => <NormDateCell params={params} />,
    width: 110,
    type: 'date',
  },

  {
    field: 'finalWeight',
    headerName: t(TranslationKey['Final weight']),
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 120,
  },

  {
    field: 'deliveryTotalPrice',
    headerName: t(TranslationKey['Total price']),
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 120,
    type: 'number',
  },
]

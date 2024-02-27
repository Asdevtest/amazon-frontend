import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OrderCell,
  OrderManyItemsCell,
  ToFixedWithKgSignCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const adminBoxesViewColumns = () => [
  {
    field: 'isDraft',
    headerName: '',
    renderCell: params => (params.value ? 'isDraft' : 'OK'),
    width: 60,
    sortable: false,
    filterable: false,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
    renderCell: params => <NormDateCell value={params.value} />,
    width: 105,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <NormDateCell value={params.value} />,
    width: 105,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 60,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
    renderCell: params => (
      <UserMiniCell
        userName={params.row.originalData.items[0].product.client?.name}
        userId={params.row.originalData.items[0].product.client?._id}
      />
    ),
    width: 180,
    sortable: false,
    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey.Storekeeper),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Storekeeper)} />,
    renderCell: params => <UserMiniCell userName={params.value} userId={params.row.originalData.storekeeper?._id} />,
    width: 180,
    sortable: false,
    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
    width: 300,
    renderCell: params =>
      params.row.originalData.items.length > 1 ? (
        <OrderManyItemsCell box={params.row.originalData} />
      ) : (
        <OrderCell
          box={params.row.originalData}
          product={params.row.originalData.items[0].product}
          superbox={params.row.originalData.amount > 1 && params.row.originalData.amount}
        />
      ),
    sortable: false,
    columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
    renderCell: params => <MultilineTextCell text={params.row.originalData.amount} />,
    width: 100,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
    renderCell: params => <MultilineTextCell text={params.row.originalData.destination?.name} />,
    width: 200,
    sortable: false,
    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'totalPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.row.amazonPrice, 2)} />,
    width: 110,
    sortable: false,
    filterable: false,
  },

  {
    field: 'finalWeight',
    headerName: t(TranslationKey['Final weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 120,
    sortable: false,
    filterable: false,
  },

  {
    field: 'weighGrossKgWarehouse',
    headerName: t(TranslationKey['Gross weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Gross weight'])} />,
    renderCell: params => <ToFixedWithKgSignCell value={params.row.originalData.weighGrossKgWarehouse} fix={2} />,
    type: 'number',
    width: 130,
    sortable: false,
    filterable: false,
  },

  {
    field: 'trackNumberText',
    headerName: t(TranslationKey['Track number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Track number'])} />,
    renderCell: params => <MultilineTextCell text={params.row.originalData.trackNumberText} />,
    width: 150,
    sortable: false,
    columnKey: columnnsKeys.shared.QUANTITY,
  },
]

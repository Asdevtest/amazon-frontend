import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateCell,
  OrdersIdsItemsCell,
  ProductsCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

export const addOrEditBatchFormColumns = isClient => [
  {
    field: 'xid',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: params => <Text isCell text={params.value} />,
    width: 65,
  },

  {
    field: 'orderIdsItems',
    headerName: t(TranslationKey['№ Order/ № Item']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['№ Order/ № Item'])} />,
    renderCell: params => <OrdersIdsItemsCell value={params.value} />,
    width: 150,
  },

  {
    field: 'boxes',
    headerName: t(TranslationKey.Boxes),
    width: 200,
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Boxes)} />,
    renderCell: params => <ProductsCell box={params.row.originalData} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'logicsTariff',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,
    renderCell: params => <Text isCell text={params.value} />,
    width: 150,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
    renderCell: params => <Text isCell text={params.value} />,
    width: 150,
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderHeader: () => (
      <MultilineTextHeaderCell text={isClient ? t(TranslationKey.Storekeeper) : t(TranslationKey.Client)} />
    ),
    renderCell: params => (
      <UserCell
        name={isClient ? params.row.originalData?.storekeeper?.name : params.row.originalData?.client?.name}
        id={isClient ? params.row.originalData?.storekeeper?._id : params.row.originalData?.client?._id}
      />
    ),
    width: 130,
    filterable: false,
    sortable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <NormDateCell value={params.value} />,
    width: 100,
  },

  {
    field: 'finalWeight',
    headerName: t(TranslationKey['Final weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,
    renderCell: params => <Text isCell text={toFixedWithKg(params.value)} />,
    width: 120,
  },

  {
    field: 'deliveryTotalPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,
    renderCell: params => <Text isCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 120,
  },
]

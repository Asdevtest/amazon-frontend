import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OrderBoxesCell,
  OrdersIdsItemsCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const addOrEditBatchFormColumns = isClient => [
  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
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
    width: 295,
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Boxes)} />,
    renderCell: params =>
      params.row.originalData.items.length > 1 ? (
        <div>
          <OrderBoxesCell
            superbox
            withoutSku
            withQuantity
            qty={params.row.qty}
            superboxQty={params.row.originalData.amount}
            box={params.row.originalData}
          />
        </div>
      ) : (
        <div>
          <OrderBoxesCell
            withoutSku
            withQuantity
            qty={params.row.qty}
            superboxQty={params.row.originalData.amount > 1 && params.row.originalData.amount}
            box={params.row.originalData}
            product={params.row.originalData.items[0].product}
          />
        </div>
      ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'logicsTariff',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 150,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 150,
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderHeader: () => (
      <MultilineTextHeaderCell text={isClient ? t(TranslationKey.Storekeeper) : t(TranslationKey.Client)} />
    ),
    renderCell: params => (
      <UserLinkCell
        blackText
        name={isClient ? params.row.originalData?.storekeeper?.name : params.row.originalData?.client?.name}
        userId={isClient ? params.row.originalData?.storekeeper?._id : params.row.originalData?.client?._id}
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
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    width: 120,
  },

  {
    field: 'deliveryTotalPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 120,
  },
]

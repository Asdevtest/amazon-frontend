import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateCell,
  OrderCell,
  OrderManyItemsCell,
  Text,
  UserCell,
} from '@components/data-grid/data-grid-cells'

import { toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

export const clientBoxesReadyToBatchViewColumns = () => [
  {
    field: 'xid',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

    renderCell: params => <Text text={params.value} />,
    type: 'number',
    width: 80,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    width: 100,
  },

  {
    field: 'orders',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    width: 400,
    renderCell: params =>
      params.row.originalData ? (
        params.row.originalData.items.length > 1 ? (
          <OrderManyItemsCell box={(() => ({ ...params.row.originalData }))()} />
        ) : (
          <OrderCell
            box={(() => ({ ...params.row.originalData }))()}
            product={params.row.originalData.items[0].product}
            superbox={params.row.originalData.amount > 1 && params.row.originalData.amount}
          />
        )
      ) : (
        ''
      ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,

    renderCell: params => <Text text={params.value * params.row.originalData.amount} />,
    type: 'number',
    width: 100,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

    renderCell: params => <Text text={params.value} />,
    width: 130,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey['Int warehouse']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,

    renderCell: params => <UserCell name={params.value} id={params.row.originalData.storekeeper?._id} />,
    width: 160,
  },

  {
    field: 'logicsTariff',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,

    renderCell: params => <Text text={params.value} />,
    width: 200,
  },

  {
    field: 'amazonPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,

    renderCell: params => <Text text={toFixedWithDollarSign(params.value, 2)} />,
    type: 'number',
    width: 140,
  },

  {
    field: 'finalWeight',
    headerName: t(TranslationKey['Final weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,

    renderCell: params => <Text text={toFixedWithKg(params.value)} />,
    type: 'number',
    width: 150,
  },

  {
    field: 'grossWeight',
    headerName: t(TranslationKey['Total weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total weight'])} />,

    renderCell: params => <Text text={toFixedWithKg(params.value)} />,
    type: 'number',
    width: 120,
  },
]

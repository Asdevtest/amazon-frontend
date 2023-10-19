import { TranslationKey } from '@constants/translations/translation-key'

import {
  ClientNotificationsBtnsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OrderCell,
  OrderManyItemsCell,
  SuperboxQtyCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const clientBoxesTariffsNotificationsViewColumns = handlers => [
  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 60,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    width: 100,
    // type: 'date',
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 325,
    renderCell: params => {
      return <ClientNotificationsBtnsCell handlers={handlers} row={params.row.originalData} />
    },
    filterable: false,
    sortable: false,
  },

  {
    field: 'orders',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    width: 400,
    renderCell: params => {
      return params.row.originalData.items.length > 1 ? (
        <OrderManyItemsCell box={params.row.originalData} />
      ) : (
        <OrderCell
          product={params.row.originalData.items[0].product}
          superbox={params.row.originalData.amount > 1 && params.row.originalData.amount}
          box={params.row.originalData}
        />
      )
    },
    filterable: false,
    sortable: false,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,

    renderCell: params =>
      params.row.originalData.amount > 1 ? (
        <SuperboxQtyCell qty={params.row.amount} superbox={params.row.originalData.amount} />
      ) : (
        <MultilineTextCell text={params.value} />
      ),
    type: 'number',
    width: 100,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 130,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey['Int warehouse']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.storekeeper?._id} />
    ),
    width: 160,
  },

  {
    field: 'logicsTariff',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 200,
  },

  {
    field: 'finalWeight',
    headerName: t(TranslationKey['Final weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 100,
  },

  {
    field: 'grossWeight',
    headerName: t(TranslationKey['Gross weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Gross weight'])} />,

    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 100,
  },
]

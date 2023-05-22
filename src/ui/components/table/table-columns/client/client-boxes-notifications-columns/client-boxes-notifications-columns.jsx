/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ClientNotificationsBtnsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OrderCell,
  OrderManyItemsCell,
  MultilineTextCell,
  SuperboxQtyCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const clientBoxesNotificationsViewColumns = handlers => [
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
    type: 'date',
  },

  {
    field: 'deliveryTotalPriceChanged',
    headerName: t(TranslationKey['Pay more']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Pay more'])} />,

    width: 100,
    renderCell: params => (
      <MultilineTextCell text={(params.value - params.row.originalData.deliveryTotalPrice).toFixed(2)} />
    ),
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 325,
    renderCell: params => {
      const handlersMemo = useMemo(() => handlers, [])
      const rowMemo = useMemo(() => params.row.originalData, [])

      return <ClientNotificationsBtnsCell handlers={handlersMemo} row={rowMemo} />
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
      const productMemo = useMemo(() => params.row.originalData.items[0].product, [])
      const rowMemo = useMemo(() => params.row.originalData, [])

      return params.row.originalData.items.length > 1 ? (
        <OrderManyItemsCell box={rowMemo} />
      ) : (
        <OrderCell
          product={productMemo}
          superbox={params.row.originalData.amount > 1 && params.row.originalData.amount}
          box={rowMemo}
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
    width: 180,
  },

  {
    field: 'amazonPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    type: 'number',
    width: 100,
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

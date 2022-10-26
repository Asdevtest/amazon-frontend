import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell, // ShortDateCell,
  OrderCell,
  OrderManyItemsCell,
  MultilineTextCell,
  ShortBoxDimensions,
  SuperboxQtyCell,
  UserLinkCell,
  WarehouseBoxesBtnsCell,
  OrdersIdsItemsCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const warehouseBoxesViewColumns = (handlers, firstRowId, user) => [
  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey['Box ID']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Box ID'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
  },

  {
    field: 'orderIdsItems',
    headerName: t(TranslationKey['№ Order/ № Item']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['№ Order/ № Item'])} />,

    renderCell: params => <OrdersIdsItemsCell value={params.value} />,
    width: 140,
  },

  {
    field: 'orders',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    width: 380,
    renderCell: params =>
      params.row.originalData.items.length > 1 ? (
        <OrderManyItemsCell box={params.row.originalData} />
      ) : (
        <OrderCell
          box={params.row.originalData}
          product={params.row.originalData.items[0]?.product}
          superbox={params.row.originalData.amount > 1 && params.row.originalData.amount}
        />
      ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'qty',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,

    renderCell: params =>
      params.row.originalData.amount > 1 ? (
        <SuperboxQtyCell qty={params.row.qty} superbox={params.row.originalData.amount} />
      ) : (
        <MultilineTextCell text={params.value} />
      ),
    width: 110,
    type: 'number',
  },

  {
    field: 'warehouse',
    headerName: t(TranslationKey['Destination and tariff']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Destination and tariff'])} />,

    renderCell: params => (
      <div style={{display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', width: '100%'}}>
        <MultilineTextCell text={params.row.warehouse} />
        <MultilineTextCell text={params.row.logicsTariff} />
      </div>
    ),
    width: 170,
    filterable: false,
    sortable: false,
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.items[0]?.product.client?._id} />
    ),
    width: 200,
  },

  {
    field: 'batchId',
    headerName: t(TranslationKey.Batch),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Batch)} />,

    renderCell: params => <MultilineTextCell text={params.value} noTextText={t(TranslationKey['Outside Batch'])} />,
    width: 110,
  },

  {
    field: 'dimansions',
    headerName: t(TranslationKey.Demensions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Demensions)} />,

    renderCell: params => (
      <ShortBoxDimensions
        isShipping
        box={params.row.originalData}
        volumeWeightCoefficient={params.row.volumeWeightCoefficient}
        curUser={user.role}
        handlers={handlers}
      />
    ),
    width: 230,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 230,

    renderCell: params => (
      <WarehouseBoxesBtnsCell
        row={params.row.originalData}
        handlers={handlers}
        isFirstRow={firstRowId === params.row.id}
      />
    ),
    filterable: false,
    sortable: false,
  },
]

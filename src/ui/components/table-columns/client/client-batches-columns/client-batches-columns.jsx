import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  NormDateCell,
  BatchBoxesCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
  WarehouseTariffDatesCell,
  MultilineTextHeaderCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const clientBatchesViewColumns = () => [
  {
    field: 'orders',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
    headerName: t(TranslationKey.Product),
    width: 540,
    renderCell: params => <BatchBoxesCell boxes={params.row.originalData.boxes} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'updatedAt',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    headerName: t(TranslationKey.Updated),
    renderCell: params => <NormDateCell params={params} />,
    width: 110,
    type: 'date',
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
    renderCell: params => renderFieldValueCell(params.value),
    width: 100,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

    renderCell: params => renderFieldValueCell(params.value),
    width: 80,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey.Storekeeper),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Storekeeper)} />,

    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.storekeeper?._id} />,
    width: 120,
  },

  {
    field: 'tariff',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,

    renderCell: params => renderFieldValueCell(params.value),
    width: 110,
  },

  {
    field: 'finalWeight',
    headerName: t(TranslationKey['Final weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 130,
  },

  {
    field: 'deliveryTotalPrice',
    headerName: t(TranslationKey['Delivery cost']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Delivery cost'])} />,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 130,
  },

  {
    field: 'totalPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,

    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 130,
  },

  {
    field: 'dates',
    headerName: t(TranslationKey['Shipping dates']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Shipping dates'])} />,

    renderCell: params => <WarehouseTariffDatesCell row={params.row.originalData.boxes[0].logicsTariff} />,
    width: 350,
    filterable: false,
    sortable: false,
  },
]

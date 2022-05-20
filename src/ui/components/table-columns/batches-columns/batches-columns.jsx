import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  NormDateCell,
  BatchBoxesCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
  ToFixedWithKgSignCell,
  WarehouseTariffDatesCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const batchesViewColumns = () => [
  {
    field: 'orders',
    headerName: t(TranslationKey.Product),
    width: 550,
    renderCell: params => <BatchBoxesCell boxes={params.row.originalData.boxes} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderCell: params => <NormDateCell params={params} />,
    width: 110,
    type: 'date',
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderCell: params => renderFieldValueCell(params.value),
    width: 100,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderCell: params => renderFieldValueCell(params.value),
    width: 80,
  },

  {
    field: 'tariff',
    headerName: t(TranslationKey.Tariff),
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },

  {
    field: 'finalWeight',
    headerName: t(TranslationKey['Final weight']),
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 130,
  },

  {
    field: 'totalPrice',
    headerName: t(TranslationKey['Total price']),
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 130,
  },

  {
    field: 'dates',
    headerName: t(TranslationKey.Dates),
    renderCell: params => <WarehouseTariffDatesCell row={params.row.originalData.boxes[0].logicsTariff} />,
    width: 350,
    filterable: false,
    sortable: false,
  },
]

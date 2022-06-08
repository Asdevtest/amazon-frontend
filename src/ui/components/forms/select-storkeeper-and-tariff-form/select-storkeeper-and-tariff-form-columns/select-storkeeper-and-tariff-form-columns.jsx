import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  NormalActionBtnCell,
  renderFieldValueCell,
  ScrollingCell,
  WarehouseTariffDatesCell,
  WarehouseTariffDestinationCell,
  WarehouseTariffRatesCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const logisticsTariffsColumns = handlers => [
  {
    field: 'name',
    headerName: t(TranslationKey['Tariff name']),
    width: 150,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'description',
    headerName: t(TranslationKey['Tariff description']),
    width: 350,
    renderCell: params => <ScrollingCell value={params.value} />,
  },

  {
    field: 'deliveryTimeInDay',
    headerName: t(TranslationKey['Time on the road, days']),
    width: 110,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'minWeightInKg',
    headerName: t(TranslationKey['Min. weight, kg']),
    width: 110,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Region),
    renderCell: () => <WarehouseTariffDestinationCell />,
    width: 110,
    filterable: false,
    sortable: false,
  },

  {
    field: 'rates',
    headerName: t(TranslationKey['Rate, $']),
    renderCell: params => <WarehouseTariffRatesCell conditionsByRegion={params.row.conditionsByRegion} />,
    width: 80,
    filterable: false,
    sortable: false,
  },

  {
    field: 'dates',
    headerName: t(TranslationKey.Dates),
    renderCell: params => <WarehouseTariffDatesCell row={params.row} />,
    width: 350,
    filterable: false,
    sortable: false,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    width: 150,
    renderCell: params => (
      <NormalActionBtnCell
        bTnText={t(TranslationKey['Select Tariff'])}
        onClickOkBtn={() => handlers.onClickSelectTariff(params.row._id)}
      />
    ),
    filterable: false,
    sortable: false,
  },
]

export const warehouseTariffsColumns = () => [
  {
    field: 'name',
    headerName: t(TranslationKey['Tariff name']),
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'description',
    headerName: t(TranslationKey['Tariff description']),
    width: 600,
    renderCell: params => <ScrollingCell value={params.value} />,
  },

  {
    field: 'price',
    headerName: t(TranslationKey['Service cost per kg, $']),
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },
]

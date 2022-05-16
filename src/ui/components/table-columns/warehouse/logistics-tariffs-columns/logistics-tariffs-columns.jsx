import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  EditOrRemoveBtnsCell,
  NormDateCell,
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
    headerName: t(TranslationKey.Title),
    width: 200,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderCell: params => <NormDateCell params={params} />,
    width: 120,
    type: 'date',
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    width: 350,
    renderCell: params => <ScrollingCell value={params.value} />,
  },

  {
    field: 'deliveryTimeInDay',
    headerName: t(TranslationKey['Time on the road, days']),
    width: 140,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'minWeightInKg',
    headerName: t(TranslationKey['Min. weight, kg']),
    width: 130,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Region),
    renderCell: () => <WarehouseTariffDestinationCell />,
    width: 130,
    filterable: false,
    sortable: false,
  },

  {
    field: 'rates',
    headerName: t(TranslationKey['Rate, $']),
    renderCell: params => <WarehouseTariffRatesCell conditionsByRegion={params.row.conditionsByRegion} />,
    width: 100,
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
    headerName: t(TranslationKey.Action),
    width: 200,
    renderCell: params => <EditOrRemoveBtnsCell handlers={handlers} row={params.row} />,
    filterable: false,
    sortable: false,
  },
]

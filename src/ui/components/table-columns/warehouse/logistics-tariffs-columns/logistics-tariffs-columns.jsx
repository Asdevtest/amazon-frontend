import React from 'react'

import {texts} from '@constants/texts'

import {
  EditOrRemoveBtnsCell,
  NormDateCell,
  renderFieldValueCell,
  ScrollingCell,
  WarehouseTariffDatesCell,
  WarehouseTariffDestinationCell,
  WarehouseTariffRatesCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').logisticsTariffsColumns

export const logisticsTariffsColumns = handlers => [
  {
    field: 'name',
    headerName: textConsts.nameField,
    width: 200,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'updatedAt',
    headerName: textConsts.updatedAtField,
    renderCell: params => <NormDateCell params={params} />,
    width: 120,
    type: 'date',
  },

  {
    field: 'description',
    headerName: textConsts.descriptionField,
    width: 350,
    renderCell: params => <ScrollingCell value={params.value} />,
  },

  {
    field: 'deliveryTimeInDay',
    headerName: textConsts.deliveryTimeInDayField,
    width: 140,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'minWeightInKg',
    headerName: textConsts.minWeightInKgField,
    width: 130,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'destination',
    headerName: textConsts.destinationField,
    renderCell: () => <WarehouseTariffDestinationCell />,
    width: 130,
    filterable: false,
    sortable: false,
  },

  {
    field: 'rates',
    headerName: textConsts.ratesField,
    renderCell: params => <WarehouseTariffRatesCell conditionsByRegion={params.row.conditionsByRegion} />,
    width: 100,
    filterable: false,
    sortable: false,
  },

  {
    field: 'dates',
    headerName: textConsts.datesField,
    renderCell: params => <WarehouseTariffDatesCell row={params.row} />,
    width: 350,
    filterable: false,
    sortable: false,
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 200,
    renderCell: params => <EditOrRemoveBtnsCell handlers={handlers} row={params.row} />,
    filterable: false,
    sortable: false,
  },
]

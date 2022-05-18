import React from 'react'

import {texts} from '@constants/texts'

import {
  NormalActionBtnCell,
  renderFieldValueCell,
  ScrollingCell,
  WarehouseTariffDatesCell,
  WarehouseTariffDestinationCell,
  WarehouseTariffRatesCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').selectStorkeeperAndTariffFormColumns

export const logisticsTariffsColumns = handlers => [
  {
    field: 'name',
    headerName: textConsts.nameField,
    width: 150,
    renderCell: params => renderFieldValueCell(params.value),
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
    width: 110,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'minWeightInKg',
    headerName: textConsts.minWeightInKgField,
    width: 110,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'destination',
    headerName: textConsts.destinationField,
    renderCell: () => <WarehouseTariffDestinationCell />,
    width: 110,
    filterable: false,
    sortable: false,
  },

  {
    field: 'rates',
    headerName: textConsts.ratesField,
    renderCell: params => <WarehouseTariffRatesCell conditionsByRegion={params.row.conditionsByRegion} />,
    width: 80,
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
    width: 150,
    renderCell: params => (
      <NormalActionBtnCell
        bTnText={'Выбрать тариф'}
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
    headerName: textConsts.nameField,
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'description',
    headerName: textConsts.descriptionField,
    width: 600,
    renderCell: params => <ScrollingCell value={params.value} />,
  },

  {
    field: 'price',
    headerName: textConsts.priceField,
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },
]

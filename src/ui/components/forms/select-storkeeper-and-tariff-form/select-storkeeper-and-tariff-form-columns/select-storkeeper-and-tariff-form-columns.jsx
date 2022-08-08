import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  NormalActionBtnCell,
  MultilineTextCell,
  ScrollingCell,
  WarehouseTariffDatesCell,
  WarehouseTariffDestinationCell,
  WarehouseTariffRatesCell,
  TextHeaderCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const logisticsTariffsColumns = handlers => [
  {
    field: 'name',
    headerName: t(TranslationKey['Tariff name']),
    renderHeader: () => <TextHeaderCell text={t(TranslationKey['Tariff name'])} />,
    width: 160,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey['Tariff description']),
    renderHeader: () => <TextHeaderCell text={t(TranslationKey['Tariff description'])} />,
    width: 310,
    renderCell: params => <ScrollingCell value={params.value} />,
  },

  {
    field: 'deliveryTimeInDay',
    headerName: t(TranslationKey['Time on the road, days']),
    renderHeader: () => <TextHeaderCell text={t(TranslationKey['Time on the road, days'])} />,
    width: 180,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'minWeightInKg',
    headerName: t(TranslationKey['Min. weight, kg']),
    renderHeader: () => <TextHeaderCell text={t(TranslationKey['Min. weight, kg'])} />,
    width: 120,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Region),
    renderHeader: () => <TextHeaderCell text={t(TranslationKey.Region)} />,
    renderCell: () => <WarehouseTariffDestinationCell />,
    width: 130,
    filterable: false,
    sortable: false,
  },

  {
    field: 'rates',
    headerName: t(TranslationKey['Rate, $']),
    renderHeader: () => <TextHeaderCell text={t(TranslationKey['Rate, $'])} />,
    renderCell: params => <WarehouseTariffRatesCell conditionsByRegion={params.row.conditionsByRegion} />,
    width: 90,
    filterable: false,
    sortable: false,
  },

  {
    field: 'dates',
    headerName: t(TranslationKey.Dates),
    renderHeader: () => <TextHeaderCell text={t(TranslationKey.Dates)} />,
    renderCell: params => <WarehouseTariffDatesCell row={params.row} />,
    width: 330,
    filterable: false,
    sortable: false,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <TextHeaderCell text={t(TranslationKey.Actions)} />,
    width: 200,
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
    renderHeader: () => <TextHeaderCell text={t(TranslationKey['Tariff name'])} />,
    width: 250,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey['Tariff description']),
    renderHeader: () => <TextHeaderCell text={t(TranslationKey['Tariff description'])} />,
    width: 600,
    renderCell: params => <ScrollingCell value={params.value} />,
  },

  {
    field: 'price',
    headerName: t(TranslationKey['Service cost per kg, $']),
    renderHeader: () => <TextHeaderCell text={t(TranslationKey['Service cost per kg, $'])} />,
    width: 250,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },
]

import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormalActionBtnCell,
  ScrollingCell,
  WarehouseTariffDatesCell,
  WarehouseTariffDestinationCell,
  WarehouseTariffRatesCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const logisticsTariffsColumns = handlers => [
  {
    field: 'name',
    headerName: t(TranslationKey['Tariff name']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Tariff name'])} />,
    width: 160,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey['Tariff description']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Tariff description'])} />,
    width: 300,
    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
  },

  {
    field: 'deliveryTimeInDay',
    headerName: t(TranslationKey['Time on the road, days']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Time on the road, days'])} />,
    width: 180,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'minWeightInKg',
    headerName: t(TranslationKey['Min. weight, kg']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Min. weight, kg'])} />,
    width: 100,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Region),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Region)} />,
    renderCell: () => <WarehouseTariffDestinationCell />,
    width: 150,
    filterable: false,
    sortable: false,
  },

  {
    field: 'rates',
    headerName: t(TranslationKey.Rate) + ', $',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Rate) + ', $'} />,
    renderCell: params => <WarehouseTariffRatesCell conditionsByRegion={params.row.conditionsByRegion} />,
    width: 90,
    filterable: false,
    sortable: false,
  },

  {
    field: 'dates',
    headerName: t(TranslationKey.Dates),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Dates)} />,
    renderCell: params => (
      <WarehouseTariffDatesCell cls={params.row?.cls} etd={params.row?.etd} eta={params.row?.eta} />
    ),
    width: 330,
    filterable: false,
    sortable: false,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    width: 200,
    renderCell: params => (
      <NormalActionBtnCell
        bTnText={t(TranslationKey['Select Tariff'])}
        onClickOkBtn={() => handlers.onClickSelectTariffOld(params.row._id, null)}
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
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Tariff name'])} />,
    width: 250,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey['Tariff description']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Tariff description'])} />,
    width: 600,
    renderCell: params => <ScrollingCell value={params.value} />,
  },

  {
    field: 'price',
    headerName: t(TranslationKey['Service cost per kg, $']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Service cost per kg, $'])} />,
    width: 250,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },
]

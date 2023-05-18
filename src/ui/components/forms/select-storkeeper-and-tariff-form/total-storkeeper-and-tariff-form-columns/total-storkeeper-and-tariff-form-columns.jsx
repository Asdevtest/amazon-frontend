import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  WarehouseTariffDatesCell,
  WarehouseTariffDestinationCell,
  WarehouseTariffRatesCell,
  MultilineTextHeaderCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const TotalTariffsColumns = () => [
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
    width: 120,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Region),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Region)} />,
    renderCell: () => <WarehouseTariffDestinationCell />,
    width: 200,
    filterable: false,
    sortable: false,
  },

  {
    field: 'rates',
    headerName: t(TranslationKey.Rate) + ', $',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Rate) + ', $'} />,
    renderCell: params => <WarehouseTariffRatesCell conditionsByRegion={params.row.conditionsByRegion} />,
    width: 140,
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
    width: 370,
    filterable: false,
    sortable: false,
  },
]

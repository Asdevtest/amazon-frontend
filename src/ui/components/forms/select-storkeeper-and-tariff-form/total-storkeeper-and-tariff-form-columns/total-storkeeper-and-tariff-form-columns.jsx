import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  WarehouseTariffDatesCell,
  WarehouseTariffDestinationCell,
  WarehouseTariffRatesCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

export const TotalTariffsColumns = () => [
  {
    field: 'name',
    headerName: t(TranslationKey['Tariff name']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Tariff name'])} />,
    minWidth: 160,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey['Tariff description']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Tariff description'])} />,
    minWidth: 300,
    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
  },

  {
    field: 'deliveryTimeInDay',
    headerName: t(TranslationKey['Time on the road, days']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Time on the road, days'])} />,
    minWidth: 180,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'minWeightInKg',
    headerName: t(TranslationKey['Min. weight, kg']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Min. weight, kg'])} />,
    minWidth: 120,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Region),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Region)} />,
    renderCell: () => <WarehouseTariffDestinationCell />,
    minWidth: 200,
    filterable: false,
    sortable: false,
  },

  {
    field: 'rates',
    headerName: t(TranslationKey.Rate) + ', $',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Rate) + ', $'} />,
    renderCell: params => <WarehouseTariffRatesCell conditionsByRegion={params.row.conditionsByRegion} />,
    minWidth: 140,
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
    minWidth: 370,
    filterable: false,
    sortable: false,
  },
]

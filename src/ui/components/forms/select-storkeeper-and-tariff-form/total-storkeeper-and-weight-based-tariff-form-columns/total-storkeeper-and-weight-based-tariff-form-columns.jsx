import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  WarehouseTariffDatesCell,
} from '@components/data-grid/data-grid-cells'
import { DestinationVariationsSpanningCell } from '@components/data-grid/data-grid-spanning-cells/data-grid-spanning-cells'

import { t } from '@utils/translations'

export const TotalStorkeeperAndWeightBasedTariffFormColumns = () => [
  {
    field: 'name',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Tariff name'])} />,

    minWidth: 120,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,

    minWidth: 150,
    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

    renderCell: params => (
      <DestinationVariationsSpanningCell destinationVariations={params.row.destinationVariations} />
    ),
    minWidth: 149,
    filterable: false,
    sortable: false,
    colSpan: 4,
    hideable: false,
  },
  {
    field: 'weight',
    headerName: t(TranslationKey['Weight, kg']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Weight, kg'])} />,

    minWidth: 200,
    filterable: false,
    sortable: false,
    hideable: false,
  },
  {
    field: 'inYuansRates',
    headerName: t(TranslationKey.Rate) + ', ¥',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Rate) + ', ¥'} />,

    minWidth: 88,
    filterable: false,
    sortable: false,
    hideable: false,
  },
  {
    field: 'rates',
    headerName: t(TranslationKey.Rate) + ', $',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Rate) + ', $'} />,

    minWidth: 88,
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
    minWidth: 323,
    filterable: false,
    sortable: false,
  },

  {
    field: 'deliveryTimeInDay',
    headerName: t(TranslationKey['Time on the road, days']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Time on the road, days'])} />,

    type: 'number',
    minWidth: 120,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },
]

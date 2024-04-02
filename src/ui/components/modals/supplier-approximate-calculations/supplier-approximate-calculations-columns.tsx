import { GridColDef } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { ApproximateCell } from '@components/data-grid/data-grid-cells/approximate-cell/approximate-cell'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

export const SupplierApproximateCalculationsColumns = (): GridColDef[] => [
  {
    field: 'name',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,
    width: 160,
    renderCell: params => <MultilineTextCell text={params.value} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

    renderCell: params => <ApproximateCell destinations={params.row.destinationVariations} field="destinationName" />,
    minWidth: 140,
    align: 'center',
    filterable: false,
    sortable: false,
  },

  {
    field: 'minWeight',
    headerName: t(TranslationKey['Min. weight, kg']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Min. weight, kg'])} />,
    renderCell: params => <ApproximateCell destinations={params.row.destinationVariations} field="minWeight" />,
    width: 100,
    align: 'center',
    filterable: false,
    sortable: false,
  },

  {
    field: 'maxWeight',
    headerName: t(TranslationKey['Max. weight, kg']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Max. weight, kg'])} />,
    renderCell: params => <ApproximateCell destinations={params.row.destinationVariations} field="maxWeight" />,
    width: 100,
    align: 'center',
    filterable: false,
    sortable: false,
  },

  {
    field: 'costUnitWithDeliveryToChina',
    headerName: t(TranslationKey['Cost per unit with delivery to China']),
    renderHeader: () => (
      <MultilineTextHeaderCell text={t(TranslationKey['Cost per unit with delivery to China']) + ', $'} />
    ),
    renderCell: params => <MultilineTextCell text={toFixed(params.value, 2)} />,
    width: 130,
    align: 'center',
    filterable: false,
    sortable: false,
  },

  {
    field: 'pricePerKgUsd',
    headerName: t(TranslationKey['price per unit']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['price per unit']) + ', $'} />,
    renderCell: params => <ApproximateCell destinations={params.row.destinationVariations} field="pricePerKgUsd" />,
    width: 130,
    align: 'center',
    filterable: false,
    sortable: false,
  },

  {
    field: 'costUnitWithDeliveryToUsa',
    headerName: t(TranslationKey['Cost of per unit in the U.S.']) + ', $',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Cost of per unit in the U.S.']) + ', $'} />,
    renderCell: params => (
      <ApproximateCell destinations={params.row.destinationVariations} field="costUnitWithDeliveryToUsa" />
    ),
    width: 130,
    align: 'center',
    filterable: false,
    sortable: false,
  },

  {
    field: 'roi',
    headerName: t(TranslationKey['ROI calculation']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ROI calculation'])} />,
    renderCell: params => <ApproximateCell destinations={params.row.destinationVariations} field="roi" />,
    width: 140,
    align: 'center',
    filterable: false,
    sortable: false,
  },
]

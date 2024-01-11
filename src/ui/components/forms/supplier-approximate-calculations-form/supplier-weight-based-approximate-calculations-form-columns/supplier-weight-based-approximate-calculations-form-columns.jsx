import { TranslationKey } from '@constants/translations/translation-key'

import {
  CustomDestinationsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const SupplierWeightBasedApproximateCalculationsFormColumns = () => [
  {
    field: 'name',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,
    width: 160,
    renderCell: params => <MultilineTextCell text={params.row.originalData.name} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

    renderCell: params => (
      <CustomDestinationsCell destinations={params.row.destinationVariations} field="destinationName" />
    ),
    minWidth: 140,
    align: 'center',
    filterable: false,
    sortable: false,
  },

  {
    field: 'weight',
    headerName: t(TranslationKey['Weight, kg']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Weight, kg'])} />,
    renderCell: params => <CustomDestinationsCell destinations={params.row.destinationVariations} field="weight" />,
    minWidth: 150,
    align: 'center',
    filterable: false,
    sortable: false,
  },

  {
    field: 'costDeliveryToChina',
    headerName: t(TranslationKey['Cost per unit with delivery to China']),
    renderHeader: () => (
      <MultilineTextHeaderCell text={t(TranslationKey['Cost per unit with delivery to China']) + ', $'} />
    ),
    renderCell: params => <MultilineTextCell text={params.row.costDeliveryToChina} />,
    width: 130,
    align: 'center',
    filterable: false,
    sortable: false,
  },

  {
    field: 'costDeliveryToUsa',
    headerName: t(TranslationKey['Cost of per unit in the U.S.']) + ', $',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Cost of per unit in the U.S.']) + ', $'} />,
    renderCell: params => (
      <CustomDestinationsCell destinations={params.row.destinationVariations} field="costDeliveryToUsa" />
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
    renderCell: params => <CustomDestinationsCell destinations={params.row.destinationVariations} field="roi" />,
    width: 140,
    align: 'center',
    filterable: false,
    sortable: false,
  },
]

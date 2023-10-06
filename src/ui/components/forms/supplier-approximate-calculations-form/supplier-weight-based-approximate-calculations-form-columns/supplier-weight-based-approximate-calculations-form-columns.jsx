import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { WeightBasedApproximateCalculationsSpanningCell } from '@components/data-grid/data-grid-spanning-cells/data-grid-spanning-cells'

import { t } from '@utils/translations'

export const SupplierWeightBasedApproximateCalculationsFormColumns = destinationData => [
  {
    field: 'name',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,
    width: 125,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

    renderCell: params => (
      <WeightBasedApproximateCalculationsSpanningCell
        destinationVariations={params?.row?.destinationVariations}
        costDeliveryToChina={params?.row?.costDeliveryToChina}
        destinationData={destinationData}
        destinationVariationWidth={150}
        weightWrapperWidth={180}
        chinaCostWrapperWidth={90}
        usaCostWrapperWidth={90}
        roiWrapperWidth={100}
      />
    ),
    width: 180,
    filterable: false,
    sortable: false,
    colSpan: 5,
    hideable: false,
  },

  {
    field: 'weight',
    headerName: t(TranslationKey['Weight, kg']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Weight, kg'])} />,

    width: 200,
    filterable: false,
    sortable: false,
    hideable: false,
  },

  {
    field: 'costDeliveryToChina',
    headerName: t(TranslationKey['Cost per unit with delivery to China']),
    renderHeader: () => (
      <MultilineTextHeaderCell text={t(TranslationKey['Cost per unit with delivery to China']) + ', $'} />
    ),
    width: 110,
    filterable: false,
    sortable: false,
    hideable: false,
  },

  {
    field: 'costDeliveryToUsa',
    headerName: t(TranslationKey['Cost of per unit in the U.S.']) + ', $',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Cost of per unit in the U.S.']) + ', $'} />,
    width: 110,
    filterable: false,
    sortable: false,
    hideable: false,
  },

  {
    field: 'roi',
    headerName: t(TranslationKey['ROI calculation']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ROI calculation'])} />,
    width: 120,
    filterable: false,
    sortable: false,
    hideable: false,
  },
]

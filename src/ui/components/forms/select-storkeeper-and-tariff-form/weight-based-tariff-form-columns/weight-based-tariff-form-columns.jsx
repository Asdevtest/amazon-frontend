import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  NormalActionBtnCell,
  MultilineTextCell,
  WarehouseTariffDatesCell,
  MultilineTextHeaderCell,
  MultilineTextAlignLeftCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'
import { DestinationVariationsSpanningCell } from '@components/data-grid/data-grid-spanning-cells/data-grid-spanning-cells'

export const WeightBasedTariffFormColumns = (
  showCheckbox,
  variationTariffId,
  currentDestinationId,
  onClickSelectTariff,
  setVariationTariff,
) => [
  {
    field: 'name',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Tariff name'])} />,

    width: 120,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,

    width: 150,
    renderCell: params => <MultilineTextAlignLeftCell text={params.value} />,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

    renderCell: params => (
      <DestinationVariationsSpanningCell
        showCheckbox={showCheckbox}
        destinationVariations={params.row.originalData.destinationVariations}
        activeDestinationId={currentDestinationId}
        activeDedestinationVariationt={variationTariffId}
        selectVariationTariff={setVariationTariff}
      />
    ),
    width: 149,
    filterable: false,
    sortable: false,
    colSpan: 4,
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
    field: 'inYuansRates',
    headerName: t(TranslationKey.Rate) + ', ¥',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Rate) + ', ¥'} />,

    width: 88,
    filterable: false,
    sortable: false,
    hideable: false,
  },
  {
    field: 'rates',
    headerName: t(TranslationKey.Rate) + ', $',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Rate) + ', $'} />,

    width: 88,
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
    width: 323,
    filterable: false,
    sortable: false,
  },

  {
    field: 'deliveryTimeInDay',
    headerName: t(TranslationKey['Time on the road, days']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Time on the road, days'])} />,

    type: 'number',
    width: 100,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    width: 200,
    renderCell: params => (
      <NormalActionBtnCell
        disabled={
          showCheckbox &&
          ((currentDestinationId &&
            params.row.originalData?.destinationVariations.every(
              item => item?.destination?._id !== currentDestinationId,
            )) ||
            !variationTariffId ||
            params.row.originalData?.destinationVariations.every(item => item?._id !== variationTariffId))
        }
        bTnText={t(TranslationKey['Select Tariff'])}
        onClickOkBtn={() => onClickSelectTariff(params.row._id)}
      />
    ),
    filterable: false,
    sortable: false,
  },
]

import React, {useMemo} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  // EditOrRemoveBtnsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  MultilineTextCell,
  WarehouseTariffDatesCell,
  WarehouseTariffDestinationCell,
  WarehouseTariffRatesCell,
  EditOrRemoveIconBtnsCell,
  MultilineTextAlignLeftCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const logisticsTariffsColumns = (handlers, firstRowId, isArchive) => [
  {
    field: 'name',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Tariff name'])} />,

    width: 165,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,

    width: 290,
    renderCell: params => <MultilineTextAlignLeftCell text={params.value} />,
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
    field: 'inYuansRates',
    headerName: t(TranslationKey.Rate) + ', ¥',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Rate) + ', ¥'} />,

    renderCell: params => <WarehouseTariffRatesCell inYuans conditionsByRegion={params.row.conditionsByRegion} />,
    width: 95,
    filterable: false,
    sortable: false,
  },

  {
    field: 'rates',
    headerName: t(TranslationKey.Rate) + ', $',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Rate) + ', $'} />,

    renderCell: params => <WarehouseTariffRatesCell conditionsByRegion={params.row.conditionsByRegion} />,
    width: 95,
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
    width: 120,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'minWeightInKg',
    headerName: t(TranslationKey['Min. weight, kg']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Min. weight, kg'])} />,

    type: 'number',
    width: 120,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    width: 200,
    renderCell: params => {
      const handlersMemo = useMemo(() => handlers, [])
      const rowMemo = useMemo(() => params.row, [])

      return (
        <EditOrRemoveIconBtnsCell
          tooltipFirstButton={t(TranslationKey.Edit)}
          tooltipSecondButton={t(TranslationKey.Remove)}
          handlers={handlersMemo}
          row={rowMemo}
          isFirstRow={firstRowId === params.row.id}
          isArchive={isArchive}
        />
      )
    },
    filterable: false,
    sortable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    width: 120,
    type: 'date',
  },
]

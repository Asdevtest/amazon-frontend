import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextAlignLeftCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  WarehouseTariffDatesCell,
} from '@components/data-grid/data-grid-cells'
import { DestinationVariationsSpanningCell } from '@components/data-grid/data-grid-spanning-cells/data-grid-spanning-cells'
import { ArrowDownOutlineIcon, ArrowUpOutlineIcon, CrossIcon, EditIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const WeightBasedLogisticsTariffsColumns = (handlers, getIsArchive, getDestinationData) => [
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

    width: 190,
    renderCell: params => <MultilineTextAlignLeftCell text={params.value} />,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

    renderCell: params => (
      <DestinationVariationsSpanningCell
        destinationVariations={params.row.originalData.destinationVariations}
        destinationData={getDestinationData()}
      />
    ),
    width: 150,
    filterable: false,
    sortable: false,
    colSpan: 4,
    hideable: false,
  },
  {
    field: 'weight',
    headerName: t(TranslationKey['Weight, kg']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Weight, kg'])} />,

    width: 175,
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
    width: 320,
    filterable: false,
    sortable: false,
  },

  {
    field: 'deliveryTimeInDay',
    headerName: t(TranslationKey['Time on the road, days']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Time on the road, days'])} />,

    type: 'number',
    width: 110,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    width: 160,
    renderCell: params => {
      const isArchive = getIsArchive()

      return (
        <ActionButtonsCell
          row
          iconButton
          isFirstButton
          isSecondButton
          isThirdButton={isArchive}
          isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
          firstButtonTooltipText={t(TranslationKey.Edit)}
          firstButtonElement={<EditIcon />}
          firstButtonStyle={ButtonStyle.PRIMARY}
          secondButtonTooltipText={isArchive ? t(TranslationKey.Restore) : t(TranslationKey['Move to archive'])}
          secondButtonElement={isArchive ? <ArrowUpOutlineIcon /> : <ArrowDownOutlineIcon />}
          secondButtonStyle={isArchive ? ButtonStyle.SUCCESS : ButtonStyle.DANGER}
          thirdButtonTooltipText={t(TranslationKey.Remove)}
          thirdButtonElement={<CrossIcon />}
          thirdButtonStyle={ButtonStyle.DANGER}
          onClickFirstButton={() => handlers.onClickEditBtn(params.row.originalData)}
          onClickSecondButton={() => handlers.onTriggerArchive(params.row.originalData)}
          onClickThirdButton={() => handlers.onClickRemoveBtn(params.row.originalData)}
        />
      )
    },

    filterable: false,
    sortable: false,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    width: 120,
    // type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    width: 120,
    // type: 'date',
  },
]

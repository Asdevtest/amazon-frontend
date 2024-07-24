import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  TextCell,
  WarehouseTariffDatesCell,
} from '@components/data-grid/data-grid-cells'
import { DestinationVariationsSpanningCell } from '@components/data-grid/data-grid-spanning-cells/data-grid-spanning-cells'
import { ArrowDownOutlineIcon, ArrowUpOutlineIcon, CrossIcon, EditIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { ILogicTariff } from '@typings/shared/logic-tariff'

interface ILogisticsTariffsColumns {
  isArchive: () => boolean
  onRemoveLogisticTariff: (id: string) => void
  onTriggerArchive: (row: ILogicTariff) => void
  onClickEditTariff: (row: ILogicTariff) => void
}

export const logisticsTariffsColumns = ({
  isArchive,
  onRemoveLogisticTariff,
  onTriggerArchive,
  onClickEditTariff,
}: ILogisticsTariffsColumns) => [
  {
    field: 'name',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Tariff name'])} />,
    renderCell: ({ row }: GridRowModel) => <TextCell text={row.name} />,
    width: 150,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,
    renderCell: ({ row }: GridRowModel) => <TextCell text={row.description} />,
    width: 200,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
    renderCell: ({ row }: GridRowModel) => (
      <DestinationVariationsSpanningCell destinationVariations={row.destinationVariations} />
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
    renderCell: ({ row }: GridRowModel) => <WarehouseTariffDatesCell cls={row.cls} etd={row.etd} eta={row.eta} />,
    width: 320,
    filterable: false,
    sortable: false,
  },

  {
    field: 'deliveryTimeInDay',
    headerName: t(TranslationKey['Time on the road, days']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Time on the road, days'])} />,
    renderCell: ({ row }: GridRowModel) => <TextCell text={row.deliveryTimeInDay} />,
    width: 110,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    renderCell: ({ row }: GridRowModel) => (
      <ActionButtonsCell
        row
        iconButton
        isFirstButton
        isSecondButton
        isThirdButton={isArchive()}
        firstButtonTooltipText={t(TranslationKey.Edit)}
        firstButtonElement={<EditIcon />}
        firstButtonStyle={ButtonStyle.PRIMARY}
        secondButtonTooltipText={isArchive() ? t(TranslationKey.Restore) : t(TranslationKey['Move to archive'])}
        secondButtonElement={isArchive() ? <ArrowUpOutlineIcon /> : <ArrowDownOutlineIcon />}
        secondButtonStyle={isArchive() ? ButtonStyle.SUCCESS : ButtonStyle.DANGER}
        thirdButtonTooltipText={t(TranslationKey.Remove)}
        thirdButtonElement={<CrossIcon />}
        thirdButtonStyle={ButtonStyle.DANGER}
        secondDescriptionText={
          isArchive()
            ? 'Are you sure you want to restore the tariff?'
            : 'Are you sure you want to move the tariff to the archive?'
        }
        thirdDescriptionText="Are you sure you want to delete the tariff?"
        onClickFirstButton={() => onClickEditTariff(row)}
        onClickSecondButton={() => onTriggerArchive(row)}
        onClickThirdButton={() => onRemoveLogisticTariff(row._id)}
      />
    ),
    width: 140,
    filterable: false,
    sortable: false,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
    renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.createdAt} />,
    width: 115,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.updatedAt} />,
    width: 115,
  },
]

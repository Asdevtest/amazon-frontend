import { MdArrowDropDown, MdArrowDropUp, MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  WarehouseTariffDatesCell,
} from '@components/data-grid/data-grid-cells'
import { DestinationVariationsSpanningCell } from '@components/data-grid/data-grid-spanning-cells/data-grid-spanning-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

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
    renderCell: ({ row }: GridRowModel) => <Text isCell text={row.name} />,
    width: 150,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={row.description} />,
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
    disableCustomSort: true,
  },
  {
    field: 'weight',
    headerName: t(TranslationKey['Weight, kg']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Weight, kg'])} />,
    width: 175,
    filterable: false,
    sortable: false,
    hideable: false,
    disableCustomSort: true,
  },

  {
    field: 'inYuansRates',
    headerName: t(TranslationKey.Rate) + ', ¥',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Rate) + ', ¥'} />,
    width: 88,
    filterable: false,
    sortable: false,
    hideable: false,
    disableCustomSort: true,
  },
  {
    field: 'rates',
    headerName: t(TranslationKey.Rate) + ', $',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Rate) + ', $'} />,
    width: 88,
    filterable: false,
    sortable: false,
    disableCustomSort: true,
  },

  {
    field: 'dates',
    headerName: t(TranslationKey.Dates),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Dates)} />,
    renderCell: ({ row }: GridRowModel) => <WarehouseTariffDatesCell cls={row.cls} etd={row.etd} eta={row.eta} />,
    width: 320,
    filterable: false,
    sortable: false,
    disableCustomSort: true,
  },

  {
    field: 'deliveryTimeInDay',
    headerName: t(TranslationKey['Time on the road, days']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Time on the road, days'])} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={row.deliveryTimeInDay} />,
    width: 110,
    filterable: false,
    sortable: false,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    renderCell: ({ row }: GridRowModel) => (
      <ActionButtonsCell
        row
        showFirst
        showSecond
        thirdDanger
        firstGhost
        secondGhost
        thirdGhost
        firstIcon={<MdOutlineEdit size={16} />}
        secondContent={isArchive() ? <MdArrowDropUp size={16} /> : <MdArrowDropDown size={16} />}
        secondDanger={isArchive()}
        secondDescription={
          isArchive()
            ? 'Are you sure you want to restore the tariff?'
            : 'Are you sure you want to move the tariff to the archive?'
        }
        showThird={isArchive()}
        thirdContent={<MdOutlineDelete size={16} />}
        thirdDescription="Are you sure you want to delete the tariff?"
        onClickFirst={() => onClickEditTariff(row)}
        onClickSecond={() => onTriggerArchive(row)}
        onClickThird={() => onRemoveLogisticTariff(row._id)}
      />
    ),
    width: 140,
    filterable: false,
    sortable: false,
    disableCustomSort: true,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
    renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.createdAt} />,
    width: 115,
    filterable: false,
    sortable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.updatedAt} />,
    width: 115,
    filterable: false,
    sortable: false,
  },
]

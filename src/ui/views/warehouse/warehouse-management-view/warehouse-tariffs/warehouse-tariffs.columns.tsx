import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ScrollingCell,
} from '@components/data-grid/data-grid-cells'
import { CrossIcon, EditIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

interface IWarehouseTariffsColumns {
  onClickEditTariff: (row: any) => void
  onRemoveTariff: (id: string) => void
}

export const warehouseTariffsColumns = ({ onClickEditTariff, onRemoveTariff }: IWarehouseTariffsColumns) => [
  {
    field: 'name',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={row.name} />,
    width: 250,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.updatedAt} />,
    width: 120,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,
    renderCell: ({ row }: GridRowModel) => <ScrollingCell value={row.description} />,
    width: 600,
  },

  {
    field: 'price',
    headerName: t(TranslationKey['Service cost per kg, $']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Service cost per kg, $'])} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={row.price} />,
    width: 250,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
    renderCell: ({ row }: GridRowModel) => (
      <ActionButtonsCell
        row
        iconButton
        isFirstButton
        isSecondButton
        firstButtonTooltipText={t(TranslationKey.Edit)}
        firstButtonElement={<EditIcon />}
        firstButtonStyle={ButtonStyle.PRIMARY}
        secondButtonTooltipText={t(TranslationKey.Remove)}
        secondButtonElement={<CrossIcon />}
        secondButtonStyle={ButtonStyle.DANGER}
        onClickFirstButton={() => onClickEditTariff(row)}
        onClickSecondButton={() => onRemoveTariff(row._id)}
      />
    ),
    width: 100,
    filterable: false,
    sortable: false,
  },
]

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell, MultilineTextHeaderCell, NormDateCell } from '@components/data-grid/data-grid-cells'
import { CrossIcon, EditIcon } from '@components/shared/svg-icons'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { ILogicTariff } from '@typings/shared/logic-tariff'

interface IWarehouseTariffsColumns {
  onClickEditTariff: (row: ILogicTariff) => void
  onRemoveWarehouseTariff: (id: string) => void
}

export const warehouseTariffsColumns = ({ onClickEditTariff, onRemoveWarehouseTariff }: IWarehouseTariffsColumns) => [
  {
    field: 'name',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={row.name} />,
    width: 300,
  },
  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={row.description} />,
    flex: 1,
  },
  {
    field: 'price',
    headerName: t(TranslationKey['Service cost per kg, $']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Service cost per kg, $'])} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={row.price} />,
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
        secondDescriptionText="Are you sure you want to delete the tariff?"
        onClickFirstButton={() => onClickEditTariff(row)}
        onClickSecondButton={() => onRemoveWarehouseTariff(row._id)}
      />
    ),
    width: 100,
    filterable: false,
    sortable: false,
  },
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.updatedAt} />,
    width: 115,
  },
]

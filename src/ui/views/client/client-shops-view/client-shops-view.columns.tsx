import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  TextCell,
} from '@components/data-grid/data-grid-cells'
import { CrossIcon, EditIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { IGridColumn } from '@typings/shared/grid-column'

import { IColumnProps } from './client-shops-view.types'
import { ParsingProfileCell } from './parsing-profile-cell'

export const shopsColumns = ({ onRemoveShop, onEditShop, onConfirmProfile }: IColumnProps) => {
  const columns: IGridColumn[] = [
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.updatedAt} />,
      width: 115,
    },
    {
      field: 'name',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
      renderCell: ({ row }: GridRowModel) => <TextCell text={row.name} />,
      width: 180,
    },
    {
      field: 'profile',
      headerName: t(TranslationKey['Parsing profile']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Parsing profile'])} />,
      renderCell: ({ row }: GridRowModel) => (
        <ParsingProfileCell profile={row.profile} onConfirm={() => onConfirmProfile(row._id)} />
      ),
      width: 200,
    },
    {
      field: 'action',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: ({ row }: GridRowModel) => (
        <ActionButtonsCell
          row
          iconButton
          isFirstButton
          isSecondButton
          firstButtonElement={<EditIcon />}
          firstButtonStyle={ButtonStyle.PRIMARY}
          secondButtonElement={<CrossIcon />}
          secondButtonStyle={ButtonStyle.DANGER}
          secondDescriptionText="Are you sure you want to delete the store?"
          onClickFirstButton={() => onEditShop(row)}
          onClickSecondButton={() => onRemoveShop(row._id)}
        />
      ),
      width: 100,
      filterable: false,
      disableCustomSort: true,
    },
  ]

  for (const column of columns) {
    column.sortable = false
  }

  return columns
}

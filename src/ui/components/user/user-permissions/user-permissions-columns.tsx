import { MdOutlineDelete } from 'react-icons/md'

import { UserRolePrettyMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  TextCell,
} from '@components/data-grid/data-grid-cells'
import { EditIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { IPermission } from '@typings/models/permissions/permission'
import { IPermissionGroup } from '@typings/models/permissions/permission-group'
import { IGridColumn } from '@typings/shared/grid-column'

interface IHandlers {
  onClickRemoveBtn: (row: IPermission | IPermissionGroup) => void
  onClickEditBtn: (row: IPermission | IPermissionGroup) => void
}

export const userPermissionsColumns = (handlers: IHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'key',
      headerName: t(TranslationKey.Key),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Key)} />,
      renderCell: params => <TextCell text={params.value} />,
      width: 280,
    },

    {
      field: 'role',
      headerName: t(TranslationKey.Role),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Role)} />,
      renderCell: params => <TextCell text={UserRolePrettyMap[params.value]} />,
      width: 140,
    },

    {
      field: 'title',
      headerName: t(TranslationKey.Title),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
      renderCell: params => <TextCell text={params.value} />,
      width: 300,
    },

    {
      field: 'description',
      headerName: t(TranslationKey.Description),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,
      renderCell: params => <TextCell text={params.value} />,
      flex: 1,
    },

    {
      field: 'action',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: params => {
        const row = params.row as IPermission | IPermissionGroup

        return (
          <ActionButtonsCell
            row
            iconButton
            isFirstButton
            isSecondButton
            firstButtonElement={<EditIcon />}
            firstButtonStyle={ButtonStyle.PRIMARY}
            secondButtonElement={<MdOutlineDelete size={18} />}
            secondButtonStyle={ButtonStyle.DANGER}
            onClickFirstButton={() => handlers.onClickEditBtn(row)}
            onClickSecondButton={() => handlers.onClickRemoveBtn(row)}
          />
        )
      },
      filterable: false,
      sortable: false,
      width: 100,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 110,
    },
  ]

  return columns
}

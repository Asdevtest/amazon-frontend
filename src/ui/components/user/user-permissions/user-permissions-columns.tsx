import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'

import { UserRolePrettyMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell, MultilineTextHeaderCell, NormDateCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

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
      renderCell: params => <Text isCell text={params.value} />,
      width: 280,
    },

    {
      field: 'role',
      headerName: t(TranslationKey.Role),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Role)} />,
      renderCell: params => <Text isCell text={UserRolePrettyMap[params.value]} />,
      width: 140,
    },

    {
      field: 'title',
      headerName: t(TranslationKey.Title),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 300,
    },

    {
      field: 'description',
      headerName: t(TranslationKey.Description),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,
      renderCell: params => <Text isCell text={params.value} />,
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
            showFirst
            showSecond
            secondDanger
            firstGhost
            secondGhost
            firstIcon={<MdOutlineEdit size={16} />}
            secondIcon={<MdOutlineDelete size={16} />}
            onClickFirst={() => handlers.onClickEditBtn(row)}
            onClickSecond={() => handlers.onClickRemoveBtn(row)}
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

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { UserRole, UserRolePrettyMap, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductVariationsCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'
import { TextWithCopy } from '@components/shared/text-with-copy'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const adminUsersViewColumns = handlers => {
  const columns = [
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Updated)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      columnKey: columnnsKeys.shared.DATE,
      width: 100,
    },

    {
      field: 'isOnline',
      headerName: t(TranslationKey.Online),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Online)} />,

      renderCell: params => <UserMiniCell userId={params?.id} isOnline={params?.row?.isOnline} />,
      width: 90,
      filterable: false,
    },

    {
      field: 'name',
      headerName: t(TranslationKey.Name),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Name)} />,
      columnKey: columnnsKeys.shared.STRING,
      width: 150,
    },

    {
      field: 'balance',
      headerName: t(TranslationKey.Balance),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Balance)} />,

      renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value)} />,
      width: 100,
      columnKey: columnnsKeys.shared.STRING,
      type: 'number',
    },

    {
      field: 'balanceFreeze',
      headerName: t(TranslationKey.Freeze),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Freeze)} />,

      renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value)} />,
      width: 120,
      columnKey: columnnsKeys.shared.STRING,
      type: 'number',
    },

    {
      field: 'email',
      headerName: t(TranslationKey.Email),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Email)} />,
      renderCell: ({ row }) => <TextWithCopy text={row.email} />,
      columnKey: columnnsKeys.shared.STRING,
      width: 200,
    },

    {
      field: 'rate',
      headerName: t(TranslationKey.Rate),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Rate)} />,

      renderCell: params => <MultilineTextCell text={params.value} />,
      width: 100,
      columnKey: columnnsKeys.shared.STRING,
      type: 'number',
    },

    {
      field: 'role',
      headerName: t(TranslationKey.Role),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Role)} />,

      renderCell: ({ row }) => <MultilineTextCell text={UserRolePrettyMap[row?.role]} />,
      width: 150,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'active',
      headerName: t(TranslationKey['User status']),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey['User status'])} />,

      renderCell: ({ row }) => <MultilineTextCell text={row?.active ? 'Active' : 'Banned'} />,
      columnKey: columnnsKeys.shared.STRING,
      width: 160,
    },

    {
      field: 'isSubUser',
      headerName: t(TranslationKey['Sub status']),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey['Sub status'])} />,

      renderCell: params => <ProductVariationsCell showVariationButton isParentProduct={params?.row?.sub} />,
      columnKey: columnnsKeys.shared.STRING,
      width: 120,
    },

    {
      field: 'actions',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Actions)} />,

      renderCell: params => (
        <ActionButtonsCell
          isFirstButton
          disabledFirstButton={params.row?.originalData?.role === mapUserRoleEnumToKey[UserRole.ADMIN]}
          firstButtonElement={t(TranslationKey['Edit and balance'])}
          firstButtonStyle={ButtonStyle.PRIMARY}
          onClickFirstButton={() => handlers.onClickUser(params.row)}
        />
      ),
      filterable: false,
      sortable: false,
      width: 150,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.USERS
    }
    column.sortable = false
  }

  return columns
}

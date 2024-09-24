import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { UserRole, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { userRoleTranslateKey, userStatusTranslateKey, userSubStatusTranlateKey } from '@constants/statuses/user-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductVariationsCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const adminUsersViewColumns = handlers => {
  const columns = [
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      columnKey: columnnsKeys.shared.DATE,
      width: 100,
    },

    {
      field: 'isOnline',
      headerName: t(TranslationKey.Online),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Online)} />,

      renderCell: params => <UserCell id={params?.id} />,
      width: 90,
      filterable: false,
    },

    {
      field: 'name',
      headerName: t(TranslationKey.Name),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Name)} />,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      width: 150,
    },

    {
      field: 'balance',
      headerName: t(TranslationKey.Balance),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Balance)} />,

      renderCell: params => <Text isCell text={toFixedWithDollarSign(params.value)} />,
      width: 100,
      columnKey: columnnsKeys.shared.NUMBER,
      transformValueMethod: balance => toFixedWithDollarSign(balance),
    },

    {
      field: 'balanceFreeze',
      headerName: t(TranslationKey.Freeze),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Freeze)} />,

      renderCell: params => <Text isCell text={toFixedWithDollarSign(params.value)} />,
      width: 120,
      columnKey: columnnsKeys.shared.NUMBER,
      transformValueMethod: balance => toFixedWithDollarSign(balance),
    },

    {
      field: 'email',
      headerName: t(TranslationKey.Email),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Email)} />,
      renderCell: ({ row }) => <Text isCell text={row.email} />,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      width: 200,
    },

    {
      field: 'rate',
      headerName: t(TranslationKey.Rate),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Rate)} />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 100,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'role',
      headerName: t(TranslationKey.Role),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Role)} />,

      renderCell: ({ row }) => <Text isCell text={userRoleTranslateKey(row?.role)} />,
      width: 150,
      transformValueMethod: userRoleTranslateKey,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'active',
      headerName: t(TranslationKey['User status']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['User status'])} />,

      renderCell: ({ row }) => <Text isCell text={userStatusTranslateKey(row?.active)} />,
      transformValueMethod: userStatusTranslateKey,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      width: 160,
    },

    {
      field: 'sub',
      headerName: t(TranslationKey['Sub status']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Sub status'])} />,

      renderCell: params => (
        <ProductVariationsCell showVariationButton isParentProduct={!params?.row?.sub} isTooltipVisible={false} />
      ),
      transformValueMethod: userSubStatusTranlateKey,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      width: 120,
    },

    {
      field: 'actions',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

      renderCell: params => (
        <ActionButtonsCell
          showFirst
          firstDisabled={params.row?.originalData?.role === mapUserRoleEnumToKey[UserRole.ADMIN]}
          firstContent={t(TranslationKey['Edit and balance'])}
          onClickFirst={() => handlers.onClickUser(params.row)}
        />
      ),
      filterable: false,
      sortable: false,
      disableCustomSort: true,
      width: 205,
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

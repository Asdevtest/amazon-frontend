import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { userRoleTranslateKey, userStatusTranslateKey, userSubStatusTranlateKey } from '@constants/statuses/user-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductVariationsCell,
  TextCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'
import { TextWithCopy } from '@components/shared/text-with-copy'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { Roles } from '@typings/enums/roles'

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
      columnKey: columnnsKeys.shared.STRING_VALUE,
      width: 150,
    },

    {
      field: 'balance',
      headerName: t(TranslationKey.Balance),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Balance)} />,

      renderCell: params => <TextCell text={toFixedWithDollarSign(params.value)} />,
      width: 100,
      columnKey: columnnsKeys.shared.NUMBER,
      transformValueMethod: balance => toFixedWithDollarSign(balance),
    },

    {
      field: 'balanceFreeze',
      headerName: t(TranslationKey.Freeze),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Freeze)} />,

      renderCell: params => <TextCell text={toFixedWithDollarSign(params.value)} />,
      width: 120,
      columnKey: columnnsKeys.shared.NUMBER,
      transformValueMethod: balance => toFixedWithDollarSign(balance),
    },

    {
      field: 'email',
      headerName: t(TranslationKey.Email),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Email)} />,
      renderCell: ({ row }) => <TextWithCopy text={row.email} justifyContent={'flex-end'} />,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      width: 200,
    },

    {
      field: 'rate',
      headerName: t(TranslationKey.Rate),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Rate)} />,

      renderCell: params => <TextCell text={params.value} />,
      width: 100,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'role',
      headerName: t(TranslationKey.Role),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Role)} />,

      renderCell: ({ row }) => <TextCell text={userRoleTranslateKey(row?.role)} />,
      width: 150,
      transformValueMethod: userRoleTranslateKey,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'active',
      headerName: t(TranslationKey['User status']),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey['User status'])} />,

      renderCell: ({ row }) => <TextCell text={userStatusTranslateKey(row?.active)} />,
      transformValueMethod: userStatusTranslateKey,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      width: 160,
    },

    {
      field: 'sub',
      headerName: t(TranslationKey['Sub status']),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey['Sub status'])} />,

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
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Actions)} />,

      renderCell: params => (
        <ActionButtonsCell
          isFirstButton
          disabledFirstButton={params.row?.originalData?.role === Roles.ADMIN}
          firstButtonElement={t(TranslationKey['Edit and balance'])}
          firstButtonStyle={ButtonStyle.PRIMARY}
          onClickFirstButton={() => handlers.onClickUser(params.row)}
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

import React from 'react'

import { mapUserRoleEnumToKey, UserRole } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateCell,
  MultilineTextCell,
  NormalActionBtnCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

export const adminUsersViewColumns = handlers => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    width: 150,
    // type: 'date',
  },

  {
    field: 'name',
    headerName: t(TranslationKey.Name),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Name)} />,
    width: 150,
  },
  {
    field: 'balance',
    headerName: t(TranslationKey.Balance),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Balance)} />,

    renderCell: params => <MultilineTextCell text={toFixed(params.value, 2)} />,
    width: 150,
    type: 'number',
  },

  {
    field: 'balanceFreeze',
    headerName: t(TranslationKey.Freeze),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Freeze)} />,

    renderCell: params => <MultilineTextCell text={toFixed(params.value, 2)} />,
    width: 150,
    type: 'number',
  },

  {
    field: 'email',
    headerName: t(TranslationKey.Email),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Email)} />,
    width: 200,
  },

  {
    field: 'rate',
    headerName: t(TranslationKey.Rate),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Rate)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
    type: 'number',
  },

  {
    field: 'role',
    headerName: t(TranslationKey.Role),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Role)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 150,
  },

  {
    field: 'active',
    headerName: t(TranslationKey['User status']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['User status'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 160,
  },

  {
    field: 'isSubUser',
    headerName: t(TranslationKey['Sub status']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Sub status'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: params => (
      <NormalActionBtnCell
        disabled={params.row.originalData.role === mapUserRoleEnumToKey[UserRole.ADMIN]}
        bTnText={t(TranslationKey['Edit and balance'])}
        onClickOkBtn={() => handlers.onClickUser(params.row.originalData)}
      />
    ),

    width: 270,
    filterable: false,
    sortable: false,
  },
]

import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  AdminUsersActionBtnsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  MultilineTextCell,
} from '@components/data-grid-cells/data-grid-cells'

import {toFixed} from '@utils/text'
import {t} from '@utils/translations'

export const adminUsersViewColumns = handlers => [
  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell params={params} />,
    width: 130,
    type: 'date',
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
    width: 100,
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
    width: 140,
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
      <AdminUsersActionBtnsCell
        editBtnText={t(TranslationKey['Edit user'])}
        balanceBtnText={t(TranslationKey.Balance)}
        handlers={handlers}
        row={params.row.originalData}
      />
    ),
    width: 270,
    filterable: false,
    sortable: false,
  },
]

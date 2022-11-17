import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  NormDateFromUnixCell,
  TaskDescriptionCell,
  NormalActionBtnCell,
  UserLinkCell,
  TaskTypeCell,
  MultilineTextHeaderCell,
  TaskStatusCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const adminTasksViewColumns = handlers => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    width: 110,
    renderCell: params => <NormDateFromUnixCell value={params.value} />,
    type: 'date',
  },

  {
    field: 'operationType',
    headerName: t(TranslationKey.Type),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Type)} />,

    width: 155,
    renderCell: params => <TaskTypeCell task={params.row.originalData} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,

    width: 850,
    renderCell: params => <TaskDescriptionCell task={params.row.originalData} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey.Storekeeper),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Storekeeper)} />,

    width: 180,
    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.storekeeper?._id} />
    ),
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 190,
    renderCell: params => (
      <NormalActionBtnCell
        bTnText={t(TranslationKey['View more'])}
        onClickOkBtn={() => handlers.setCurrentOpenedTask(params.row.originalData)}
      />
    ),
    filterable: false,
    sortable: false,
  },
  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    width: 130,
    renderCell: params => <TaskStatusCell status={params.value} />,
  },
]

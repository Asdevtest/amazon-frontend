import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateFromUnixCell,
  NormalActionBtnCell,
  TaskDescriptionCell,
  TaskStatusCell,
  TaskTypeCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const adminTasksViewColumns = handlers => [
  {
    field: 'operationType',
    headerName: t(TranslationKey.Type),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Type)} />,

    width: 180,
    renderCell: params => <TaskTypeCell operationType={params.value} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,

    width: 330,
    renderCell: params => <TaskDescriptionCell task={params.row} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey.Storekeeper),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Storekeeper)} />,

    width: 180,
    align: 'center',
    renderCell: params => <UserLinkCell blackText name={params.value.name} userId={params.value?._id} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 190,
    align: 'center',
    renderCell: params => (
      <NormalActionBtnCell
        bTnText={t(TranslationKey.Details)}
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
    align: 'center',
    renderCell: params => <TaskStatusCell status={params.value} />,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    width: 110,
    renderCell: params => <NormDateFromUnixCell value={params.value} />,
  },
]

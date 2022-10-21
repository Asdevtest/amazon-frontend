import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormalActionBtnCell,
  PhotoAndFilesCell,
  UserLinkCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const adminFeedbackViewColumns = handlers => [
  {
    field: 'userName',
    headerName: t(TranslationKey.User),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.User)} />,
    renderCell: params => (
      <UserLinkCell blackText name={params.row.originalData.user.name} userId={params.row.originalData.user._id} />
    ),
    width: 240,
  },
  {
    field: 'text',
    headerName: t(TranslationKey.Reviews),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Reviews)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 820,
  },
  {
    field: 'media',
    headerName: t(TranslationKey.Files),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Files)} />,
    renderCell: params => <PhotoAndFilesCell files={params.value} />,
    width: 350,
  },
  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 180,
    renderCell: params => (
      <NormalActionBtnCell
        bTnText={t(TranslationKey.Reply)}
        // isFirstRow={firstRowId === params.row.id}
        onClickOkBtn={() => handlers.onClickWriteBtn(params.row.originalData.user._id)}
      />
    ),
  },
]

/* eslint-disable no-unused-vars */
import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ShortDateCell,
  MultilineTextHeaderCell,
  MultilineTextCell,
  UserMiniCell,
  AsinCell,
  EditOrRemoveIconBtnsCell,
  CopyAndEditLinkCell,
  ChangeInputCommentCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const sourceFilesColumns = (rowHandlers, getEditField) => [
  {
    field: 'title',
    headerName: t(TranslationKey['Request title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
    renderCell: params => <MultilineTextCell text={params.value || '-'} />,
    width: 205,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: params => <MultilineTextCell text={params.value || '-'} />,
    width: 50,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <ShortDateCell value={params.value} />,
    width: 97,
    // type: 'date',
  },

  {
    field: 'performer',
    headerName: t(TranslationKey.Performer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Performer)} />,
    width: 137,
    renderCell: params => {
      const user = params.row.sub ? params.row.sub : params.row.performer

      return <UserMiniCell userName={user?.name} userId={user?._id} />
    },
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
    width: 137,
    renderCell: params => <UserMiniCell userName={params.row.client?.name} userId={params.row.client?._id} />,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
    width: 128,
    renderCell: params => <AsinCell asin={params.value} />,
  },

  {
    field: 'sourceFile',
    headerName: t(TranslationKey.Link),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Link)} />,
    width: 239,
    renderCell: params => (
      <CopyAndEditLinkCell
        link={params.value}
        isEdit={params?.row?.originalData?._id === getEditField()?._id}
        onChangeText={rowHandlers.onChangeText}
      />
    ),
  },

  {
    field: 'comments',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
    width: 239,
    // renderCell: params => (
    //   <ChangeInputCommentCell
    //     text={params?.value}
    //     disabled={params?.row?.originalData?._id !== getEditField()?._id}
    //     onChangeText={rowHandlers.onChangeText}
    //   />
    // ),
    renderCell: params => (
      <ChangeInputCommentCell
        rowsCount={2}
        text={params.row.originalData.reason}
        id={params.row.originalData._id}
        onClickSubmit={rowHandlers.onChangeText}
      />
    ),
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    width: 510,
    renderCell: params => (
      <EditOrRemoveIconBtnsCell
        tooltipFirstButton={t(TranslationKey['Change store name or links to reports'])}
        tooltipSecondButton={t(TranslationKey['Remove a store from your list'])}
        handlers={rowHandlers}
        row={params.row}
        isSave={params?.row?.originalData?._id === getEditField()?._id}
      />
    ),

    filterable: false,
    sortable: false,
  },
]

/* eslint-disable no-unused-vars */
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React from 'react'

import {freelanceRequestTypeByCode, freelanceRequestTypeTranslate} from '@constants/freelance-request-type'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  ShortDateCell,
  MultilineTextHeaderCell,
  MultilineTextCell,
  MultilineRequestStatusCell,
  UserMiniCell,
  NormalActionBtnCell,
  AsinCell,
  VacantRequestPriceCell,
  EditOrRemoveIconBtnsCell,
  ScrollingLinkCell,
  CopyAndEditLinkCell,
  ChangeInputCommentCell,
} from '@components/data-grid-cells/data-grid-cells'

import {timeToDeadlineInDaysAndHours, toFixed, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

export const sourceFilesColumns = (rowHandlers, languageTag, editField) => [
  // {
  //   field: 'title2',
  //   headerName: t(TranslationKey.Title),
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
  //   renderCell: params => console.log('params', params),
  //   width: 205,
  // },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
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
    renderCell: params => <ShortDateCell params={params} />,
    width: 97,
    type: 'date',
  },

  {
    field: 'performer',
    headerName: t(TranslationKey.Performer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Performer)} />,
    width: 137,
    renderCell: params => <UserMiniCell user={params.row.sub ? params.row.sub : params.row.performer} />,
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
    width: 137,
    renderCell: params => <UserMiniCell user={params.row.client} />,
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
        isEdit={params?.row?.originalData?._id === editField?._id}
        onChangeText={rowHandlers.onChangeText}
      />
    ),
  },

  {
    field: 'comment',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
    width: 239,
    renderCell: params => (
      <ChangeInputCommentCell text={params?.value} disabled={params?.row?.originalData?._id !== editField?._id} />
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
        isSave={params?.row?.originalData?._id === editField?._id}
      />
    ),

    filterable: false,
    sortable: false,
  },
]

import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateCell,
  MultilineTextCell,
  SmallRowImageCell,
  SuccessActionBtnCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
  MultilineStatusCell,
} from '@components/data-grid-cells/data-grid-cells'

import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

export const clientExchangeViewColumns = (handlers, firstRowId) => [
  {
    field: 'image',
    headerName: t(TranslationKey.Image),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Image)} />,

    width: 100,
    renderCell: params => <SmallRowImageCell images={params.row.images} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell params={params} />,
    minWidth: 120,
    type: 'date',
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,

    renderCell: params => <MultilineStatusCell status={params.value} />,

    width: 120,
  },

  {
    field: 'category',
    headerName: t(TranslationKey.Category),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Category)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 140,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 110,
    type: 'number',
  },

  {
    field: 'weight',
    headerName: t(TranslationKey.Weight),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Weight)} />,

    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    width: 90,
    type: 'number',
  },

  {
    field: 'bsr',
    headerName: t(TranslationKey.BSR),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 70,
    type: 'number',
  },

  {
    field: 'fbaamount',
    headerName: t(TranslationKey['Recommend amount']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Recommend amount'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 130,
    type: 'number',
  },

  {
    field: 'researcherName',
    headerName: t(TranslationKey.Researcher),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Researcher)} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.createdBy?._id} />
    ),
    width: 170,
  },

  {
    field: 'buyerName',
    headerName: t(TranslationKey.Buyer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Buyer)} />,

    renderCell: params => <UserLinkCell blackText name={params.value} userId={params.row.originalData.buyer?._id} />,
    width: 170,
  },

  {
    field: 'supervisorName',
    headerName: t(TranslationKey.Supervisor),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supervisor)} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.checkedBy?._id} />
    ),
    width: 170,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 190,
    renderCell: params => (
      <SuccessActionBtnCell
        tooltipText={t(TranslationKey['Purchase a product card'])}
        bTnText={`${t(TranslationKey['Buy for'])} ${toFixedWithDollarSign(params.row.originalData.priceForClient, 2)}`}
        isFirstRow={firstRowId === params.row.id}
        onClickOkBtn={() => handlers.onClickLaunchPrivateLabelBtn(params.row.originalData)}
      />
    ),
    filterable: false,
    sortable: false,
  },
]

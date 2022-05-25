import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  NormDateCell,
  renderFieldValueCell,
  SmallRowImageCell,
  SuccessActionBtnCell,
  ToFixedWithDollarSignCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
} from '@components/data-grid-cells/data-grid-cells'

import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

export const clientExchangeViewColumns = handlers => [
  {
    field: 'image',
    headerName: t(TranslationKey.Image),
    width: 80,
    renderCell: params => <SmallRowImageCell images={params.row.images} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderCell: params => <NormDateCell params={params} />,
    minWidth: 110,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderCell: params => <NormDateCell params={params} />,
    minWidth: 110,
    type: 'date',
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderCell: params => renderFieldValueCell(params.value),
    width: 210,
  },

  {
    field: 'category',
    headerName: t(TranslationKey.Category),
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 120,
    type: 'number',
  },

  {
    field: 'weight',
    headerName: t(TranslationKey.Weight),
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    width: 80,
    type: 'number',
  },

  {
    field: 'bsr',
    headerName: t(TranslationKey.BSR),
    renderCell: params => renderFieldValueCell(params.value),
    width: 60,
    type: 'number',
  },

  {
    field: 'fbaamount',
    headerName: t(TranslationKey['Recommend amount']),
    renderCell: params => renderFieldValueCell(params.value),
    width: 90,
    type: 'number',
  },

  {
    field: 'researcherName',
    headerName: t(TranslationKey.Researcher),
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.createdBy?._id} />,
    width: 120,
  },

  {
    field: 'buyerName',
    headerName: t(TranslationKey.Buyer),
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.buyer?._id} />,
    width: 120,
  },

  {
    field: 'supervisorName',
    headerName: t(TranslationKey.Supervisor),
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.checkedBy?._id} />,
    width: 120,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    width: 190,
    renderCell: params => (
      <SuccessActionBtnCell
        bTnText={`${t(TranslationKey['Buy for'])} ${toFixedWithDollarSign(params.row.originalData.priceForClient, 2)}`}
        onClickOkBtn={() => handlers.onClickLaunchPrivateLabelBtn(params.row.originalData)}
      />
    ),
    filterable: false,
    sortable: false,
  },
]

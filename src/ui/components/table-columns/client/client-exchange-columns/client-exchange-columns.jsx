import React from 'react'

import {texts} from '@constants/texts'

import {
  NormDateCell,
  renderFieldValueCell,
  SmallRowImageCell,
  SuccessActionBtnCell,
  ToFixedWithDollarSignCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign} from '@utils/text'

const textConsts = getLocalizedTexts(texts, 'ru').clientExchangeTableColumns

export const clientExchangeViewColumns = handlers => [
  {
    field: 'image',
    headerName: textConsts.imageField,
    width: 80,
    renderCell: params => <SmallRowImageCell images={params.row.images} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    renderCell: params => <NormDateCell params={params} />,
    minWidth: 110,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: textConsts.updateDateField,
    renderCell: params => <NormDateCell params={params} />,
    minWidth: 110,
    type: 'date',
  },

  {
    field: 'strategyStatus',
    headerName: textConsts.strategyStatusField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },

  {
    field: 'category',
    headerName: textConsts.categoryField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'amazon',
    headerName: textConsts.priceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 120,
    type: 'number',
  },

  {
    field: 'weight',
    headerName: textConsts.weightField,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    width: 80,
    type: 'number',
  },

  {
    field: 'bsr',
    headerName: textConsts.bsrField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 60,
    type: 'number',
  },

  {
    field: 'fbaamount',
    headerName: textConsts.fbaamountField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 90,
    type: 'number',
  },

  {
    field: 'researcherName',
    headerName: textConsts.researcherField,
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.createdBy?._id} />,
    width: 170,
  },

  {
    field: 'buyerName',
    headerName: textConsts.buyerField,
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.buyer?._id} />,
    width: 170,
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 190,
    renderCell: params => (
      <SuccessActionBtnCell
        bTnText={`${textConsts.byForBtn} ${toFixedWithDollarSign(params.row.originalData.priceForClient, 2)}`}
        onClickOkBtn={() => handlers.onClickLaunchPrivateLabelBtn(params.row.originalData)}
      />
    ),
    filterable: false,
    sortable: false,
  },
]

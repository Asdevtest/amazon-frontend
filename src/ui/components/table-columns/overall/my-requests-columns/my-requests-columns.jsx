import React from 'react'

import {texts} from '@constants/texts'

import {
  MultilineRequestStatusCell,
  MultilineTextCell,
  NormDateCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').myRequestsTableColumns

export const myRequestsViewColumns = () => [
  {
    field: 'status',
    headerName: textConsts.statusField,
    renderCell: params => <MultilineRequestStatusCell status={params.value} />,
    width: 150,
  },

  {
    field: 'title',
    headerName: textConsts.nameRequestField,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 200,
  },

  {
    field: 'price',
    headerName: textConsts.price,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 150,
  },

  {
    field: 'timeoutAt',
    headerName: textConsts.deadline,
    renderCell: params => <NormDateCell params={params} />,
    width: 130,
    type: 'date',
  },

  {
    field: 'offerCount',
    headerName: textConsts.offerCount,
    renderCell: params => renderFieldValueCell(params.value),
    width: 170,
  },

  {
    field: 'offerAwaits',
    headerName: textConsts.offerAwaits,
    renderCell: params => renderFieldValueCell(params.value),
    width: 170,
  },

  {
    field: 'offersInWork',
    headerName: textConsts.offersInWork,
    renderCell: params => renderFieldValueCell(params.value),
    width: 170,
  },

  {
    field: 'offersWaitCheck',
    headerName: textConsts.offersWaitCheck,
    renderCell: params => renderFieldValueCell(params.value),
    width: 170,
  },

  {
    field: 'offersAccept',
    headerName: textConsts.offersAccept,
    renderCell: params => renderFieldValueCell(params.value),
    width: 170,
  },
]

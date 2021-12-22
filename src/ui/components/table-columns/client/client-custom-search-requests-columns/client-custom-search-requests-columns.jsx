import React from 'react'

import {RequestStatus} from '@constants/request-status'
import {texts} from '@constants/texts'

import {
  EditOrRemoveBtnsCell,
  NormDateCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').clientSearchRequestsTableColumns

const allowEditStatuses = [RequestStatus.CREATED, RequestStatus.TO_CORRECT]

export const clientCustomSearchRequestsViewColumns = handlers => [
  {
    field: 'tmpCreatedAt',
    headerName: textConsts.createDateField,
    renderCell: params => <NormDateCell params={params} />,
    width: 130,
    type: 'date',
  },
  {
    field: 'tmpDirection',
    headerName: textConsts.directionField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 100,
  },

  {
    field: 'tmpStatus',
    headerName: textConsts.statusField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'tmpName',
    headerName: textConsts.nameRequestField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'tmpMaxAmountOfProposals',
    headerName: textConsts.maxAmountOfProposalsField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 120,
    type: 'number',
  },

  {
    field: 'tmpPrice',
    headerName: textConsts.priceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 150,
    type: 'number',
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 250,
    renderCell: params => (
      <EditOrRemoveBtnsCell
        handlers={handlers}
        row={params.row}
        disableEditBtn={!allowEditStatuses.includes(params.row.request.status)}
      />
    ),
    filterable: false,
    sortable: false,
  },
]

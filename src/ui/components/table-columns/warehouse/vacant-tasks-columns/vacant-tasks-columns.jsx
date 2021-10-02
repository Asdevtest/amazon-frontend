import React from 'react'

import {texts} from '@constants/texts'

import {
  NormDateCell,
  TaskDescriptionCell,
  TaskStatusCell,
  renderFieldValueCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseVacantTasksTableColumns

export const warehouseVacantTasksViewColumns = renderBtns => [
  {
    field: 'createDate',
    headerName: textConsts.createDateField,
    width: 250,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'updateDate',
    headerName: textConsts.updateDateField,
    width: 250,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'tmpOperationType',
    headerName: textConsts.typeField,
    width: 250,
    renderCell: params => renderFieldValueCell(params.row.tmpOperationType),
  },

  {
    field: 'description',
    headerName: textConsts.descriptionField,
    width: 400,
    renderCell: params => <TaskDescriptionCell hideImage params={params} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 250,
    renderCell: params => renderBtns(params),
    filterable: false,
    sortable: false,
  },
  {
    field: 'status',
    headerName: textConsts.statusField,
    width: 250,
    renderCell: params => <TaskStatusCell params={params} />,
    filterable: false,
    sortable: false,
  },
]

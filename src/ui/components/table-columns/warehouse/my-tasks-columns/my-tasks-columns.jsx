import React from 'react'

import {texts} from '@constants/texts'

import {
  NormDateFromUnixCell,
  TaskDescriptionCell,
  renderFieldValueCell,
  WarehouseMyTasksBtnsCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseMyTasksTableColumns

export const warehouseMyTasksViewColumns = handlers => [
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    width: 250,
    renderCell: params => <NormDateFromUnixCell value={params.value} />,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: textConsts.updateDateField,
    width: 250,
    renderCell: params => <NormDateFromUnixCell value={params.value} />,
    type: 'date',
  },

  {
    field: 'operationType',
    headerName: textConsts.typeField,
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'description',
    headerName: textConsts.descriptionField,
    width: 400,
    renderCell: params => <TaskDescriptionCell task={params.row.originalData} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 250,

    renderCell: params => <WarehouseMyTasksBtnsCell handlers={handlers} row={params.row.originalData} />,
    filterable: false,
    sortable: false,
  },
  {
    field: 'status',
    headerName: textConsts.statusField,
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
    filterable: false,
    sortable: false,
  },
]

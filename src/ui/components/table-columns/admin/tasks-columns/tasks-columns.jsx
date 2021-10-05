import React from 'react'

import {texts} from '@constants/texts'

import {
  NormDateCell,
  TaskDescriptionCell,
  renderFieldValueCell,
  NormalActionBtnCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').adminTasksTableColumns

export const adminTasksViewColumns = handlers => [
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    width: 250,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'updatedAt',
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
    renderCell: params => <TaskDescriptionCell params={params} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 250,
    renderCell: params => (
      <NormalActionBtnCell
        bTnText={textConsts.actionBtn}
        onClickOkBtn={() => handlers.setCurrentOpenedTask(params.row)}
      />
    ),
    filterable: false,
    sortable: false,
  },
  {
    field: 'tmpStatus',
    headerName: textConsts.statusField,
    width: 250,
    renderCell: params => renderFieldValueCell(params.row.tmpStatus),
  },
]

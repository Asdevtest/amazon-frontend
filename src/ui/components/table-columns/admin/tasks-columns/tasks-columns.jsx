import React from 'react'

import {texts} from '@constants/texts'

import {
  NormDateCell,
  TaskTypeCell,
  TaskDescriptionCell,
  TaskStatusCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').adminTasksTableColumns

export const adminTasksViewColumns = renderBtns => [
  {
    field: 'createDate',
    headerName: textConsts.createDateField,
    width: 250,
    renderCell: params => <NormDateCell params={params} />,
  },

  {
    field: 'updateDate',
    headerName: textConsts.updateDateField,
    width: 250,
    renderCell: params => <NormDateCell params={params} />,
  },

  {
    field: 'operationType',
    headerName: textConsts.typeField,
    width: 250,
    renderCell: params => <TaskTypeCell params={params} />,
  },
  {
    field: 'description',
    headerName: textConsts.descriptionField,
    width: 400,
    renderCell: params => <TaskDescriptionCell params={params} />,
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 250,
    renderCell: params => renderBtns(params),
  },
  {
    field: 'status',
    headerName: textConsts.statusField,
    width: 250,
    renderCell: params => <TaskStatusCell params={params} />,
  },
]

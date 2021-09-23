import React from 'react'

import {TaskOperationType} from '@constants/task-operation-type'
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
    field: 'operationType',
    headerName: textConsts.typeField,
    width: 250,
    renderCell: params => <TaskTypeCell params={params} />,
    valueParser: value => {
      switch (value) {
        case textConsts.operatioTypeMerge:
          return TaskOperationType.MERGE.toString()

        case textConsts.operatioTypeSplit:
          return TaskOperationType.SPLIT.toString()

        case textConsts.operatioTypeReceive:
          return TaskOperationType.RECEIVE.toString()

        case textConsts.operatioTypeEdit:
          return TaskOperationType.EDIT.toString()

        default:
          return value
      }
    },
  },
  {
    field: 'description',
    headerName: textConsts.descriptionField,
    width: 400,
    renderCell: params => <TaskDescriptionCell params={params} />,
    filterable: false,
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 250,
    renderCell: params => renderBtns(params),
    filterable: false,
  },
  {
    field: 'status',
    headerName: textConsts.statusField,
    width: 250,
    renderCell: params => <TaskStatusCell params={params} />,
    filterable: false,
    //   valueParser: value => {
    //     switch (value.toUpperCase()) {
    //     case TaskStatus.NEW:

    //       console.log('mapTaskStatusEmumToKey[TaskStatus.NEW].toString()', mapTaskStatusEmumToKey[TaskStatus.NEW].toString())
    //       return (+mapTaskStatusEmumToKey[TaskStatus.NEW]).toString() // ФИЛЬТР НЕ ВОСПРИНИМАЕТ НОЛЬ(( НЕ НАШЕЛ РЕШЕНИЕ

    //     case TaskStatus.AT_PROCESS:
    //       return mapTaskStatusEmumToKey[TaskStatus.AT_PROCESS].toString()

    //     case TaskStatus.SOLVED:
    //       return mapTaskStatusEmumToKey[TaskStatus.SOLVED].toString()

    //     case TaskStatus.NOT_SOLVED:
    //       return mapTaskStatusEmumToKey[TaskStatus.NOT_SOLVED].toString()

    //     default:
    //       return value
    //     }
    //   },
  },
]

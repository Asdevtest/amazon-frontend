import React from 'react'

import {
  colorByTaskPriorityStatus,
  mapTaskPriorityStatusEnum,
  taskPriorityStatusTranslate,
} from '@constants/task/task-priority-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateFromUnixCell,
  NormalActionBtnCell,
  StringListCell,
  TaskDescriptionCell,
  TaskTypeCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { t } from '@utils/translations'

export const warehouseCompletedTasksViewColumns = handlers => [
  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: window.innerWidth < 1282 ? 118 : 190,
    renderCell: params => (
      <NormalActionBtnCell
        isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
        tooltipText={t(TranslationKey['Open the window with task information'])}
        bTnText={t(TranslationKey.View)}
        onClickOkBtn={() => handlers.setCurrentOpenedTask(params.row.originalData)}
      />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'operationType',
    headerName: t(TranslationKey.Type),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Type)} />,

    width: window.innerWidth < 1282 ? 125 : 180,
    renderCell: params => <TaskTypeCell operationType={params.row.originalData.operationType} />,
  },

  {
    field: 'priority',
    headerName: t(TranslationKey.Priority),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Priority)} />,

    width: window.innerWidth < 1282 ? 115 : 170,
    renderCell: params => (
      <MultilineTextCell
        color={colorByTaskPriorityStatus(mapTaskPriorityStatusEnum[params.value])}
        text={taskPriorityStatusTranslate(mapTaskPriorityStatusEnum[params.value])}
      />
    ),
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,

    // width: window.innerWidth < 1282 ? 338 : 850,
    width: 290,
    renderCell: params => <TaskDescriptionCell task={params.row.originalData} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'asin',
    headerName: 'ASIN',
    renderHeader: () => <MultilineTextHeaderCell text={'ASIN'} />,

    renderCell: params => <AsinOrSkuLink withCopyValue asin={params.value} />,
    width: window.innerWidth < 1282 ? 101 : 160,
    sortable: false,
  },

  {
    field: 'trackNumber',
    headerName: t(TranslationKey['Track number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Track number'])} />,

    renderCell: params => (
      <StringListCell withCopy maxItemsDisplay={4} maxLettersInItem={10} sourceString={params.value} />
    ),
    width: window.innerWidth < 1282 ? 85 : 160,
    sortable: false,
  },

  {
    field: 'orderId',
    headerName: t(TranslationKey['Order number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Order number'])} />,

    renderCell: params => <StringListCell maxItemsDisplay={4} maxLettersInItem={10} sourceString={params.value} />,
    type: 'number',
    align: 'center',
    width: window.innerWidth < 1282 ? 75 : 160,
    sortable: false,
  },

  {
    field: 'item',
    headerName: 'item',
    renderHeader: () => <MultilineTextHeaderCell text={'item'} />,

    renderCell: params => <StringListCell maxItemsDisplay={4} maxLettersInItem={10} sourceString={params.value} />,
    width: window.innerWidth < 1282 ? 54 : 160,
    sortable: false,
  },
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    width: window.innerWidth < 1282 ? 95 : 150,
    renderCell: params => <NormDateFromUnixCell value={params.value} />,
    // type: 'date',
  },
]

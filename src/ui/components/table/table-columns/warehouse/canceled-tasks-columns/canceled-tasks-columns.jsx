import {
  colorByTaskPriorityStatus,
  mapTaskPriorityStatusEnum,
  taskPriorityStatusTranslate,
} from '@constants/task/task-priority-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  MultipleAsinCell,
  NormDateFromUnixCell,
  StringListCell,
  TaskDescriptionCell,
  TaskTypeCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

export const warehouseCanceledTasksViewColumns = handlers => [
  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
    renderCell: params => (
      <ActionButtonsCell
        showFirst
        firstContent={t(TranslationKey.View)}
        onClickFirst={() => handlers.setCurrentOpenedTask(params.row.originalData)}
      />
    ),
    filterable: false,
    sortable: false,
    width: 130,
  },

  {
    field: 'operationType',
    headerName: t(TranslationKey.Type),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Type)} />,
    renderCell: params => <TaskTypeCell operationType={params.row.originalData.operationType} />,
    width: window.innerWidth < 1282 ? 125 : 165,
  },

  {
    field: 'priority',
    headerName: t(TranslationKey.Priority),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Priority)} />,
    renderCell: params => (
      <Text
        isCell
        color={colorByTaskPriorityStatus(mapTaskPriorityStatusEnum[params.value])}
        text={taskPriorityStatusTranslate(mapTaskPriorityStatusEnum[params.value])}
      />
    ),
    width: window.innerWidth < 1282 ? 115 : 165,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,
    renderCell: params => <TaskDescriptionCell task={params.row.originalData} />,
    filterable: false,
    sortable: false,
    width: 290,
  },

  {
    field: 'asin',
    headerName: 'ASIN',
    renderHeader: () => <MultilineTextHeaderCell text={'ASIN'} />,
    renderCell: params => <MultipleAsinCell asinList={params.value} />,
    sortable: false,
    width: window.innerWidth < 1282 ? 101 : 160,
  },

  {
    field: 'trackNumber',
    headerName: t(TranslationKey['Track number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Track number'])} />,
    renderCell: params => (
      <StringListCell withCopy maxItemsDisplay={4} maxLettersInItem={10} sourceString={params.value} />
    ),
    sortable: false,
    width: window.innerWidth < 1282 ? 85 : 160,
  },

  {
    field: 'orderId',
    headerName: t(TranslationKey['Order number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Order number'])} />,
    renderCell: params => <StringListCell maxItemsDisplay={4} maxLettersInItem={10} sourceString={params.value} />,
    type: 'number',
    sortable: false,
    align: 'center',
    width: window.innerWidth < 1282 ? 75 : 160,
  },

  {
    field: 'item',
    headerName: 'item',
    renderHeader: () => <MultilineTextHeaderCell text={'item'} />,
    renderCell: params => <StringListCell maxItemsDisplay={4} maxLettersInItem={10} sourceString={params.value} />,
    sortable: false,
    width: window.innerWidth < 1282 ? 54 : 150,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
    renderCell: params => <NormDateFromUnixCell value={params.value} />,
    width: 105,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <NormDateFromUnixCell value={params.value} />,
    width: 115,
  },
]

import {
  colorByTaskPriorityStatus,
  mapTaskPriorityStatusEnum,
  taskPriorityStatusTranslate,
} from '@constants/task/task-priority-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  MultipleAsinCell,
  NormDateFromUnixCell,
  NormalActionBtnCell,
  StringListCell,
  TaskDescriptionCell,
  TaskTypeCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const warehouseCanceledTasksViewColumns = handlers => [
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
    field: 'specType',
    headerName: t(TranslationKey.Type),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Type)} />,

    width: window.innerWidth < 1282 ? 125 : 165,
    renderCell: params => <TaskTypeCell specType={params.row.originalData.specType} />,
  },

  {
    field: 'priority',
    headerName: t(TranslationKey.Priority),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Priority)} />,

    width: window.innerWidth < 1282 ? 115 : 165,
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
    width: window.innerWidth < 1282 ? 54 : 160,
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

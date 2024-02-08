import { TranslationKey } from '@constants/translations/translation-key'

import {
  ChangeInputCommentCell,
  CheckboxCell,
  MultilineTextHeaderCell,
  MultipleAsinCell,
  NormDateFromUnixCell,
  NormalActionBtnCell,
  StringListCell,
  TaskDescriptionCell,
  TaskPriorityCell,
  TaskTypeCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const warehouseVacantTasksViewColumns = handlers => [
  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell textAlignStart text={t(TranslationKey.Action)} />,

    renderCell: params => (
      <NormalActionBtnCell
        fullWidthButton
        isShowCancelButton
        tooltipText={t(TranslationKey['Take the task to work'])}
        bTnText={t(TranslationKey['Get to work'])}
        isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
        boxId={params.row.originalData.boxes[0]?._id}
        rowId={params.row.originalData._id}
        operationType={params.row.originalData.operationType}
        onClickCancelTask={handlers.onClickCancelTask}
        onClickOkBtn={() => handlers.onClickPickupBtn(params.row.originalData)}
      />
    ),
    width: window.innerWidth < 1282 ? 150 : 165,
    filterable: false,
    sortable: false,
  },

  {
    field: 'priority',
    headerName: t(TranslationKey.Priority),
    renderHeader: () => <MultilineTextHeaderCell textAlignStart text={t(TranslationKey.Priority)} />,

    width: window.innerWidth < 1282 ? 140 : 170,
    renderCell: params => (
      <TaskPriorityCell
        curPriority={params.value}
        taskId={params.row.originalData._id}
        onChangePriority={handlers.updateTaskPriority}
      />
    ),
  },

  {
    field: 'reason',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell textAlignStart text={t(TranslationKey.Comment)} />,

    width: 280,

    renderCell: params => (
      <ChangeInputCommentCell
        rowsCount={4}
        text={params.row.originalData.reason}
        id={params.row.originalData._id}
        onClickSubmit={reason =>
          handlers.updateTaskComment(params.row.originalData._id, params.row.originalData.priority, reason)
        }
      />
    ),
  },

  {
    field: 'operationType',
    headerName: t(TranslationKey.Type),
    renderHeader: () => <MultilineTextHeaderCell textAlignStart text={t(TranslationKey.Type)} />,

    width: 165,
    renderCell: params => <TaskTypeCell operationType={params.row.originalData.operationType} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell textAlignStart text={t(TranslationKey.Description)} />,

    width: 330,
    renderCell: params => <TaskDescriptionCell task={params.row.originalData} />,
    filterable: false,
    sortable: false,
  },
  {
    field: 'asin',
    headerName: 'ASIN',
    renderHeader: () => <MultilineTextHeaderCell textAlignStart text={'ASIN'} />,

    renderCell: params => <MultipleAsinCell asinList={params.value} />,
    width: window.innerWidth < 1282 ? 101 : 140,
    sortable: false,
  },

  {
    field: 'trackNumber',
    headerName: t(TranslationKey['Track number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Track number'])} />,

    renderCell: params => (
      <StringListCell withCopy maxItemsDisplay={4} maxLettersInItem={10} sourceString={params.value} />
    ),
    width: window.innerWidth < 1282 ? 85 : 140,
    sortable: false,
  },

  {
    field: 'orderId',
    headerName: t(TranslationKey['Order number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Order number'])} />,

    renderCell: params => <StringListCell maxItemsDisplay={4} maxLettersInItem={10} sourceString={params.value} />,
    align: 'center',
    type: 'number',
    width: window.innerWidth < 1282 ? 75 : 130,
    sortable: false,
  },

  {
    field: 'isBarCodeAttached',
    headerName: 'barcode',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

    renderCell: params => <CheckboxCell checked={params.value} />,
    width: 100,
    type: 'boolean',
  },

  {
    field: 'item',
    headerName: 'item',
    renderHeader: () => <MultilineTextHeaderCell text={'item'} />,

    renderCell: params => <StringListCell maxItemsDisplay={4} maxLettersInItem={10} sourceString={params.value} />,
    width: window.innerWidth < 1282 ? 54 : 100,
    sortable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    width: window.innerWidth < 1282 ? 95 : 150,
    renderCell: params => <NormDateFromUnixCell value={params.value} />,
  },
]

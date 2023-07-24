/* eslint-disable no-unused-vars */
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ChangeInputCommentCell,
  CheckboxCell,
  MultilineTextHeaderCell,
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
        tooltipText={t(TranslationKey['Take the task to work'])}
        bTnText={t(TranslationKey['Get to work'])}
        isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
        onClickOkBtn={() => handlers.onClickPickupBtn(params.row.originalData)}
      />
    ),
    width: window.innerWidth < 1282 ? 150 : 190,
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

    width: 271,

    renderCell: params => (
      <ChangeInputCommentCell
        rowsCount={4}
        text={params.row.originalData.reason}
        id={params.row.originalData._id}
        onClickSubmit={(id, reason) => {
          handlers.updateTaskComment(id, params.row.originalData.priority, reason)
        }}
      />
    ),
  },

  {
    field: 'operationType',
    headerName: t(TranslationKey.Type),
    renderHeader: () => <MultilineTextHeaderCell textAlignStart text={t(TranslationKey.Type)} />,

    width: 180,
    renderCell: params => <TaskTypeCell operationType={params.row.originalData.operationType} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell textAlignStart text={t(TranslationKey.Description)} />,

    // width: window.innerWidth < 1282 ? 338 : 850,
    width: 290,
    renderCell: params => <TaskDescriptionCell task={params.row.originalData} />,
    filterable: false,
    sortable: false,
  },
  {
    field: 'asin',
    headerName: 'ASIN',
    renderHeader: () => <MultilineTextHeaderCell textAlignStart text={'ASIN'} />,

    renderCell: params => (
      <StringListCell withCopy maxItemsDisplay={4} maxLettersInItem={10} sourceString={params.value} />
    ),
    width: window.innerWidth < 1282 ? 101 : 135,
    sortable: false,
  },

  {
    field: 'trackNumber',
    headerName: t(TranslationKey['Track number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Track number'])} />,

    renderCell: params => (
      <StringListCell withCopy maxItemsDisplay={4} maxLettersInItem={10} sourceString={params.value} />
    ),
    width: window.innerWidth < 1282 ? 85 : 119,
    sortable: false,
    align: 'center',
  },

  {
    field: 'orderId',
    headerName: t(TranslationKey['Order number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Order number'])} />,

    renderCell: params => <StringListCell maxItemsDisplay={4} maxLettersInItem={10} sourceString={params.value} />,
    align: 'center',
    type: 'number',
    width: window.innerWidth < 1282 ? 75 : 134,
    sortable: false,
  },

  {
    field: 'isBarCodeAttached',
    headerName: 'barcode',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

    renderCell: params => <CheckboxCell checked={params.value} />,
    width: 160,
    type: 'boolean',
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

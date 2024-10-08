import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  ChangeInputCommentCell,
  CheckboxCell,
  MultilineTextHeaderCell,
  MultipleAsinCell,
  NormDateFromUnixCell,
  StringListCell,
  TaskDescriptionCell,
  TaskPriorityCell,
  TaskTypeCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const warehouseMyTasksViewColumns = handlers => [
  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
    renderCell: params => (
      <ActionButtonsCell
        isFirstButton
        isSecondButton
        isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
        firstButtonTooltipText={t(TranslationKey['Open a window to perform a task'])}
        firstButtonElement={t(TranslationKey.Resolve)}
        firstButtonStyle={ButtonStyle.SUCCESS}
        secondButtonTooltipText={t(TranslationKey['The task will be canceled, the box will keep its previous state'])}
        secondButtonElement={t(TranslationKey.Cancel)}
        secondButtonStyle={ButtonStyle.DANGER}
        disabledSecondButton={params.row.originalData.operationType === TaskOperationType.RECEIVE}
        onClickFirstButton={() => handlers.onClickResolveBtn(params.row.originalData._id)}
        onClickSecondButton={() =>
          handlers.onClickCancelTask(
            params.row.originalData.boxes[0]?._id,
            params.row.originalData._id,
            params.row.originalData.operationType,
          )
        }
      />
    ),
    filterable: false,
    sortable: false,
    width: window.innerWidth < 1282 ? 115 : 165,
  },

  {
    field: 'priority',
    headerName: t(TranslationKey.Priority),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Priority)} />,
    renderCell: params => (
      <TaskPriorityCell
        curPriority={params.value}
        taskId={params.row.originalData._id}
        onChangePriority={handlers.updateTaskPriority}
      />
    ),
    width: window.innerWidth < 1282 ? 140 : 170,
  },

  {
    field: 'reason',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
    renderCell: params => (
      <ChangeInputCommentCell
        rowsCount={4}
        text={params.row.originalData.reason}
        onClickSubmit={reason =>
          handlers.updateTaskComment(params.row.originalData._id, params.row.originalData.priority, reason)
        }
      />
    ),
    width: 271,
  },

  {
    field: 'operationType',
    headerName: t(TranslationKey.Type),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Type)} />,
    renderCell: params => <TaskTypeCell operationType={params.row.originalData.operationType} />,
    width: window.innerWidth < 1282 ? 140 : 180,
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
    width: window.innerWidth < 1282 ? 100 : 160,
  },

  {
    field: 'trackNumber',
    headerName: t(TranslationKey['Track number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Track number'])} />,
    renderCell: params => (
      <StringListCell withCopy maxItemsDisplay={4} maxLettersInItem={10} sourceString={params.value} />
    ),
    align: 'center',
    sortable: false,
    width: window.innerWidth < 1282 ? 60 : 160,
  },

  {
    field: 'orderId',
    headerName: t(TranslationKey['Order number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Order number'])} />,
    renderCell: params => <StringListCell maxItemsDisplay={4} maxLettersInItem={10} sourceString={params.value} />,
    type: 'number',
    sortable: false,
    width: window.innerWidth < 1282 ? 73 : 160,
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
    field: 'isBarCodeAttached',
    headerName: 'barcode',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,
    renderCell: params => <CheckboxCell checked={params.value} />,
    width: window.innerWidth < 1282 ? 65 : 160,
    type: 'boolean',
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

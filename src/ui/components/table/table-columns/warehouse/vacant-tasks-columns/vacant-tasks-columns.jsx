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

export const warehouseVacantTasksViewColumns = handlers => [
  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell textAlignStart text={t(TranslationKey.Action)} />,

    renderCell: params => (
      <ActionButtonsCell
        isFirstButton
        isSecondButton
        isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
        firstButtonTooltipText={t(TranslationKey['Take the task to work'])}
        firstButtonElement={t(TranslationKey['Get to work'])}
        firstButtonStyle={ButtonStyle.PRIMARY}
        secondButtonTooltipText={t(TranslationKey['The task will be canceled, the box will keep its previous state'])}
        secondButtonElement={t(TranslationKey.Cancel)}
        secondButtonStyle={ButtonStyle.DANGER}
        onClickFirstButton={() => handlers.onClickPickupBtn(params.row.originalData)}
        onClickSecondButton={() =>
          handlers.onClickCancelTask(
            params.row.originalData.boxes[0]?._id,
            params.row.originalData._id,
            params.row.originalData.operationType,
          )
        }
      />
    ),
    width: window.innerWidth < 1282 ? 150 : 170,
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

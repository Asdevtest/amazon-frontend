import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  // AsinCopyCell,
  NormDateFromUnixCell,
  TaskDescriptionCell,
  NormalActionBtnCell,
  TaskTypeCell,
  MultilineTextHeaderCell, // MultilineTextCell,
  CheckboxCell,
  StringListCell,
  TaskPriorityCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const warehouseVacantTasksViewColumns = (handlers, firstRowId) => [
  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    renderCell: params => (
      <NormalActionBtnCell
        tooltipText={t(TranslationKey['Take the task to work'])}
        bTnText={t(TranslationKey['Get to work'])}
        isFirstRow={firstRowId === params.row.id}
        onClickOkBtn={() => handlers.onClickPickupBtn(params.row.originalData)}
      />
    ),
    width: window.innerWidth < 1282 ? 150 : 190,
    filterable: false,
    sortable: false,
  },

  {
    field: 'operationType',
    headerName: t(TranslationKey.Type),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Type)} />,

    width: window.innerWidth < 1282 ? 115 : 170,
    renderCell: params => <TaskTypeCell task={params.row.originalData} />,
  },

  {
    field: 'priority',
    headerName: t(TranslationKey.Priority),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Priority)} />,

    width: window.innerWidth < 1282 ? 120 : 170,
    renderCell: params => (
      <TaskPriorityCell
        curPriority={params.value}
        taskId={params.row.originalData._id}
        onChangePriority={handlers.updateTaskPriority}
      />
    ),
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,

    width: window.innerWidth < 1282 ? 338 : 850,
    renderCell: params => <TaskDescriptionCell task={params.row.originalData} />,
    filterable: false,
    sortable: false,
  },
  {
    field: 'asin',
    headerName: 'ASIN',
    renderHeader: () => <MultilineTextHeaderCell text={'ASIN'} />,

    renderCell: params => (
      <StringListCell withCopy maxItemsDisplay={4} maxLettersInItem={10} sourceString={params.value} />
    ),
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
    align: 'center',
    type: 'number',
    width: window.innerWidth < 1282 ? 75 : 160,
    sortable: false,
  },

  {
    field: 'barcode',
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
    type: 'date',
  },
]

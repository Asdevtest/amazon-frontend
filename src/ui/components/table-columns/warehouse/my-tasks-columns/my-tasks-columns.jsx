/* eslint-disable no-unused-vars */
import React, {useCallback, useMemo} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  NormDateFromUnixCell,
  TaskDescriptionCell,
  WarehouseMyTasksBtnsCell,
  TaskTypeCell,
  MultilineTextHeaderCell, // MultilineTextCell, // AsinCopyCell,
  CheckboxCell,
  StringListCell,
  TaskPriorityCell,
  ChangeInputCommentCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const warehouseMyTasksViewColumns = (handlers, firstRowId) => [
  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: window.innerWidth < 1282 ? 115 : 190,

    // renderCell: params => (
    //   <WarehouseMyTasksBtnsCell
    //     handlers={handlers}
    //     row={params.row.originalData}
    //     isFirstRow={firstRowId === params.row.id}
    //   />
    // ),

    renderCell: params => {
      const handlersMemo = useMemo(() => handlers, [])
      const originalDataMemo = useMemo(() => params.row.originalData, [])

      return (
        <WarehouseMyTasksBtnsCell
          handlers={handlersMemo}
          row={originalDataMemo}
          isFirstRow={firstRowId === params.row.id}
        />
      )
    },
    filterable: false,
    sortable: false,
  },

  {
    field: 'priority',
    headerName: t(TranslationKey.Priority),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Priority)} />,

    width: window.innerWidth < 1282 ? 140 : 170,
    // renderCell: params => (
    //   <TaskPriorityCell
    //     curPriority={params.value}
    //     taskId={params.row.originalData._id}
    //     onChangePriority={handlers.updateTaskPriority}
    //   />
    // ),

    renderCell: params => {
      const onChangePriority = useCallback(handlers.updateTaskPriority, [])

      return (
        <TaskPriorityCell
          curPriority={params.value}
          taskId={params.row.originalData._id}
          onChangePriority={onChangePriority}
        />
      )
    },
  },

  {
    field: 'reason',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

    width: 271,
    renderCell: params => {
      const onClickSubmit = useCallback((id, reason) => {
        handlers.updateTaskComment(id, params.row.originalData.priority, reason)
      }, [])

      return (
        <ChangeInputCommentCell
          rowsCount={4}
          text={params.row.originalData.reason}
          id={params.row.originalData._id}
          onClickSubmit={onClickSubmit}
        />
      )
    },
  },

  {
    field: 'operationType',
    headerName: t(TranslationKey.Type),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Type)} />,

    width: window.innerWidth < 1282 ? 140 : 180,
    // renderCell: params => <TaskTypeCell task={params.row.originalData} />,
    renderCell: params => {
      const originalDataMemo = useMemo(() => params.row.originalData, [])

      return <TaskTypeCell task={originalDataMemo} />
    },
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,

    // width: window.innerWidth < 1282 ? 338 : 850,
    width: 290,
    // renderCell: params => <TaskDescriptionCell task={params.row.originalData} />,

    renderCell: params => {
      const originalDataMemo = useMemo(() => params.row.originalData, [])

      return <TaskDescriptionCell task={originalDataMemo} />
    },
    filterable: false,
    sortable: false,
  },

  {
    field: 'asin',
    headerName: 'ASIN',
    renderHeader: () => <MultilineTextHeaderCell text={'ASIN'} />,

    // renderCell: params => <AsinCopyCell asinData={params.value} />,
    renderCell: params => (
      <StringListCell withCopy maxItemsDisplay={4} maxLettersInItem={10} sourceString={params.value} />
    ),

    sortable: false,
    width: window.innerWidth < 1282 ? 100 : 160,
  },

  {
    field: 'trackNumber',
    headerName: t(TranslationKey['Track number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Track number'])} />,

    // renderCell: params => <MultilineTextCell oneLines withTooltip text={params.value} />,
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

    // renderCell: params => <MultilineTextCell text={params.value} />,
    renderCell: params => <StringListCell maxItemsDisplay={4} maxLettersInItem={10} sourceString={params.value} />,
    type: 'number',
    sortable: false,
    width: window.innerWidth < 1282 ? 73 : 160,
  },

  {
    field: 'item',
    headerName: 'item',
    renderHeader: () => <MultilineTextHeaderCell text={'item'} />,

    // renderCell: params => <MultilineTextCell text={params.value} />,
    renderCell: params => <StringListCell maxItemsDisplay={4} maxLettersInItem={10} sourceString={params.value} />,
    sortable: false,
    width: window.innerWidth < 1282 ? 54 : 160,
  },

  // {
  //   field: 'barcode',
  //   headerName: 'barcode',
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

  //   renderCell: params => <CheckboxCell checked={params.value} />,
  //   width: 160,
  //   type: 'boolean',
  // },

  {
    field: 'isBarCodeAttached',
    headerName: 'barcode',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

    renderCell: params => <CheckboxCell checked={params.value} />,
    width: window.innerWidth < 1282 ? 65 : 160,
    type: 'boolean',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    width: window.innerWidth < 1282 ? 95 : 120,
    renderCell: params => <NormDateFromUnixCell value={params.value} />,
    type: 'date',
  },

  // {
  //   field: 'status',
  //   headerName: t(TranslationKey.Status),
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

  //   width: 110,
  //   renderCell: params => <TaskStatusCell status={params.value} />,
  //   filterable: false,
  //   sortable: false,
  // },
]

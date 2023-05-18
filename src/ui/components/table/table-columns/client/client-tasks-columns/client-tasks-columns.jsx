/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo } from 'react'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  NormDateFromUnixCell,
  TaskDescriptionCell,
  ClientTasksActionBtnsCell,
  UserLinkCell,
  TaskTypeCell,
  MultilineTextHeaderCell,
  TaskStatusCell,
  TaskPriorityCell,
  ChangeInputCommentCell,
  StringListCell,
  CheckboxCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const clientTasksViewColumns = handlers => [
  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 250,

    renderCell: params => {
      const handlersMemo = useMemo(() => handlers, [])
      const rowMemo = useMemo(() => params.row.originalData, [])

      return <ClientTasksActionBtnsCell handlers={handlersMemo} row={rowMemo} />
    },
    filterable: false,
    sortable: false,
  },

  {
    field: 'priority',
    headerName: t(TranslationKey.Priority),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Priority)} />,

    width: window.innerWidth < 1282 ? 140 : 170,
    renderCell: params => {
      const updateTaskPriority = useCallback(handlers.updateTaskPriority, [])

      return (
        <TaskPriorityCell
          curPriority={params.value}
          taskId={params.row.originalData._id}
          onChangePriority={updateTaskPriority}
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

    width: 180,
    renderCell: params => <TaskTypeCell operationType={params.row.originalData.operationType} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,

    width: 290,
    renderCell: params => {
      const rowMemo = useMemo(() => params.row.originalData, [])

      return <TaskDescriptionCell task={rowMemo} />
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
    field: 'storekeeper',
    headerName: t(TranslationKey['Int warehouse']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.storekeeper?._id} />
    ),
    width: 170,
    sortable: false,
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
    field: 'isBarCodeAttached',
    headerName: 'barcode',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

    renderCell: params => <CheckboxCell checked={params.value} />,
    width: window.innerWidth < 1282 ? 65 : 160,
    type: 'boolean',
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

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    width: 130,
    renderCell: params => <TaskStatusCell status={params.value} />,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    width: 130,
    renderCell: params => <NormDateFromUnixCell value={params.value} />,
    type: 'date',
  },
]

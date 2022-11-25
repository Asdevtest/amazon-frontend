import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  NormDateFromUnixCell,
  TaskDescriptionCell,
  WarehouseMyTasksBtnsCell,
  TaskTypeCell,
  MultilineTextHeaderCell,
  MultilineTextCell,
  AsinCopyCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const warehouseMyTasksViewColumns = (handlers, firstRowId) => [
  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 190,

    renderCell: params => (
      <WarehouseMyTasksBtnsCell
        handlers={handlers}
        row={params.row.originalData}
        isFirstRow={firstRowId === params.row.id}
      />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'operationType',
    headerName: t(TranslationKey.Type),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Type)} />,

    width: 155,
    renderCell: params => <TaskTypeCell task={params.row.originalData} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,

    width: 850,
    renderCell: params => <TaskDescriptionCell task={params.row.originalData} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'asin',
    headerName: 'ASIN',
    renderHeader: () => <MultilineTextHeaderCell text={'ASIN'} />,

    renderCell: params => <AsinCopyCell asinData={params.value} />,
    width: 160,
  },

  {
    field: 'orderId',
    headerName: t(TranslationKey['Order number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Order number'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 160,
  },

  {
    field: 'item',
    headerName: 'item',
    renderHeader: () => <MultilineTextHeaderCell text={'item'} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 160,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    width: 120,
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

import React from 'react'

import {Radio} from '@material-ui/core'

import {texts} from '@constants/texts'

import {renderFieldValueCell, ScrollingCell} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').clientDailySellerBoardColumns

export const clientDailySellerBoardColumns = (selectedRow, rowHandlers) => [
  {
    field: 'id',
    headerName: '',
    width: 40,
    renderCell: params => (
      <Radio
        color="primary"
        checked={params.value === selectedRow.id}
        onChange={() => rowHandlers.selectedRow(params.row)}
      />
    ),
  },
  {
    field: 'asin',
    headerName: textConsts.asinField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'sku',
    headerName: textConsts.skuField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'title',
    headerName: textConsts.titleField,
    renderCell: params => <ScrollingCell value={params.value} />,
    width: 250,
  },

  {
    field: 'stockValue',
    headerName: textConsts.stockValueField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'reserved',
    headerName: textConsts.reservedField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'roi',
    headerName: textConsts.roiField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'comment',
    headerName: textConsts.commentField,
    renderCell: params => <ScrollingCell value={params.value} />,
    width: 250,
  },

  {
    field: 'daysOfStockLeft',
    headerName: textConsts.daysOfStockLeftField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },
  {
    field: 'sentToFba',
    headerName: textConsts.sentToFbaField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },
  {
    field: 'fbaPrepStock',
    headerName: textConsts.fbaPrepStockField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },
  {
    field: 'ordered',
    headerName: textConsts.orderedField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },
]

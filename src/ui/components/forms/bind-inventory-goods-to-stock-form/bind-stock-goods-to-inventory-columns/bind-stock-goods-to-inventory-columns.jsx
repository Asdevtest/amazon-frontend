import {texts} from '@constants/texts'

import {renderFieldValueCell, TrashCell} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').bindInventoryGoodsToStockColumnsTexts

export const sourceColumns = () => [
  {
    field: 'asin',
    headerName: textConsts.asinField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 120,
  },

  {
    field: 'sku',
    headerName: textConsts.skuField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 120,
  },

  {
    field: 'title',
    headerName: textConsts.titleField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 120,
  },

  {
    field: 'stockValue',
    headerName: textConsts.stockValueField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 110,
  },

  {
    field: 'reserved',
    headerName: textConsts.reservedField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 110,
  },

  {
    field: 'roi',
    headerName: textConsts.roiField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 100,
  },
]

export const chosenGoodsColumns = handlers => [
  {
    field: 'asin',
    headerName: textConsts.asinField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 120,
  },

  {
    field: 'sku',
    headerName: textConsts.skuField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 120,
  },

  {
    field: 'title',
    headerName: textConsts.titleField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 120,
  },

  {
    field: 'stockValue',
    headerName: textConsts.stockValueField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 110,
  },

  {
    field: 'reserved',
    headerName: textConsts.reservedField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 110,
  },

  {
    field: 'roi',
    headerName: textConsts.roiField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 100,
  },

  {
    field: ' ',
    headerName: '',
    renderCell: params => <TrashCell onClick={() => handlers.onClickTrash(params.row.asin)} />,
    width: 40,
  },
]

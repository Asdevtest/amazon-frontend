import {TranslationKey} from '@constants/translations/translation-key'

import {renderFieldValueCell, TrashCell} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const sourceColumns = () => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderCell: params => renderFieldValueCell(params.value),
    width: 120,
  },

  {
    field: 'sku',
    headerName: t(TranslationKey.SKU),
    renderCell: params => renderFieldValueCell(params.value),
    width: 120,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderCell: params => renderFieldValueCell(params.value),
    width: 120,
  },

  {
    field: 'stockValue',
    headerName: t(TranslationKey.Quantity),
    renderCell: params => renderFieldValueCell(params.value),
    width: 110,
  },

  {
    field: 'reserved',
    headerName: t(TranslationKey.Reserved),
    renderCell: params => renderFieldValueCell(params.value),
    width: 110,
  },

  {
    field: 'roi',
    headerName: t(TranslationKey.ROI),
    renderCell: params => renderFieldValueCell(params.value),
    width: 100,
  },
]

export const chosenGoodsColumns = handlers => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderCell: params => renderFieldValueCell(params.value),
    width: 120,
  },

  {
    field: 'sku',
    headerName: t(TranslationKey.SKU),
    renderCell: params => renderFieldValueCell(params.value),
    width: 120,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderCell: params => renderFieldValueCell(params.value),
    width: 120,
  },

  {
    field: 'stockValue',
    headerName: t(TranslationKey.Quantity),
    renderCell: params => renderFieldValueCell(params.value),
    width: 110,
  },

  {
    field: 'reserved',
    headerName: t(TranslationKey.Reserved),
    renderCell: params => renderFieldValueCell(params.value),
    width: 110,
  },

  {
    field: 'roi',
    headerName: t(TranslationKey.ROI),
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

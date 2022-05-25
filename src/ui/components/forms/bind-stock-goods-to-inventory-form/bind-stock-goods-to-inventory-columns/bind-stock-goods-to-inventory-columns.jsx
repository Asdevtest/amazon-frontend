import {Radio} from '@material-ui/core'

import {texts} from '@constants/texts'
import {TranslationKey} from '@constants/translations/translation-key'

import {renderFieldValueCell, SmallRowImageCell, TrashCell} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {t} from '@utils/translations'

const textConsts = getLocalizedTexts(texts, 'en').bindStockGoodsToInventoryColumnsTexts

export const inventoryColumns = (handlers, selectedRow) => [
  {
    field: '.',
    headerName: '',
    width: 40,
    renderCell: params => (
      <Radio
        color="primary"
        checked={params.row.id === selectedRow?.id}
        onChange={() => handlers.selectRow(params.row)}
      />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'asin',
    headerName: textConsts.asinField,
    width: 120,
  },

  {
    field: 'image',
    headerName: t(TranslationKey.Image),
    width: 100,
    renderCell: params => <SmallRowImageCell images={params.row.images} />,
    filterable: false,
    sortable: false,
  },
  {
    field: 'amazonTitle',
    headerName: t(TranslationKey.Title),
    width: 110,
    flex: 1,
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

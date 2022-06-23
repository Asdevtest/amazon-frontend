import {Radio} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {MultilineTextCell, SmallRowImageCell, TrashCell} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

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
    headerName: t(TranslationKey.ASIN),
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
    headerName: t(TranslationKey.ASIN),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
  },

  {
    field: 'sku',
    headerName: t(TranslationKey.SKU),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
  },

  {
    field: 'stockValue',
    headerName: t(TranslationKey.Quantity),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 110,
  },

  {
    field: 'reserved',
    headerName: t(TranslationKey.Reserved),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 110,
  },

  {
    field: 'roi',
    headerName: t(TranslationKey.ROI),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 100,
  },

  {
    field: ' ',
    headerName: '',
    renderCell: params => <TrashCell onClick={() => handlers.onClickTrash(params.row.asin)} />,
    width: 40,
  },
]

import { Radio } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SmallRowImageCell, TextCell } from '@components/data-grid/data-grid-cells'
import { Button } from '@components/shared/button'
import { DeleteIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

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
    filterable: false,
    sortable: false,
  },

  {
    field: 'image',
    headerName: t(TranslationKey.Image),
    width: 100,
    renderCell: params => <SmallRowImageCell image={params.row.images[0]} />,
    filterable: false,
    sortable: false,
  },
  {
    field: 'amazonTitle',
    headerName: t(TranslationKey.Title),
    width: 110,
    flex: 1,
    filterable: false,
    sortable: false,
  },
]

export const chosenGoodsColumns = handlers => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderCell: params => <TextCell text={params.value} />,
    width: 120,
    filterable: false,
    sortable: false,
  },

  {
    field: 'sku',
    headerName: t(TranslationKey.SKU),
    renderCell: params => <TextCell text={params.value} />,
    width: 130,
    filterable: false,
    sortable: false,
  },

  {
    field: 'title',
    headerName: 'Title',
    renderCell: params => <TextCell text={params.value} />,
    width: 120,
    filterable: false,
    sortable: false,
  },

  {
    field: 'fbaFbmStock',
    headerName: 'FBA/FBM Stock',
    renderCell: params => <TextCell text={params.value} />,
    width: 140,
    filterable: false,
    sortable: false,
  },

  {
    field: 'reserved',
    headerName: 'Reserved',
    renderCell: params => <TextCell text={params.value} />,
    width: 110,
    filterable: false,
    sortable: false,
  },

  {
    field: 'roi',
    headerName: t(TranslationKey.ROI),
    renderCell: params => <TextCell text={params.value} />,
    width: 100,
    filterable: false,
    sortable: false,
  },

  {
    field: ' ',
    headerName: '',
    renderCell: params => (
      <Button iconButton onClick={() => handlers.onClickTrash(params.row.asin)}>
        <DeleteIcon />
      </Button>
    ),
    width: 60,
    filterable: false,
    sortable: false,
  },
]

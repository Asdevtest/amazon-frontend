import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { DeleteIcon } from '@components/shared/svg-icons'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

export const sourceColumns = () => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderCell: params => <Text text={params.value} />,
    width: 120,
    filterable: false,
    sortable: false,
  },

  {
    field: 'sku',
    headerName: t(TranslationKey.SKU),
    renderCell: params => <Text text={params.value} />,
    width: 140,
    filterable: false,
    sortable: false,
  },

  {
    field: 'title',
    headerName: 'Title',
    renderCell: params => <Text text={params.value} />,
    flex: 1,
    filterable: false,
    sortable: false,
  },

  {
    field: 'fbaFbmStock',
    headerName: 'FBA/FBM Stock',
    renderCell: params => <Text text={params.value} />,
    width: 140,
    filterable: false,
    sortable: false,
  },

  {
    field: 'reserved',
    headerName: 'Reserved',
    renderCell: params => <Text text={params.value} />,
    width: 100,
    filterable: false,
    sortable: false,
  },

  {
    field: 'roi',
    headerName: t(TranslationKey.ROI),
    renderCell: params => <Text text={params.value} />,
    width: 70,
    filterable: false,
    sortable: false,
  },
]

export const chosenGoodsColumns = handlers => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderCell: params => <Text text={params.value} />,
    width: 120,
    filterable: false,
    sortable: false,
  },

  {
    field: 'sku',
    headerName: t(TranslationKey.SKU),
    renderCell: params => <Text text={params.value} />,
    width: 140,
    filterable: false,
    sortable: false,
  },

  {
    field: 'title',
    headerName: 'Title',
    renderCell: params => <Text text={params.value} />,
    width: 200,
    filterable: false,
    sortable: false,
  },

  {
    field: 'fbaFbmStock',
    headerName: 'FBA/FBM Stock',
    renderCell: params => <Text text={params.value} />,
    width: 140,
    filterable: false,
    sortable: false,
  },

  {
    field: 'reserved',
    headerName: 'Reserved',
    renderCell: params => <Text text={params.value} />,
    width: 100,
    filterable: false,
    sortable: false,
  },

  {
    field: 'roi',
    headerName: t(TranslationKey.ROI),
    renderCell: params => <Text text={params.value} />,
    width: 70,
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

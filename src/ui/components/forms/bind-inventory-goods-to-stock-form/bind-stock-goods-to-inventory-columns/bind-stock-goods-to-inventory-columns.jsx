import {TranslationKey} from '@constants/translations/translation-key'

import {MultilineTextCell, TrashCell} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const sourceColumns = () => [
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
    width: 170,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 200,
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
    width: 70,
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
    width: 170,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 200,
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
    width: 70,
  },

  {
    field: ' ',
    headerName: '',
    renderCell: params => <TrashCell onClick={() => handlers.onClickTrash(params.row.asin)} />,
    width: 40,
  },
]

import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

export const productIntegrationsColumns = () => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <NormDateCell value={params.value} />,
    width: 150,
  },

  {
    field: 'shopName',
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

    renderCell: params => <Text isCell text={params.row?.shop?.name} />,
    width: 150,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,

    renderCell: params => <Text isCell text={params.value} />,
    width: 150,
  },

  {
    field: 'sku',
    headerName: t(TranslationKey.SKU),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.SKU)} />,

    renderCell: params => <Text isCell text={params.value} />,
    width: 150,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

    renderCell: params => <Text isCell text={params.value} />,
    width: 250,
  },

  {
    field: 'stockValue',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,

    renderCell: params => <Text isCell text={params.value} />,
    width: 150,
    type: 'number',
  },

  {
    field: 'available',
    headerName: t(TranslationKey.Available),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Available)} />,

    renderCell: params => <Text isCell text={params.row.fbaFbmStock} />,
    width: 150,
  },

  {
    field: 'reserved',
    headerName: t(TranslationKey.Reserved),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Reserved)} />,

    renderCell: params => <Text isCell text={params.value} />,
    width: 150,
  },

  {
    field: 'inbound',
    headerName: t(TranslationKey.Inbound),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Inbound)} />,

    renderCell: params => <Text isCell text={params.row.sentToFba} />,
    width: 150,
  },

  {
    field: 'roi',
    headerName: t(TranslationKey.ROI),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ROI)} />,

    renderCell: params => <Text isCell text={params.value} />,
    width: 150,
  },

  {
    field: 'comment',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

    renderCell: params => <Text isCell text={params.value} />,
    width: 250,
  },

  {
    field: 'daysOfStockLeft',
    headerName: t(TranslationKey.DaysOfStockLeft),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.DaysOfStockLeft)} />,

    renderCell: params => <Text isCell text={params.value} />,
    width: 250,
  },
  {
    field: 'fbaPrepStock',
    headerName: t(TranslationKey.FbaPrepStock),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.FbaPrepStock)} />,
    type: 'number',
    renderCell: params => <Text isCell text={params.value} />,
    width: 250,
  },
  {
    field: 'ordered',
    headerName: t(TranslationKey.Ordered),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Ordered)} />,

    renderCell: params => <Text isCell text={params.value} />,
    width: 250,
  },
]

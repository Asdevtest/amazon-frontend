import { Radio } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

export const moveBoxToBatchFormColumns = (handlers, selectedRow) => [
  {
    field: '.',
    headerName: '',
    width: 15,
    renderCell: params => (
      <Radio
        color="primary"
        checked={params.row._id === selectedRow?._id}
        onChange={() => handlers.setSelectedBatch(params.row)}
      />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
    renderCell: params => <Text isCell text={params.row.title} />,
    width: 110,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
    renderCell: params => <Text isCell text={params.row?.boxes?.[0]?.destination?.name} />,
    width: 110,
  },

  {
    field: 'xid',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: params => <Text isCell text={params.row.xid} />,
    width: 60,
  },

  {
    field: 'tariff',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,
    renderCell: params => <Text isCell text={params.row?.boxes?.[0]?.logicsTariff?.name} />,
    width: 120,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <NormDateCell value={params.row.updatedAt} />,
    width: 100,
  },

  {
    field: 'volumeWeight',
    headerName: t(TranslationKey['Volume weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Volume weight'])} />,
    renderCell: params => <Text isCell text={toFixedWithKg(params.row.volumeWeightDivide)} />,
    type: 'number',
    width: 90,
  },

  {
    field: 'finalWeight',
    headerName: t(TranslationKey['Final weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,
    renderCell: params => <Text isCell text={toFixedWithKg(params.row.finalWeight)} />,
    type: 'number',
    width: 120,
  },

  {
    field: 'totalPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,
    renderCell: params => (
      <Text isCell text={toFixedWithDollarSign(params.row?.boxes?.[0]?.items?.[0]?.order?.totalPrice)} />
    ),
    width: 120,
    type: 'number',
  },
]

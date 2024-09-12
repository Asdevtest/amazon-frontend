import { TranslationKey } from '@constants/translations/translation-key'

import {
  BatchBoxesCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserLinkCell,
  WarehouseTariffDatesCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

export const adminBatchesViewColumns = () => [
  {
    field: 'orders',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
    width: 200,
    renderCell: params => <BatchBoxesCell boxes={params.row.boxes} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <NormDateCell value={params.value} />,
    width: 150,
    // type: 'date',
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey['Int warehouse']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,
    renderCell: params => (
      <UserLinkCell blackText name={params.row.storekeeper?.name} userId={params.row.storekeeper?._id} />
    ),
    width: 170,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
    renderCell: params => <Text isCell text={params.row.boxes[0]?.destination?.name} />,
    width: 150,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: params => <Text isCell text={params.value} />,
    type: 'number',
    width: 80,
  },

  {
    field: 'tariff',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,
    renderCell: params => <Text isCell text={params.value} />,
    width: 250,
  },

  {
    field: 'finalWeight',
    headerName: t(TranslationKey['Final weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,

    renderCell: params => <Text isCell text={toFixedWithKg(params.value)} />,
    type: 'number',
    width: 150,
  },

  {
    field: 'dates',
    headerName: t(TranslationKey.Dates),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Dates)} />,

    renderCell: params => (
      <WarehouseTariffDatesCell
        cls={params.row?.boxes[0].logicsTariff?.cls}
        etd={params.row?.boxes[0].logicsTariff?.etd}
        eta={params.row?.boxes[0].logicsTariff?.eta}
      />
    ),
    width: 350,
    filterable: false,
    sortable: false,
  },
]

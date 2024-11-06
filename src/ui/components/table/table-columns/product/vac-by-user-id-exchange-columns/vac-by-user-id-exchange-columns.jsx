import { TranslationKey } from '@constants/translations/translation-key'

import {
  MediaContentCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

export const vacByUserIdExchangeColumns = () => [
  {
    field: 'image',
    headerName: t(TranslationKey.Image),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Image)} />,

    width: 70,
    renderCell: params => <MediaContentCell image={params.row.images[0]} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    width: 115,
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,

    renderCell: params => <Text isCell text={params.value} />,
    width: 150,
  },

  {
    field: 'category',
    headerName: t(TranslationKey.Category),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Category)} />,

    renderCell: params => <Text isCell text={params.value} />,
    width: 140,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,

    renderCell: params => <Text isCell text={toFixedWithDollarSign(params.value, 2)} />,
    type: 'number',
    width: 100,
  },

  {
    field: 'weight',
    headerName: t(TranslationKey.Weight),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Weight)} />,

    renderCell: params => <Text isCell text={toFixedWithKg(params.value)} />,
    type: 'number',
    width: 70,
  },

  {
    field: 'bsr',
    headerName: t(TranslationKey.BSR),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

    renderCell: params => <Text isCell text={params.value} />,
    type: 'number',
    width: 90,
  },

  {
    field: 'fbaamount',
    headerName: t(TranslationKey['Recommend amount']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Recommend amount'])} />,

    renderCell: params => <Text isCell text={params.value} />,
    width: 130,
    type: 'number',
  },

  {
    field: 'researcherName',
    headerName: t(TranslationKey.Researcher),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Researcher)} />,

    renderCell: params => (
      <UserCell name={params.row.createdBy?.name} id={params.row.createdBy?._id} email={params.row.createdBy?.email} />
    ),
    width: 200,
  },

  {
    field: 'buyerName',
    headerName: t(TranslationKey.Buyer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Buyer)} />,

    renderCell: params => (
      <UserCell name={params.row.buyer?.name} id={params.row.buyer?._id} email={params.row.buyer?.email} />
    ),
    width: 200,
  },

  {
    field: 'supervisorName',
    headerName: t(TranslationKey.Supervisor),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supervisor)} />,

    renderCell: params => (
      <UserCell name={params.row.checkedBy?.name} id={params.row.checkedBy?._id} email={params.row.checkedBy?.email} />
    ),
    width: 200,
  },
]

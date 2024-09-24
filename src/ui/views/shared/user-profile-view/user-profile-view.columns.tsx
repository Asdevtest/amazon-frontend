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

import { IGridColumn } from '@typings/shared/grid-column'

export const userProfileColumns = () => {
  const columns: IGridColumn[] = [
    {
      field: 'image',
      headerName: t(TranslationKey.Image),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Image)} />,
      renderCell: ({ row }) => <MediaContentCell image={row.images?.[0]} />,
      width: 70,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: ({ row }) => <NormDateCell value={row.updatedAt} />,
      width: 115,
    },

    {
      field: 'strategyStatus',
      headerName: t(TranslationKey.Strategy),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,
      renderCell: ({ row }) => <Text isCell text={row.strategyStatus} />,
      width: 150,
    },

    {
      field: 'category',
      headerName: t(TranslationKey.Category),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Category)} />,
      renderCell: ({ row }) => <Text isCell text={row.category} />,
      width: 140,
    },

    {
      field: 'amazon',
      headerName: t(TranslationKey['Amazon price']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,
      renderCell: ({ row }) => <Text isCell text={toFixedWithDollarSign(row.amazon, 2)} />,
      width: 100,
    },

    {
      field: 'weight',
      headerName: t(TranslationKey.Weight),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Weight)} />,
      renderCell: ({ row }) => <Text isCell text={toFixedWithKg(row.weight)} />,
      width: 70,
    },

    {
      field: 'bsr',
      headerName: t(TranslationKey.BSR),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,
      renderCell: ({ row }) => <Text isCell text={row.bsr} />,
      width: 90,
    },

    {
      field: 'fbaamount',
      headerName: t(TranslationKey['Recommend amount']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Recommend amount'])} />,
      renderCell: ({ row }) => <Text isCell text={row.fbaamount} />,
      width: 130,
    },

    {
      field: 'researcherName',
      headerName: t(TranslationKey.Researcher),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Researcher)} />,
      renderCell: ({ row }) => <UserCell name={row.createdBy?.name} id={row.createdBy?._id} />,
      width: 200,
    },

    {
      field: 'buyerName',
      headerName: t(TranslationKey.Buyer),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Buyer)} />,
      renderCell: ({ row }) => <UserCell name={row.buyer?.name} id={row.buyer?._id} />,

      width: 200,
    },

    {
      field: 'supervisorName',
      headerName: t(TranslationKey.Supervisor),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supervisor)} />,
      renderCell: ({ row }) => <UserCell name={row.checkedBy?.name} id={row.checkedBy?._id} />,
      width: 200,
    },
  ]

  for (const column of columns) {
    column.sortable = false
    column.filterable = false
  }

  return columns
}

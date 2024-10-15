import { productStrategyStatusesEnum } from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MediaContentCell,
  MultilineTextHeaderCell,
  NormDateCell,
  RedFlagsCell,
  TagsCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'
import { IGridColumn } from '@typings/shared/grid-column'

interface IRowHandlers {
  onClickLaunchPrivateLabelBtn: (product: IProduct) => void
}

export const clientExchangeColumns = (rowHandlers: IRowHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'image',
      headerName: t(TranslationKey.Image),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Image)} />,

      width: 70,
      renderCell: params => <MediaContentCell image={params.row.images[0]} />,
    },

    {
      field: 'strategyStatus',
      headerName: t(TranslationKey.Strategy),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,

      renderCell: params => (
        <Text
          isCell
          text={productStrategyStatusesEnum[params.value as keyof typeof productStrategyStatusesEnum]?.replace(
            /_/g,
            ' ',
          )}
        />
      ),

      width: 140,
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
      width: 110,
      type: 'number',
    },

    {
      field: 'weight',
      headerName: t(TranslationKey.Weight),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Weight)} />,

      renderCell: params => <Text isCell text={toFixedWithKg(params.value)} />,
      width: 90,
      type: 'number',
    },

    {
      field: 'bsr',
      headerName: t(TranslationKey.BSR),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 70,
      type: 'number',
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

      renderCell: params => <UserCell name={params.row.createdBy?.name} id={params.row.createdBy?._id} />,
      width: 160,
      disableCustomSort: true,
    },

    {
      field: 'buyerName',
      headerName: t(TranslationKey.Buyer),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Buyer)} />,

      renderCell: params => <UserCell name={params.row.buyer?.name} id={params.row.buyer?._id} />,
      width: 150,
      disableCustomSort: true,
    },

    {
      field: 'supervisorName',
      headerName: t(TranslationKey.Supervisor),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supervisor)} />,

      renderCell: params => <UserCell name={params.row.checkedBy?.name} id={params.row.checkedBy?._id} />,
      width: 150,
      disableCustomSort: true,
    },

    {
      field: 'priceForClient',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

      width: 150,
      renderCell: params => (
        <ActionButtonsCell
          showFirst
          firstContent={`${t(TranslationKey['Buy for'])} ${toFixedWithDollarSign(params.row.priceForClient, 2)}`}
          onClickFirst={() => rowHandlers.onClickLaunchPrivateLabelBtn(params.row as IProduct)}
        />
      ),
    },

    {
      field: 'redFlags',
      headerName: t(TranslationKey['Red flags']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Red flags'])} />,

      width: 130,
      renderCell: params => <RedFlagsCell flags={params.value} />,

      disableCustomSort: true,
    },

    {
      field: 'tags',
      headerName: t(TranslationKey.Tags),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tags)} />,

      width: 160,
      renderCell: params => <TagsCell tags={params.value} />,
      disableCustomSort: true,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 115,
    },
  ]

  for (const column of columns) {
    column.filterable = false
    column.sortable = false
  }

  return columns
}

import { productStrategyStatusesEnum } from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateCell,
  RedFlagsCell,
  SmallRowImageCell,
  TagsCell,
  TextCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'
import { Button } from '@components/shared/button'

import { toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
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

      width: 100,
      renderCell: params => <SmallRowImageCell image={params.row.images[0]} />,
      filterable: false,
      sortable: false,
    },

    {
      field: 'strategyStatus',
      headerName: t(TranslationKey.Strategy),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,

      renderCell: params => (
        <TextCell
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

      renderCell: params => <TextCell text={params.value} />,
      width: 140,
    },

    {
      field: 'amazon',
      headerName: t(TranslationKey['Amazon price']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,

      renderCell: params => <TextCell text={toFixedWithDollarSign(params.value, 2)} />,
      width: 110,
      type: 'number',
    },

    {
      field: 'weight',
      headerName: t(TranslationKey.Weight),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Weight)} />,

      renderCell: params => <TextCell text={toFixedWithKg(params.value)} />,
      width: 90,
      type: 'number',
    },

    {
      field: 'bsr',
      headerName: t(TranslationKey.BSR),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

      renderCell: params => <TextCell text={params.value} />,
      width: 70,
      type: 'number',
    },

    {
      field: 'fbaamount',
      headerName: t(TranslationKey['Recommend amount']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Recommend amount'])} />,

      renderCell: params => <TextCell text={params.value} />,
      width: 130,
      type: 'number',
    },

    {
      field: 'researcherName',
      headerName: t(TranslationKey.Researcher),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Researcher)} />,

      renderCell: params => (
        <UserLinkCell blackText name={params.row.createdBy?.name} userId={params.row.createdBy?._id} />
      ),
      width: 160,
    },

    {
      field: 'buyerName',
      headerName: t(TranslationKey.Buyer),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Buyer)} />,

      renderCell: params => <UserLinkCell blackText name={params.row.buyer?.name} userId={params.row.buyer?._id} />,
      width: 150,
    },

    {
      field: 'supervisorName',
      headerName: t(TranslationKey.Supervisor),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supervisor)} />,

      renderCell: params => (
        <UserLinkCell blackText name={params.row.checkedBy?.name} userId={params.row.checkedBy?._id} />
      ),
      width: 150,
    },

    {
      field: 'priceForClient',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

      width: 190,
      renderCell: params => (
        <Button
          styleType={ButtonStyle.SUCCESS}
          onClick={() => rowHandlers.onClickLaunchPrivateLabelBtn(params.row as IProduct)}
        >
          {t(TranslationKey['Buy for'])} {toFixedWithDollarSign(params.row.priceForClient, 2)}
        </Button>
      ),
    },

    {
      field: 'redFlags',
      headerName: t(TranslationKey['Red flags']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Red flags'])} />,

      width: 130,
      renderCell: params => <RedFlagsCell flags={params.value} />,
      sortable: false,
    },

    {
      field: 'tags',
      headerName: t(TranslationKey.Tags),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tags)} />,

      width: 160,
      renderCell: params => <TagsCell tags={params.value} />,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 115,
      // type: 'date',
    },
  ]

  return columns
}
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  RedFlagsCell,
  SmallRowImageCell,
  TagsCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'
import { Button } from '@components/shared/buttons/button'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

export const clientExchangeViewColumns = rowHandlers => [
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

    renderCell: params => <MultilineStatusCell status={params.value} />,

    width: 140,
  },

  {
    field: 'category',
    headerName: t(TranslationKey.Category),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Category)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 140,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 110,
    type: 'number',
  },

  {
    field: 'weight',
    headerName: t(TranslationKey.Weight),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Weight)} />,

    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    width: 90,
    type: 'number',
  },

  {
    field: 'bsr',
    headerName: t(TranslationKey.BSR),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 70,
    type: 'number',
  },

  {
    field: 'fbaamount',
    headerName: t(TranslationKey['Recommend amount']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Recommend amount'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 130,
    type: 'number',
  },

  {
    field: 'researcherName',
    headerName: t(TranslationKey.Researcher),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Researcher)} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.createdBy?._id} />
    ),
    width: 160,
  },

  {
    field: 'buyerName',
    headerName: t(TranslationKey.Buyer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Buyer)} />,

    renderCell: params => <UserLinkCell blackText name={params.value} userId={params.row.originalData.buyer?._id} />,
    width: 150,
  },

  {
    field: 'supervisorName',
    headerName: t(TranslationKey.Supervisor),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supervisor)} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.checkedBy?._id} />
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
        styleType={ButtonType.SUCCESS}
        width="100%"
        sx={{ height: '30px !important' }}
        onClick={() => rowHandlers.onClickLaunchPrivateLabelBtn(params.row.originalData)}
      >
        {t(TranslationKey['Buy for'])} {toFixedWithDollarSign(params.row.originalData.priceForClient, 2)}
      </Button>
    ),
  },

  {
    field: 'redFlags',
    headerName: t(TranslationKey['Red flags']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Red flags'])} />,

    width: 130,
    renderCell: params => <RedFlagsCell flags={params.row.originalData.redFlags} />,
    sortable: false,
  },

  {
    field: 'tags',
    headerName: t(TranslationKey.Tags),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tags)} />,

    width: 160,
    renderCell: params => <TagsCell tags={params.row.originalData.tags} />,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    minWidth: 120,
    // type: 'date',
  },
]

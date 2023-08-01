import React from 'react'

import { colorByIdeaStatus, ideaStatusByCode, ideaStatusTranslate } from '@constants/statuses/idea-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  AllIdeasActions,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  ShortDateCell,
  SmallRowImageCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { checkIsImageLink } from '@utils/checks'
import { minsToTime } from '@utils/text'
import { t } from '@utils/translations'

export const clientAllIdeasColumns = (rowHandlers, shops) => [
  {
    field: 'title',
    headerName: t(TranslationKey['Idea title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Idea title'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 190,
    filterable: false,
    sortable: false,
  },

  {
    field: 'status',
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    headerName: t(TranslationKey.Status),

    renderCell: params => (
      <MultilineTextCell
        text={ideaStatusTranslate(ideaStatusByCode[params.value])}
        color={colorByIdeaStatus(ideaStatusByCode[params.value])}
      />
    ),
    width: 160,
    sortable: false,
  },

  {
    field: 'ideaImage',
    headerName: t(TranslationKey.Idea),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Idea)} />,

    renderCell: params => <SmallRowImageCell image={params.row.linksToMediaFiles.find(el => checkIsImageLink(el))} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'comments',
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,
    headerName: t(TranslationKey['Client comment']),

    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
    width: 250,
    sortable: false,
  },

  {
    field: 'buyerComment',
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,
    headerName: t(TranslationKey['Client comment']),

    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
    width: 250,
    sortable: false,
  },

  {
    field: 'shop',
    headerName: t(TranslationKey.Shop),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

    renderCell: params => (
      <MultilineTextCell text={shops.find(el => params.row.parentProduct.shopIds.includes(el._id))?.name} />
    ),
    width: 100,
    sortable: false,
  },

  {
    field: 'childProduct',
    headerName: t(TranslationKey.Product),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    renderCell: params => {
      const product = params.value

      return (
        <ProductAsinCell
          image={product?.images?.slice()[0]}
          amazonTitle={product?.amazonTitle}
          asin={product?.asin}
          skusByClient={product?.skusByClient?.slice()[0]}
        />
      )
    },
    width: 265,
    sortable: false,
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: params => <AllIdeasActions row={params.row} rowHandlers={rowHandlers} />,
    width: 300,
    sortable: false,
  },

  {
    field: 'orderedQuantity',
    headerName: t(TranslationKey['Ordered quantity']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Ordered quantity'])} />,

    renderCell: params => <MultilineTextCell text={params.row?.parentProduct?.order?.amount} />,
    width: 140,
    sortable: false,
  },

  {
    field: 'intervalStatusNew',
    headerName: t(TranslationKey.New),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.New)} />,

    renderCell: params => <MultilineTextCell text={minsToTime(params.value / 60, 2)} />,
    width: 140,
    sortable: false,
  },

  {
    field: 'intervalStatusOnCheck',
    headerName: t(TranslationKey['On checking']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['On checking'])} />,

    renderCell: params => <MultilineTextCell text={minsToTime(params.value / 60, 2)} />,
    width: 140,
    sortable: false,
  },

  {
    field: 'intervalStatusSupplierSearch',
    headerName: t(TranslationKey['Supplier search']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Supplier search'])} />,

    renderCell: params => <MultilineTextCell text={minsToTime(params.value / 60, 2)} />,
    width: 140,
    sortable: false,
  },

  {
    field: 'intervalStatusSupplierFound',
    headerName: t(TranslationKey['Supplier found']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Supplier found'])} />,

    renderCell: params => <MultilineTextCell text={minsToTime(params.value / 60, 2)} />,
    width: 140,
    sortable: false,
  },

  {
    field: 'intervalStatusProductCreating',
    headerName: t(TranslationKey['Card creating']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Card creating'])} />,

    renderCell: params => <MultilineTextCell text={minsToTime(params.value / 60, 2)} />,
    width: 140,
    sortable: false,
  },

  {
    field: 'intervalStatusAddingAsin',
    headerName: t(TranslationKey['Adding ASIN']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Adding ASIN'])} />,

    renderCell: params => <MultilineTextCell text={minsToTime(params.value / 60, 2)} />,
    width: 140,
    sortable: false,
  },

  {
    field: 'intervalStatusFinished',
    headerName: t(TranslationKey.Verifying),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Verifying)} />,

    renderCell: params => <MultilineTextCell text={minsToTime(params.value / 60, 2)} />,
    width: 140,
    sortable: false,
  },

  {
    field: 'intervalsSum',
    headerName: t(TranslationKey['Elapsed time']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Elapsed time'])} />,

    renderCell: params => <MultilineTextCell color="#0B903E" text={minsToTime(params.value / 60, 2)} />,
    width: 140,
    sortable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey['Status Updated']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Status Updated'])} />,

    renderCell: params => <ShortDateCell value={params.value} />,
    width: 140,
  },
]

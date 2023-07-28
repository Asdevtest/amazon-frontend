import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  IdeaActions,
  IdeaRequests,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  ShortDateCell,
  SmallRowImageCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const clientNewIdeasColumns = (rowHandlers, shops) => [
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
    field: 'parentProduct',
    headerName: t(TranslationKey['Parent product']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Parent product'])} />,

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
    field: 'linksToMediaFiles',
    headerName: t(TranslationKey.Idea),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Idea)} />,

    renderCell: params => <SmallRowImageCell image={params.value[0]} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'comments',
    headerName: t(TranslationKey.Comment),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 240,
    sortable: false,
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: params => (
      <IdeaActions
        onClickToCheck={() => rowHandlers.onClickToCheck(params.row._id)}
        onClickReject={() => rowHandlers.onClickReject(params.row._id)}
      />
    ),
    width: 200,
    sortable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey['Status Updated']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Status Updated'])} />,

    renderCell: params => <ShortDateCell value={params.value} />,
    width: 140,
  },

  {
    field: 'requestsOnCheck',
    headerName: t(TranslationKey.Requests),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Requests)} />,

    renderCell: params => (
      <IdeaRequests
        row={params.row}
        onClickCreateRequest={() => rowHandlers.onClickCreateRequest(params.row._id)}
        onClickLinkRequest={() => rowHandlers.onClickLinkRequest(params.row._id)}
        onClickResultButton={() => rowHandlers.onClickResultButton(params.row._id)}
      />
    ),
    width: 220,
    sortable: false,
  },
]

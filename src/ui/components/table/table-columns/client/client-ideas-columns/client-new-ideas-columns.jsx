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

import { checkIsImageLink } from '@utils/checks'
import { t } from '@utils/translations'

export const clientNewIdeasColumns = (rowHandlers, shops) => [
  {
    field: 'title',
    headerName: t(TranslationKey['Idea title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Idea title'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 198,
    filterable: false,
    sortable: false,
  },

  {
    field: 'parentProduct',
    headerName: t(TranslationKey['Parent product']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Parent product'])} />,

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
    renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Shop)} />,

    renderCell: params => (
      <MultilineTextCell text={shops.find(el => params.row.parentProduct.shopIds.includes(el._id))?.name} />
    ),
    width: 100,
    sortable: false,
  },

  {
    field: 'linksToMediaFiles',
    headerName: t(TranslationKey.Idea),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Idea)} />,

    renderCell: params => <SmallRowImageCell image={params.value?.find(el => checkIsImageLink(el))} />,
    width: 96,
    sortable: false,
  },

  {
    field: 'comments',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
    width: 251,
    sortable: false,
  },

  {
    field: 'buyerComment',
    headerName: t(TranslationKey['Buyer comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,

    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
    width: 251,
    sortable: false,
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: params => (
      <IdeaActions
        onClickToCheck={() => rowHandlers.onClickToCheck(params.row._id)}
        onClickReject={() => rowHandlers.onClickReject(params.row._id)}
      />
    ),
    width: 270,
    sortable: false,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey['Status Updated']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Status Updated'])} />,

    renderCell: params => <ShortDateCell value={params.value} />,
    width: 91,
  },

  {
    field: 'requestsOnCheck',
    headerName: t(TranslationKey.Requests),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Requests)} />,

    renderCell: params => (
      <IdeaRequests
        row={params.row}
        onClickCreateRequest={() =>
          rowHandlers.onClickCreateRequest(params.row.parentProduct._id, params.row.parentProduct.asin)
        }
        onClickLinkRequest={() => rowHandlers.onClickLinkRequest(params.row.parentProduct._id, params.row.originalData)}
        onClickResultButton={() => rowHandlers.onClickResultButton(params.row._id)}
        onClickRequestId={rowHandlers.onClickRequestId}
      />
    ),
    width: 990,
    sortable: false,
  },
]

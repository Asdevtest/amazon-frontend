import React from 'react'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  IdeaRequests,
  MultilineTextCell,
  MultilineTextHeaderCell,
  OnCheckingIdeaActions,
  ProductAsinCell,
  ShortDateCell,
  SmallRowImageCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { checkIsImageLink } from '@utils/checks'
import { t } from '@utils/translations'

export const clientOnCheckingIdeasColumns = (rowHandlers, shops) => [
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
    columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'shopIds',
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Shop)} />,

    renderCell: params => (
      <MultilineTextCell text={shops.find(el => params.row.parentProduct.shopIds.includes(el._id))?.name} />
    ),
    width: 100,
    sortable: false,
    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'linksToMediaFiles',
    headerName: t(TranslationKey.Idea),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Idea)} />,

    renderCell: params => <SmallRowImageCell image={params.value.find(el => checkIsImageLink(el))} />,
    width: 96,
    sortable: false,
    filterable: false,
  },

  {
    field: 'comments',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
    width: 251,
    sortable: false,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'buyerComment',
    headerName: t(TranslationKey['Buyer comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,

    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
    width: 251,
    sortable: false,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: params => (
      <OnCheckingIdeaActions
        onClickAccept={() => rowHandlers.onClickAcceptOnCheckingStatus(params.row._id)}
        onClickReject={() => rowHandlers.onClickReject(params.row._id)}
      />
    ),
    width: 230,
    sortable: false,
    filterable: false,
  },

  {
    field: 'dateStatusOnCheck',
    headerName: t(TranslationKey['Status Updated']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Status Updated'])} />,

    renderCell: params => <ShortDateCell value={params.value} />,
    width: 91,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'requestsOnCheck',
    headerName: t(TranslationKey.Requests),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Requests)} />,

    renderCell: params => (
      <IdeaRequests
        row={params.row}
        onClickCreateRequest={() => rowHandlers.onClickCreateRequest(params.row)}
        onClickLinkRequest={() => rowHandlers.onClickLinkRequest(params.row._id)}
        onClickResultButton={() => rowHandlers.onClickResultButton(params.row._id)}
        onClickRequestId={rowHandlers.onClickRequestId}
      />
    ),
    width: 990,
    sortable: false,
    filterable: false,
  },
]

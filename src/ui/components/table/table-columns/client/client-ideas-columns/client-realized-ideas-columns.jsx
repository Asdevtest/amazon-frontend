import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  IdeaRequests,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  RealizedIdeaActions,
  ShortDateCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'
import { Button } from '@components/shared/buttons/button'

import { minsToTime } from '@utils/text'
import { t } from '@utils/translations'

export const clientRealizedIdeasColumns = (rowHandlers, shops) => [
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

    renderCell: params => <RealizedIdeaActions rowHandlers={rowHandlers} row={params.row} />,
    width: 140,
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
    field: 'comments',
    headerName: t(TranslationKey.Comment),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 240,
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
        withoutControls
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

import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  IdeaRequests,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  ShortDateCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'
import { Button } from '@components/shared/buttons/button'

import { minsToTime } from '@utils/text'
import { t } from '@utils/translations'

export const clientRealizedIdeasColumns = (rowHandlers, shops) => [
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
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

    renderCell: params => (
      <MultilineTextCell text={shops.find(el => params.row.parentProduct.shopIds.includes(el._id))?.name} />
    ),
    width: 100,
    sortable: false,
  },

  {
    field: 'childProduct',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

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
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: () => (
      <Button small success>
        {t(TranslationKey['To order'])}
      </Button>
    ),
    width: 140,
    sortable: false,
  },

  {
    field: 'intervalStatusNew',
    headerName: t(TranslationKey.New),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.New)} />,

    renderCell: params => <MultilineTextCell text={minsToTime(params.value / 60, 2)} />,
    width: 140,
    sortable: false,
  },

  {
    field: 'intervalStatusOnCheck',
    headerName: t(TranslationKey['On checking']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['On checking'])} />,

    renderCell: params => <MultilineTextCell text={minsToTime(params.value / 60, 2)} />,
    width: 140,
    sortable: false,
  },

  {
    field: 'intervalStatusSupplierSearch',
    headerName: t(TranslationKey['Supplier search']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Supplier search'])} />,

    renderCell: params => <MultilineTextCell text={minsToTime(params.value / 60, 2)} />,
    width: 140,
    sortable: false,
  },

  {
    field: 'intervalStatusSupplierFound',
    headerName: t(TranslationKey['Supplier found']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Supplier found'])} />,

    renderCell: params => <MultilineTextCell text={minsToTime(params.value / 60, 2)} />,
    width: 140,
    sortable: false,
  },

  {
    field: 'intervalStatusProductCreating',
    headerName: t(TranslationKey['Card creating']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Card creating'])} />,

    renderCell: params => <MultilineTextCell text={minsToTime(params.value / 60, 2)} />,
    width: 140,
    sortable: false,
  },

  {
    field: 'intervalStatusAddingAsin',
    headerName: t(TranslationKey['Adding ASIN']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Adding ASIN'])} />,

    renderCell: params => <MultilineTextCell text={minsToTime(params.value / 60, 2)} />,
    width: 140,
    sortable: false,
  },

  {
    field: 'intervalStatusFinished',
    headerName: t(TranslationKey.Verifying),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Verifying)} />,

    renderCell: params => <MultilineTextCell text={minsToTime(params.value / 60, 2)} />,
    width: 140,
    sortable: false,
  },

  {
    field: 'intervalsSum',
    headerName: t(TranslationKey['Elapsed time']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Elapsed time'])} />,

    renderCell: params => <MultilineTextCell color="#0B903E" text={minsToTime(params.value / 60, 2)} />,
    width: 140,
    sortable: false,
  },

  {
    field: 'comments',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 240,
    sortable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey['Status Updated']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Status Updated'])} />,

    renderCell: params => <ShortDateCell value={params.value} />,
    width: 140,
  },

  {
    field: 'requestsOnCheck',
    headerName: t(TranslationKey.Requests),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Requests)} />,

    renderCell: params => (
      <IdeaRequests
        withoutControls
        onClickCreateRequest={() => rowHandlers.onClickCreateRequest(params.row._id)}
        onClickLinkRequest={() => rowHandlers.onClickLinkRequest(params.row._id)}
      />
    ),
    width: 220,
    sortable: false,
  },
]

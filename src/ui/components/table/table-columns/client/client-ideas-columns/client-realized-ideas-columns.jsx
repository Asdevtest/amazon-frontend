import React from 'react'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  IdeaRequests,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  RealizedIdeaActions,
  ShortDateCell,
  TimeFromSeconds,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

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
    field: 'childProduct',
    headerName: t(TranslationKey['Child product']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Child product'])} />,

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
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: params => <RealizedIdeaActions rowHandlers={rowHandlers} row={params.row} />,
    width: 140,
    sortable: false,
    filterable: false,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey['Ordered quantity']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Ordered quantity'])} />,

    renderCell: params => <MultilineTextCell text={params.row?.parentProduct?.order?.amount} />,
    width: 110,
    sortable: false,
    filterable: false,
  },

  {
    field: 'orderedDate',
    headerName: t(TranslationKey['Order date']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Order date'])} />,

    renderCell: params => <ShortDateCell value={params.row?.parentProduct?.order?.createdAt} />,
    width: 110,
    sortable: false,
    filterable: false,
  },

  {
    field: 'intervalStatusNew',
    headerName: t(TranslationKey.New),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.New)} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 91,
    columnKey: columnnsKeys.shared.SECONDS,
  },

  {
    field: 'intervalStatusOnCheck',
    headerName: t(TranslationKey['On checking']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['On checking'])} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 91,
    columnKey: columnnsKeys.shared.SECONDS,
  },

  {
    field: 'intervalStatusSupplierSearch',
    headerName: t(TranslationKey['Supplier search']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Supplier search'])} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 110,
    columnKey: columnnsKeys.shared.SECONDS,
  },

  {
    field: 'intervalStatusSupplierFound',
    headerName: t(TranslationKey['Supplier found']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Supplier found'])} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 91,
    columnKey: columnnsKeys.shared.SECONDS,
  },

  {
    field: 'intervalStatusProductCreating',
    headerName: t(TranslationKey['Card creating']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Card creating'])} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 91,
    columnKey: columnnsKeys.shared.SECONDS,
  },

  {
    field: 'intervalStatusAddingAsin',
    headerName: t(TranslationKey['Adding ASIN']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Adding ASIN'])} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 91,
    columnKey: columnnsKeys.shared.SECONDS,
  },

  {
    field: 'intervalStatusFinished',
    headerName: t(TranslationKey.Verifying),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Verifying)} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 91,
    columnKey: columnnsKeys.shared.SECONDS,
  },

  {
    field: 'intervalsSum',
    headerName: t(TranslationKey['Elapsed time']),
    renderHeader: () => <MultilineTextHeaderCell color="#0B903E" text={t(TranslationKey['Elapsed time'])} />,

    renderCell: params => <TimeFromSeconds color="#0B903E" seconds={params.value} />,
    width: 91,
    columnKey: columnnsKeys.shared.SECONDS,
  },

  {
    field: 'comments',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
    width: 250,
    sortable: false,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'buyerComment',
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,
    headerName: t(TranslationKey['Client comment']),

    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
    width: 250,
    sortable: false,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'updatedAt',
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
        onClickCreateRequest={() =>
          rowHandlers.onClickCreateRequest(params.row.parentProduct._id, params.row.parentProduct.asin)
        }
        onClickLinkRequest={() => rowHandlers.onClickLinkRequest(params.row._id)}
        onClickResultButton={rowHandlers.onClickResultButton}
        onClickRequestId={rowHandlers.onClickRequestId}
      />
    ),
    width: 990,
    sortable: false,
    filterable: false,
  },
]

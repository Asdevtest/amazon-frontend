import React from 'react'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { colorByIdeaStatus, ideaStatusByCode, ideaStatusTranslate } from '@constants/statuses/idea-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  AllIdeasActions,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  ShortDateCell,
  SmallRowImageCell,
  TimeFromSeconds,
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
    sortable: false,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'status',
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    headerName: t(TranslationKey.Status),

    renderCell: params => (
      <MultilineTextCell
        leftAlign
        text={ideaStatusTranslate(ideaStatusByCode[params.value])}
        color={colorByIdeaStatus(ideaStatusByCode[params.value])}
      />
    ),
    width: 84,
    sortable: false,
    filterable: false,
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
    field: 'ideaImage',
    headerName: t(TranslationKey.Idea),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Idea)} />,

    renderCell: params => <SmallRowImageCell image={params.row.linksToMediaFiles.find(el => checkIsImageLink(el))} />,
    width: 96,
    sortable: false,
    filterable: false,
  },

  {
    field: 'comments',
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,
    headerName: t(TranslationKey['Client comment']),

    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
    width: 250,
    sortable: false,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'buyerComment',
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,
    headerName: t(TranslationKey['Buyer comment']),

    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
    width: 250,
    sortable: false,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'shopIds',
    headerName: t(TranslationKey.Shop),
    renderHeader: params => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Shop)} />,

    renderCell: params => (
      <MultilineTextCell text={shops.find(el => params.row.parentProduct.shopIds.includes(el._id))?.name} />
    ),
    width: 100,
    sortable: false,
    columnKey: columnnsKeys.shared.OBJECT,
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
    filterable: false,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey['Ordered quantity']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Ordered quantity'])} />,

    renderCell: params => <MultilineTextCell text={params.row?.parentProduct?.order?.amount} />,
    width: 110,
    sortable: false,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'intervalStatusNew',
    headerName: t(TranslationKey.New),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.New)} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 91,
    sortable: false,
    columnKey: columnnsKeys.shared.SECONDS,
  },

  {
    field: 'intervalStatusOnCheck',
    headerName: t(TranslationKey['On checking']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['On checking'])} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 91,
    sortable: false,
    columnKey: columnnsKeys.shared.SECONDS,
  },

  {
    field: 'intervalStatusSupplierSearch',
    headerName: t(TranslationKey['Supplier search']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Supplier search'])} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 110,
    sortable: false,
    columnKey: columnnsKeys.shared.SECONDS,
  },

  {
    field: 'intervalStatusSupplierFound',
    headerName: t(TranslationKey['Supplier found']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Supplier found'])} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 91,
    sortable: false,
    columnKey: columnnsKeys.shared.SECONDS,
  },

  {
    field: 'intervalStatusProductCreating',
    headerName: t(TranslationKey['Card creating']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Card creating'])} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 91,
    sortable: false,
    columnKey: columnnsKeys.shared.SECONDS,
  },

  {
    field: 'intervalStatusAddingAsin',
    headerName: t(TranslationKey['Adding ASIN']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Adding ASIN'])} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 91,
    sortable: false,
    columnKey: columnnsKeys.shared.SECONDS,
  },

  {
    field: 'intervalStatusFinished',
    headerName: t(TranslationKey.Verifying),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Verifying)} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 91,
    sortable: false,
    columnKey: columnnsKeys.shared.SECONDS,
  },

  {
    field: 'intervalsSum',
    headerName: t(TranslationKey['Elapsed time']),
    renderHeader: params => <MultilineTextHeaderCell color="#0B903E" text={t(TranslationKey['Elapsed time'])} />,

    renderCell: params => <TimeFromSeconds color="#0B903E" seconds={params.value} />,

    width: 91,
    sortable: false,
    columnKey: columnnsKeys.shared.SECONDS,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey['Status Updated']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Status Updated'])} />,

    renderCell: params => <ShortDateCell value={params.value} />,
    width: 91,
    columnKey: columnnsKeys.shared.DATE,
  },
]

import React from 'react'

import { Box } from '@mui/material'

import { colorByIdeaStatus, ideaStatusByCode, ideaStatusTranslate } from '@constants/statuses/idea-status.ts'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ClosedIdeaActions,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  ShortDateCell,
  SmallRowImageCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'
import { Button } from '@components/shared/buttons/button'

import { checkIsImageLink } from '@utils/checks'
import { minsToTime } from '@utils/text'
import { t } from '@utils/translations'

export const clientClosedIdeasColumns = (rowHandlers, shops) => [
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

    renderCell: params => <SmallRowImageCell image={params.value.find(el => checkIsImageLink(el))} />,
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
    field: 'intervalStatusNew',
    headerName: t(TranslationKey.New),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.New)} />,

    renderCell: params => (
      <MultilineTextCell
        text={
          params.value >= 60
            ? minsToTime(params.value / 60)
            : params.value && params.value + ' ' + t(TranslationKey.sec)
        }
      />
    ),
    width: 140,
    sortable: false,
  },

  {
    field: 'intervalStatusOnCheck',
    headerName: t(TranslationKey['On checking']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['On checking'])} />,

    renderCell: params => (
      <MultilineTextCell
        text={
          params.value >= 60
            ? minsToTime(params.value / 60)
            : params.value && params.value + ' ' + t(TranslationKey.sec)
        }
      />
    ),
    width: 140,
    sortable: false,
  },

  {
    field: 'intervalStatusSupplierSearch',
    headerName: t(TranslationKey['Supplier search']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Supplier search'])} />,

    renderCell: params => (
      <MultilineTextCell
        text={
          params.value >= 60
            ? minsToTime(params.value / 60)
            : params.value && params.value + ' ' + t(TranslationKey.sec)
        }
      />
    ),
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

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: params => <ClosedIdeaActions row={params.row} rowHandlers={rowHandlers} />,
    width: 140,
  },
]

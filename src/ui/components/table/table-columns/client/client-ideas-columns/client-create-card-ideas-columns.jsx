import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  CreateCardIdeaActions,
  IdeaProduct,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  ShortDateCell,
  SmallRowImageCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { checkIsImageLink } from '@utils/checks'
import { t } from '@utils/translations'

export const clientCreateCardIdeasColumns = (rowHandlers, shops) => [
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
    field: 'ideaImage',
    headerName: t(TranslationKey.Idea),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Idea)} />,

    renderCell: params => <SmallRowImageCell image={params.row.linksToMediaFiles.find(el => checkIsImageLink(el))} />,
    width: 96,
    sortable: false,
  },

  {
    field: 'product',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
    headerName: t(TranslationKey.Product),

    renderCell: params => (
      <IdeaProduct
        rowData={params.row}
        onClickCreateCard={rowHandlers.onClickCreateCard}
        onClickSelectSupplier={rowHandlers.onClickSelectSupplier}
      />
    ),
    width: 290,
    sortable: false,
  },

  {
    field: 'comments',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,
    headerName: t(TranslationKey['Client comment']),

    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
    width: 250,
    sortable: false,
  },

  {
    field: 'buyerComment',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,
    headerName: t(TranslationKey['Client comment']),

    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
    width: 250,
    sortable: false,
  },

  {
    field: 'actions',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
    headerName: t(TranslationKey.Action),

    renderCell: params => <CreateCardIdeaActions row={params.row} rowHandlers={rowHandlers} />,
    width: 110,
    sortable: false,
  },

  {
    field: 'dateStatusProductCreating',
    headerName: t(TranslationKey['Status Updated']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Status Updated'])} />,

    renderCell: params => <ShortDateCell value={params.value} />,
    width: 91,
  },
]

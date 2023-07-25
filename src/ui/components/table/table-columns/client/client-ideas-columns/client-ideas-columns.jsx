import React from 'react'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  SmallRowImageCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const clientIdeasColumns = () => [
  {
    field: 'title',
    headerName: t(TranslationKey.Boxes),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Boxes)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 200,
    filterable: false,
    sortable: false,
  },

  {
    field: 'parentProduct',
    headerName: t(TranslationKey.ASIN),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,

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
    width: 295,
    columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'shop',
    headerName: t(TranslationKey.Shop),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

    renderCell: params => <MultilineTextCell text={params.row.parentProduct.shopIds} />,
    width: 295,
    columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'linksToMediaFiles',
    headerName: t(TranslationKey.Shop),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

    renderCell: params => <SmallRowImageCell image={params.value[0]} />,
    width: 295,
    columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },
]

import React from 'react'

import { Box } from '@mui/material'

import { colorByIdeaStatus, ideaStatusByCode, ideaStatusTranslate } from '@constants/statuses/idea-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  IdeaActions,
  IdeaRequests,
  IdeaSupplier,
  MultilineTextCell,
  MultilineTextHeaderCell,
  PhotoAndFilesCell,
  ProductAsinCell,
  ShortDateCell,
  SmallRowImageCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'
import { FilesCarousel } from '@components/shared/files-carousel'
import { LinkWithCopy } from '@components/shared/link-with-copy'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

export const clientSearchSuppliersIdeasColumns = (rowHandlers, shops) => [
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
    field: 'ideaImage',
    headerName: t(TranslationKey.Idea),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Idea)} />,

    renderCell: params => <SmallRowImageCell image={params.row.linksToMediaFiles[0]} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'suppliers',
    headerName: t(TranslationKey.Supplier),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Supplier)} />,

    renderCell: params => <IdeaSupplier suppliers={params.value} />,
    width: 150,
    sortable: false,
  },

  {
    field: 'link',
    headerName: t(TranslationKey.Link),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Link)} />,

    renderCell: params => {
      const suppliers = params.row.suppliers

      if (!suppliers.length) {
        return <MultilineTextCell text="" />
      }

      return suppliers[0].link ? (
        <LinkWithCopy url={suppliers[0].link} valueToCopy={suppliers[0].link} title={t(TranslationKey.Site)} />
      ) : (
        <MultilineTextCell text={t(TranslationKey['Link not available'])} />
      )
    },
    width: 100,
    sortable: false,
  },

  {
    field: 'priceWithDelivery',
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Price with delivery']) + '$'} />,
    headerName: t(TranslationKey['Price with delivery']) + '$',

    renderCell: params => <MultilineTextCell text={toFixed(params.row.suppliers?.[0]?.batchTotalCostInDollar, 2)} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'minBatch',
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Minimum batch'])} />,
    headerName: t(TranslationKey['Minimum batch']),

    renderCell: params => <MultilineTextCell text={params.row.suppliers?.[0]?.minlot} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'productionTime',
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,
    headerName: t(TranslationKey['Production time, days']),

    renderCell: params => <MultilineTextCell text={params.row.suppliers?.[0]?.productionTerm} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'linksToMediaFiles',
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Files)} />,
    headerName: t(TranslationKey.Files),

    renderCell: params => (
      <Box py="20px">
        <FilesCarousel withImages hideNames files={params.row.linksToMediaFiles} />
      </Box>
    ),
    width: 140,
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
]

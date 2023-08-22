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
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    headerName: t(TranslationKey.Status),

    renderCell: params => (
      <MultilineTextCell
        leftAlign
        text={ideaStatusTranslate(ideaStatusByCode[params.value])}
        color={colorByIdeaStatus(ideaStatusByCode[params.value])}
      />
    ),
    width: 130,
    columnKey: columnnsKeys.client.IDEAS_STATUS,
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
    columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'ideaImage',
    headerName: t(TranslationKey.Idea),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Idea)} />,

    renderCell: params => <SmallRowImageCell image={params.row.linksToMediaFiles.find(el => checkIsImageLink(el))} />,
    width: 96,
    sortable: false,
    filterable: false,
  },

  {
    field: 'comments',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,
    headerName: t(TranslationKey['Client comment']),

    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
    width: 250,
    sortable: false,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'buyerComment',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,
    headerName: t(TranslationKey['Buyer comment']),

    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
    width: 250,
    sortable: false,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: ['parentProductShopIds', 'childProductShopIds'],
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Shop)} />,

    renderCell: params => (
      <MultilineTextCell text={shops.find(el => params.row.parentProduct.shopIds.includes(el._id))?.name} />
    ),
    width: 100,
    sortable: false,
    columnKey: columnnsKeys.client.IDEA_SHOPS,
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

    renderCell: params => <AllIdeasActions row={params.row} rowHandlers={rowHandlers} />,
    width: 300,
    sortable: false,
    filterable: false,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey['Ordered quantity']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Ordered quantity'])} />,

    renderCell: params => <MultilineTextCell text={params.row?.parentProduct?.order?.amount} />,
    width: 110,
    filterable: false,
    sortable: false,
  },

  {
    field: 'intervalStatusNew',
    headerName: t(TranslationKey.New),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.New)} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 91,
    columnKey: columnnsKeys.shared.DATE_DETAILS,
  },

  {
    field: 'intervalStatusOnCheck',
    headerName: t(TranslationKey['On checking']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['On checking'])} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 105,
    columnKey: columnnsKeys.shared.DATE_DETAILS,
  },

  {
    field: 'intervalStatusSupplierSearch',
    headerName: t(TranslationKey['Supplier search']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Supplier search'])} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 110,
    columnKey: columnnsKeys.shared.DATE_DETAILS,
  },

  {
    field: 'intervalStatusSupplierFound',
    headerName: t(TranslationKey['Supplier found']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Supplier found'])} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 120,

    columnKey: columnnsKeys.shared.DATE_DETAILS,
  },

  {
    field: 'intervalStatusProductCreating',
    headerName: t(TranslationKey['Card creating']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Card creating'])} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 100,
    columnKey: columnnsKeys.shared.DATE_DETAILS,
  },

  {
    field: 'intervalStatusAddingAsin',
    headerName: t(TranslationKey['Adding ASIN']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Adding ASIN'])} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 106,
    columnKey: columnnsKeys.shared.DATE_DETAILS,
  },

  /* {
    field: 'intervalStatusFinished',
    headerName: t(TranslationKey.Verifying),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Verifying)} />,

    renderCell: params => <TimeFromSeconds seconds={params.value} />,
    width: 105,
    columnKey: columnnsKeys.shared.DATE_DETAILS,
  }, */

  {
    field: 'intervalsSum',
    headerName: t(TranslationKey['Elapsed time']),
    renderHeader: () => <MultilineTextHeaderCell color="#0B903E" text={t(TranslationKey['Elapsed time'])} />,

    renderCell: params => <TimeFromSeconds color="#0B903E" seconds={params.value} />,

    width: 120,

    columnKey: columnnsKeys.shared.DATE_DETAILS,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey['Status Updated']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Status Updated'])} />,

    renderCell: params => <ShortDateCell value={params.value} />,
    width: 100,
    columnKey: columnnsKeys.shared.DATE,
  },
]

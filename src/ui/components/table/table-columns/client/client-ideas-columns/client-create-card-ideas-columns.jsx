import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  CreateCardIdeaActionsCell,
  IdeaProductCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  ShortDateCell,
  SmallRowImageCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { checkIsMediaFileLink } from '@utils/checks'
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
          image={product?.images?.[0]}
          amazonTitle={product?.amazonTitle}
          asin={product?.asin}
          skuByClient={product?.skuByClient}
        />
      )
    },
    width: 265,
    sortable: false,
    columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: ['parentProductShop', 'childProductShop'],
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Shop)} />,

    renderCell: params => (
      <MultilineTextCell twoLines text={shops?.find(el => params?.row?.parentProduct?.shopId === el?._id)?.name} />
    ),
    width: 100,
    sortable: false,
    columnKey: columnnsKeys.client.IDEA_SHOPS,
  },

  {
    field: 'ideaImage',
    headerName: t(TranslationKey.Idea),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Idea)} />,

    renderCell: params => (
      <SmallRowImageCell image={params.row.linksToMediaFiles.find(el => checkIsMediaFileLink(el))} />
    ),
    width: 96,
    sortable: false,
    filterable: false,
  },

  {
    field: 'childProduct',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Child product'])} />,
    headerName: t(TranslationKey['Child product']),

    renderCell: params => (
      <IdeaProductCell
        rowData={params.row}
        onClickCreateCard={rowHandlers.onClickCreateCard}
        onClickSelectSupplier={rowHandlers.onClickSelectSupplier}
      />
    ),
    width: 290,
    sortable: false,
    columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'comments',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,
    headerName: t(TranslationKey['Client comment']),

    renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={95} text={params.value} />,
    width: 250,
    sortable: false,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'buyerComment',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,
    headerName: t(TranslationKey['Buyer comment']),

    renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={95} text={params.value} />,
    width: 250,
    sortable: false,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'actions',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
    headerName: t(TranslationKey.Action),

    renderCell: params => <CreateCardIdeaActionsCell row={params.row} rowHandlers={rowHandlers} />,
    width: 110,
    sortable: false,
    filterable: false,
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey['Created by']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

    renderCell: ({ row }) => (
      <UserLinkCell
        blackText
        name={row.sub?.name || row.createdBy?.name}
        userId={row.sub?._id || row?.createdBy?._id}
      />
    ),
    width: 130,

    filterable: false,
    sortable: false,

    columnKey: columnnsKeys.client.FREELANCE_REQUESTS_CREATED_BY,
  },

  {
    field: 'dateStatusProductCreating',
    headerName: t(TranslationKey['Status Updated']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Status Updated'])} />,

    renderCell: params => <ShortDateCell value={params.value} />,
    width: 91,
    columnKey: columnnsKeys.shared.DATE,
  },
]

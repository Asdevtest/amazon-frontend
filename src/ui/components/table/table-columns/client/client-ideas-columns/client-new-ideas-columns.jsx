import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  IdeaActionsCell,
  IdeaRequestsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  ShortDateCell,
  SmallRowImageCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { checkIsImageLink } from '@utils/checks'
import { t } from '@utils/translations'

export const clientNewIdeasColumns = (rowHandlers, shops) => [
  {
    field: 'title',
    headerName: t(TranslationKey['Idea title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Idea title'])} />,

    renderCell: params => <MultilineTextCell twoLines maxLength={45} text={params.value} />,
    width: 198,
    filterable: false,

    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'parentProduct',
    headerName: t(TranslationKey['Parent product']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Parent product'])} />,

    renderCell: params => {
      const product = params.row.parentProduct

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
    field: ['parentProductShopId', 'childProductShopId'],
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Shop)} />,

    renderCell: params => (
      <MultilineTextCell twoLines text={shops?.find(el => el?._id === params?.row?.parentProduct?.shopId)?.name} />
    ),
    width: 100,
    sortable: false,
    columnKey: columnnsKeys.client.IDEA_SHOPS,
  },

  {
    field: 'linksToMediaFiles',
    headerName: t(TranslationKey.Idea),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Idea)} />,

    renderCell: params => <SmallRowImageCell image={params.value?.find(el => checkIsImageLink(el))} />,
    width: 96,
    sortable: false,
    filterable: false,
  },

  {
    field: 'comments',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

    renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={95} text={params.value} />,
    width: 251,
    sortable: false,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'buyerComment',
    headerName: t(TranslationKey['Buyer comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,

    renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={95} text={params.value} />,
    width: 251,
    sortable: false,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: params => (
      <IdeaActionsCell
        onClickToCheck={() => rowHandlers.onClickToCheck(params.row._id)}
        onClickReject={() => rowHandlers.onClickReject(params.row._id)}
      />
    ),
    width: 270,
    sortable: false,
    filterable: false,
  },

  {
    field: 'createdAt',
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
      <IdeaRequestsCell
        row={params.row}
        onClickCreateRequest={() => rowHandlers.onClickCreateRequest(params.row)}
        onClickLinkRequest={() => rowHandlers.onClickLinkRequest(params.row.originalData)}
        onClickResultButton={rowHandlers.onClickResultButton}
        onClickUnbindButton={rowHandlers.onClickUnbindButton}
        onClickRequestId={rowHandlers.onClickRequestId}
      />
    ),
    width: 990,
    sortable: false,
  },
]

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  IdeaActionsCell,
  IdeaRequestsCell,
  ManyUserLinkCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  ShortDateCell,
  SmallRowImageCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { checkIsMediaFileLink } from '@utils/checks'
import { t } from '@utils/translations'

export const clientNewIdeasColumns = rowHandlers => {
  const columns = [
    {
      field: 'title',
      headerName: t(TranslationKey['Idea title']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Idea title'])} />,

      renderCell: params => <MultilineTextCell twoLines maxLength={45} text={params.value} />,
      minWidth: 198,
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
      minWidth: 260,

      columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
      table: DataGridFilterTables.PRODUCTS,
      disableCustomSort: true,
    },

    {
      field: 'parentProductShop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Shop)} />,

      renderCell: params => <MultilineTextCell twoLines text={params?.row?.parentProduct?.shop?.name} />,
      minWidth: 100,

      columnKey: columnnsKeys.client.IDEA_SHOPS,
      table: DataGridFilterTables.PRODUCTS,
      disableCustomSort: true,
    },

    {
      field: 'linksToMediaFiles',
      headerName: t(TranslationKey.Idea),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Idea)} />,

      renderCell: params => <SmallRowImageCell image={params.value?.find(el => checkIsMediaFileLink(el))} />,
      minWidth: 96,

      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'comments',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

      renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={95} text={params.value} />,
      minWidth: 251,

      columnKey: columnnsKeys.shared.STRING,
      disableCustomSort: true,
    },

    {
      field: 'buyerComment',
      headerName: t(TranslationKey['Buyer comment']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,

      renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={95} text={params.value} />,
      minWidth: 251,

      columnKey: columnnsKeys.shared.STRING,
      disableCustomSort: true,
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

      minWidth: 160,
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey['Status Updated']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Status Updated'])} />,

      renderCell: params => <ShortDateCell value={params.value} />,
      minWidth: 91,
      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

      renderCell: params => <ShortDateCell value={params.value} />,
      minWidth: 91,
      columnKey: columnnsKeys.shared.DATE,
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
      minWidth: 130,

      filterable: false,
      disableCustomSort: true,
      columnKey: columnnsKeys.client.FREELANCE_REQUESTS_CREATED_BY,
    },

    {
      field: 'subUsers',
      headerName: t(TranslationKey['Access to product']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Access to product'])} />,
      renderCell: params => {
        const subUsers = params.row?.parentProduct?.subUsers || []
        const subUsersByShop = params.row?.parentProduct?.subUsersByShop || []

        return <ManyUserLinkCell usersData={subUsers?.concat(subUsersByShop)} />
      },
      valueGetter: ({ row }) => {
        const subUsers = row?.parentProduct?.subUsers || []
        const subUsersByShop = row?.parentProduct?.subUsersByShop || []

        return subUsers?.concat(subUsersByShop).join(', ')
      },
      minWidth: 160,
      filterable: false,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'requestsOnCheck',
      headerName: t(TranslationKey.Requests),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Requests)} />,

      renderCell: params => (
        <IdeaRequestsCell
          row={params.row}
          onClickCreateRequest={() => rowHandlers.onClickCreateRequest(params.row)}
          onClickLinkRequest={() => rowHandlers.onClickLinkRequest(params.row)}
          onClickResultButton={rowHandlers.onClickResultButton}
          onClickUnbindButton={rowHandlers.onClickUnbindButton}
          onClickRequestId={rowHandlers.onClickRequestId}
        />
      ),
      minWidth: 990,
      disableCustomSort: true,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.IDEAS
    }
    column.sortable = false
  }

  return columns
}

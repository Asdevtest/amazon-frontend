import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  IdeaRequestsCell,
  ManyUserLinkCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  OnCheckingIdeaActionsCell,
  ProductAsinCell,
  ShortDateCell,
  SmallRowImageCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { checkIsMediaFileLink } from '@utils/checks'
import { t } from '@utils/translations'

import {
  ProductColumnMenuType,
  getProductColumnMenuItems,
  getProductColumnMenuValue,
} from '@config/data-grid-column-menu/product-column'

export const clientOnCheckingIdeasColumns = rowHandlers => {
  const columns = [
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

      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue({ columnType: ProductColumnMenuType.PARENT }),
      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 260,
      minWidth: 100,
    },

    {
      field: 'parentProductShop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Shop)} />,

      renderCell: params => <MultilineTextCell twoLines text={params?.row?.parentProduct?.shop?.name} />,
      width: 100,

      columnKey: columnnsKeys.client.IDEA_SHOPS,
      table: DataGridFilterTables.PRODUCTS,
      disableCustomSort: true,
    },

    {
      field: 'linksToMediaFiles',
      headerName: t(TranslationKey.Idea),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Idea)} />,

      renderCell: params => <SmallRowImageCell image={params.value.find(el => checkIsMediaFileLink(el))} />,
      width: 96,

      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'comments',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

      renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
      width: 251,

      columnKey: columnnsKeys.shared.STRING,
      disableCustomSort: true,
    },

    {
      field: 'buyerComment',
      headerName: t(TranslationKey['Buyer comment']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,

      renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
      width: 251,

      columnKey: columnnsKeys.shared.STRING,
      disableCustomSort: true,
    },

    {
      field: 'actions',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

      renderCell: params => (
        <OnCheckingIdeaActionsCell
          onClickAccept={() => rowHandlers.onClickAcceptOnCheckingStatus(params.row._id)}
          onClickReject={() => rowHandlers.onClickReject(params.row._id)}
        />
      ),
      width: 150,
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'dateStatusOnCheck',
      headerName: t(TranslationKey['Status Updated']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Status Updated'])} />,

      renderCell: params => <ShortDateCell value={params.value} />,
      width: 91,
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
      width: 130,

      filterable: false,
      columnKey: columnnsKeys.client.FREELANCE_REQUESTS_CREATED_BY,
      disableCustomSort: true,
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
      width: 187,
      table: DataGridFilterTables.PRODUCTS,
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
      width: 990,
      disableCustomSort: true,
      filterable: false,
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

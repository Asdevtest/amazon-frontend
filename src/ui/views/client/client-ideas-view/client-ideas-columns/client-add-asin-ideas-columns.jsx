import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  AddAsinIdeaActionsCell,
  ChangeChipCell,
  IdeaRequestsCell,
  ManyUserLinkCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  ShortDateCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import {
  ProductColumnMenuType,
  getProductColumnMenuItems,
  getProductColumnMenuValue,
} from '@config/data-grid-column-menu/product-column'

import { accessToProductColumnMenuConfig, shopColumnMenuConfig, shopFields } from '../columns-menu.config'

export const clientAddAsinIdeasColumns = rowHandlers => {
  const columns = [
    {
      field: 'title',
      headerName: t(TranslationKey['Idea title']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Idea title'])} />,

      renderCell: params => <MultilineTextCell text={params.row.productName} />,
      width: 198,
      filterable: false,

      columnKey: columnnsKeys.shared.STRING,
    },

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
      disableCustomSort: true,

      fields: shopFields,
      columnMenuConfig: shopColumnMenuConfig,
      columnKey: columnnsKeys.shared.MULTIPLE,
    },

    {
      field: 'childProduct',
      headerName: t(TranslationKey['Child product']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Child product'])} />,

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
      columnMenuConfig: getProductColumnMenuValue({ columnType: ProductColumnMenuType.CHILD }),

      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 260,
      minWidth: 100,
    },

    {
      field: 'barcode',
      headerName: t(TranslationKey.BarCode),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

      renderCell: params => {
        const product = params.row.variation ? params.row?.childProduct : params.row?.parentProduct

        return (
          <ChangeChipCell
            disabled={params.row.variation && !params.row.childProduct}
            text={t(TranslationKey.BarCode)}
            value={product?.barCode}
            onClickChip={() => rowHandlers.barCodeHandlers.onClickBarcode(product)}
            onDoubleClickChip={() => rowHandlers.barCodeHandlers.onDoubleClickBarcode(product)}
            onDeleteChip={!product?.barCode ? undefined : () => rowHandlers.barCodeHandlers.onDeleteBarcode(product)}
          />
        )
      },
      width: 200,
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'actions',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

      renderCell: params => <AddAsinIdeaActionsCell rowHandlers={rowHandlers} row={params.row} />,
      width: 160,
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'dateStatusAddingAsin',
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
      width: 187,
      filterable: false,
      disableCustomSort: true,

      fields: shopFields,
      columnMenuConfig: accessToProductColumnMenuConfig,
      columnKey: columnnsKeys.shared.MULTIPLE,
    },

    {
      field: 'requestsOnCheck',
      headerName: t(TranslationKey.Requests),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Requests)} />,

      renderCell: params => (
        <IdeaRequestsCell
          row={params.row}
          onFinishedOnly
          onClickCreateRequest={() => rowHandlers.onClickCreateRequest(params.row)}
          onClickLinkRequest={() => rowHandlers.onClickLinkRequest(params.row)}
          onClickResultButton={rowHandlers.onClickResultButton}
          onClickUnbindButton={rowHandlers.onClickUnbindButton}
          onClickRequestId={rowHandlers.onClickRequestId}
        />
      ),
      width: 690,
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

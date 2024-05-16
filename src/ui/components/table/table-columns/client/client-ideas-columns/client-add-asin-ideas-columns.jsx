import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  AddAsinIdeaActionsCell,
  ChangeChipCell,
  IdeaRequestsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  ShortDateCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

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
      width: 265,

      columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
      table: DataGridFilterTables.PRODUCTS,
    },

    {
      field: 'parentProductShop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Shop)} />,

      renderCell: params => <MultilineTextCell twoLines text={params?.row?.parentProduct?.shop?.name} />,
      width: 100,

      columnKey: columnnsKeys.client.IDEA_SHOPS,
      table: DataGridFilterTables.PRODUCTS,
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
      width: 265,

      columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
      table: DataGridFilterTables.PRODUCTS,
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
      width: 150,

      filterable: false,
    },

    {
      field: 'actions',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

      renderCell: params => <AddAsinIdeaActionsCell rowHandlers={rowHandlers} row={params.row} />,
      width: 110,

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

      columnKey: columnnsKeys.client.FREELANCE_REQUESTS_CREATED_BY,
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

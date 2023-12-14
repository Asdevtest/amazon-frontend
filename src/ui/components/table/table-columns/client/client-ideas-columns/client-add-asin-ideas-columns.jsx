import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  AddAsinIdeaActionsCell,
  BarcodeCell,
  IdeaRequestsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  ShortDateCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const clientAddAsinIdeasColumns = (rowHandlers, shops) => [
  {
    field: 'title',
    headerName: t(TranslationKey['Idea title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Idea title'])} />,

    renderCell: params => <MultilineTextCell text={params.row.originalData.productName} />,
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
    field: ['parentProductShopIds', 'childProductShopIds'],
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Shop)} />,

    renderCell: params => (
      <MultilineTextCell
        twoLines
        text={shops?.find(el => params?.row?.parentProduct?.shopIds?.includes(el?._id))?.name}
      />
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
    field: 'barcode',
    headerName: t(TranslationKey.BarCode),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

    renderCell: params => {
      return (
        <BarcodeCell
          disabled={params.row.originalData.variation && !params.row.originalData.childProduct}
          product={
            params.row.originalData.variation
              ? params.row?.originalData?.childProduct
              : params.row?.originalData?.parentProduct
          }
          handlers={rowHandlers.barCodeHandlers}
        />
      )
    },
    width: 113,
    sortable: false,
    filterable: false,
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: params => <AddAsinIdeaActionsCell rowHandlers={rowHandlers} row={params.row} />,
    width: 110,
    sortable: false,
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
    field: 'requestsOnCheck',
    headerName: t(TranslationKey.Requests),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Requests)} />,

    renderCell: params => (
      <IdeaRequestsCell
        row={params.row}
        onFinishedOnly
        onClickCreateRequest={() => rowHandlers.onClickCreateRequest(params.row)}
        onClickLinkRequest={() => rowHandlers.onClickLinkRequest(params.row.originalData)}
        onClickResultButton={rowHandlers.onClickResultButton}
        onClickUnbindButton={rowHandlers.onClickUnbindButton}
        onClickRequestId={rowHandlers.onClickRequestId}
      />
    ),
    width: 690,
    sortable: false,
  },
]

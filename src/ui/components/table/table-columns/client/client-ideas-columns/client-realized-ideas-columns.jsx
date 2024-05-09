import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  IdeaRequestsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  RealizedIdeaActionsCell,
  ShortDateCell,
  TimeFromSecondsCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

export const clientRealizedIdeasColumns = (rowHandlers, shops) => [
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
    field: 'parentProductShop',
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
    sortable: false,
    columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: params => <RealizedIdeaActionsCell rowHandlers={rowHandlers} row={params.row} />,
    width: 140,
    sortable: false,
    filterable: false,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey['Ordered quantity']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Ordered quantity'])} />,

    renderCell: params => <MultilineTextCell text={params.row?.order?.amount} />,
    width: 110,
    filterable: false,
    sortable: false,
  },

  {
    field: 'orderedDate',
    headerName: t(TranslationKey['Order date']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Order date'])} />,

    renderCell: params => <ShortDateCell value={params.row?.order?.createdAt} />,
    width: 110,
    filterable: false,
    sortable: false,
  },

  {
    field: 'intervalStatusNew',
    headerName: t(TranslationKey.New),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.New)} />,

    renderCell: params => <TimeFromSecondsCell seconds={params.value} />,
    width: 91,
    columnKey: columnnsKeys.shared.DATE_DETAILS,
  },

  {
    field: 'intervalStatusOnCheck',
    headerName: t(TranslationKey['On checking']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['On checking'])} />,

    renderCell: params => <TimeFromSecondsCell seconds={params.value} />,
    width: 91,
    columnKey: columnnsKeys.shared.DATE_DETAILS,
  },

  {
    field: 'intervalStatusSupplierSearch',
    headerName: t(TranslationKey['Supplier search']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Supplier search'])} />,

    renderCell: params => <TimeFromSecondsCell seconds={params.value} />,
    width: 110,
    columnKey: columnnsKeys.shared.DATE_DETAILS,
  },

  {
    field: 'intervalStatusSupplierFound',
    headerName: t(TranslationKey['Supplier found']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Supplier found'])} />,

    renderCell: params => <TimeFromSecondsCell seconds={params.value} />,
    width: 105,
    columnKey: columnnsKeys.shared.DATE_DETAILS,
  },

  {
    field: 'intervalStatusProductCreating',
    headerName: t(TranslationKey['Card creating']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Card creating'])} />,

    renderCell: params => <TimeFromSecondsCell seconds={params.value} />,
    width: 110,
    columnKey: columnnsKeys.shared.DATE_DETAILS,
  },

  {
    field: 'intervalStatusAddingAsin',
    headerName: t(TranslationKey['Adding ASIN']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Adding ASIN'])} />,

    renderCell: params => <TimeFromSecondsCell seconds={params.value} />,
    width: 105,
    columnKey: columnnsKeys.shared.DATE_DETAILS,
  },

  /* {
    field: 'intervalStatusFinished',
    headerName: t(TranslationKey.Realized),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Realized)} />,

    renderCell: params => <TimeFromSecondsCell seconds={params.value} />,
    width: 110,
    columnKey: columnnsKeys.shared.DATE_DETAILS,
  }, */

  {
    field: 'intervalsSum',
    headerName: t(TranslationKey['Elapsed time']),
    renderHeader: () => <MultilineTextHeaderCell color="#0B903E" text={t(TranslationKey['Elapsed time'])} />,

    renderCell: params => <TimeFromSecondsCell color="#0B903E" seconds={params.value} />,
    width: 105,
    columnKey: columnnsKeys.shared.DATE_DETAILS,
  },

  {
    field: 'comments',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

    renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={95} text={params.value} />,
    width: 250,
    sortable: false,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'buyerComment',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,
    headerName: t(TranslationKey['Client comment']),

    renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={95} text={params.value} />,
    width: 250,
    sortable: false,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'updatedAt',
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
    sortable: false,

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
    width: 990,
    sortable: false,
    filterable: false,
  },
]

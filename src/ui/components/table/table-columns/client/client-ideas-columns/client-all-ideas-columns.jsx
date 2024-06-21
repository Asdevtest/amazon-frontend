import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { colorByIdeaStatus, ideaStatusByCode, ideaStatusTranslate } from '@constants/statuses/idea-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  AllIdeasActionsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  ShortDateCell,
  SmallRowImageCell,
  TimeFromSecondsCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { checkIsMediaFileLink } from '@utils/checks'
import { t } from '@utils/translations'

export const clientAllIdeasColumns = rowHandlers => {
  const columns = [
    {
      field: 'title',
      headerName: t(TranslationKey['Idea title']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Idea title'])} />,

      renderCell: params => <MultilineTextCell text={params.value} />,
      width: 190,

      columnKey: columnnsKeys.shared.STRING,
      disableCustomSort: true,
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
            image={product?.images?.[0]}
            amazonTitle={product?.amazonTitle}
            asin={product?.asin}
            skuByClient={product?.skuByClient}
          />
        )
      },
      width: 265,
      disableCustomSort: true,
      columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
      table: DataGridFilterTables.PRODUCTS,
    },

    {
      field: 'ideaImage',
      headerName: t(TranslationKey.Idea),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Idea)} />,

      renderCell: params => (
        <SmallRowImageCell image={params.row.linksToMediaFiles.find(el => checkIsMediaFileLink(el))} />
      ),
      width: 96,
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'comments',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,
      headerName: t(TranslationKey['Client comment']),

      renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={95} text={params.value} />,
      width: 250,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'buyerComment',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,
      headerName: t(TranslationKey['Buyer comment']),

      renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={95} text={params.value} />,
      width: 250,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'parentProductShop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Shop)} />,

      renderCell: params => <MultilineTextCell twoLines text={params?.row?.parentProduct?.shop?.name} />,
      width: 100,
      disableCustomSort: true,
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
      disableCustomSort: true,
      columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
      table: DataGridFilterTables.PRODUCTS,
    },

    {
      field: 'reasonReject',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Reason for rejection'])} />,
      headerName: t(TranslationKey['Reason for rejection']),

      renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={95} text={params.value} />,
      width: 250,
      filterable: false,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'actions',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

      renderCell: params => <AllIdeasActionsCell row={params.row} rowHandlers={rowHandlers} />,
      width: 150,
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'amount',
      headerName: t(TranslationKey['Ordered quantity']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Ordered quantity'])} />,

      renderCell: params => <MultilineTextCell text={params.row?.order?.amount} />,
      width: 110,
      disableCustomSort: true,
      filterable: false,
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
      width: 105,
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
      width: 120,

      columnKey: columnnsKeys.shared.DATE_DETAILS,
    },

    {
      field: 'intervalStatusProductCreating',
      headerName: t(TranslationKey['Card creating']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Card creating'])} />,

      renderCell: params => <TimeFromSecondsCell seconds={params.value} />,
      width: 100,
      columnKey: columnnsKeys.shared.DATE_DETAILS,
    },

    {
      field: 'intervalStatusAddingAsin',
      headerName: t(TranslationKey['Adding ASIN']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Adding ASIN'])} />,

      renderCell: params => <TimeFromSecondsCell seconds={params.value} />,
      width: 106,
      columnKey: columnnsKeys.shared.DATE_DETAILS,
    },

    {
      field: 'intervalsSum',
      headerName: t(TranslationKey['Elapsed time']),
      renderHeader: () => <MultilineTextHeaderCell color="#0B903E" text={t(TranslationKey['Elapsed time'])} />,

      renderCell: params => <TimeFromSecondsCell color="#0B903E" seconds={params.value} />,

      width: 120,

      columnKey: columnnsKeys.shared.DATE_DETAILS,
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
      field: 'updatedAt',
      headerName: t(TranslationKey['Status Updated']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Status Updated'])} />,

      renderCell: params => <ShortDateCell value={params.value} />,
      width: 100,
      columnKey: columnnsKeys.shared.DATE,
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

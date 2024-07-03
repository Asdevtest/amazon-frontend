import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import {
  colorByIdeaStatus,
  ideaStatus,
  ideaStatusByCode,
  ideaStatusByKey,
  ideaStatusTranslate,
} from '@constants/statuses/idea-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  FilesCell,
  IdeaSupplierCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  OnCheckingIdeaActionsCell,
  ProductAsinCell,
  ShortDateCell,
  SmallRowImageCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'
import { LinkWithCopy } from '@components/shared/link-with-copy'

import { checkIsMediaFileLink } from '@utils/checks'
import { checkAndMakeAbsoluteUrl, toFixed } from '@utils/text'
import { t } from '@utils/translations'

export const clientSearchSuppliersIdeasColumns = rowHandlers => {
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
      width: 265,

      columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
      table: DataGridFilterTables.PRODUCTS,
      disableCustomSort: true,
    },

    {
      field: 'status',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      headerName: t(TranslationKey.Status),

      renderCell: params => (
        <MultilineTextCell
          text={ideaStatusTranslate(ideaStatusByCode[params.value])}
          color={colorByIdeaStatus(ideaStatusByCode[params.value])}
        />
      ),
      width: 160,
      columnKey: columnnsKeys.client.IDEAS_STATUS,
    },

    {
      field: 'actions',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

      renderCell: params => (
        <OnCheckingIdeaActionsCell
          isAcceptDisabled={params.row.status !== ideaStatusByKey[ideaStatus.SUPPLIER_FOUND]}
          onClickAccept={() => rowHandlers.onClickAcceptOnSuppliersSearch(params.row._id, params.row)}
          onClickReject={() => rowHandlers.onClickReject(params.row._id)}
        />
      ),
      width: 150,
      disableCustomSort: true,
      filterable: false,
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
      field: 'suppliers',
      headerName: t(TranslationKey.Supplier),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supplier)} />,

      renderCell: params => (
        <IdeaSupplierCell
          suppliers={params.value}
          onClickAddSupplier={() => rowHandlers.onClickAddSupplierButton(params.row._id)}
        />
      ),
      width: 176,
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'link',
      headerName: t(TranslationKey.Link),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Link)} />,

      renderCell: params => {
        const suppliers = params.row.suppliers

        if (!suppliers.length) {
          return <MultilineTextCell text="" />
        }

        return suppliers[0].link ? (
          <LinkWithCopy
            url={checkAndMakeAbsoluteUrl(suppliers[0].link)}
            valueToCopy={suppliers[0].link}
            title={t(TranslationKey.Site)}
          />
        ) : (
          <MultilineTextCell text={t(TranslationKey['Link not available'])} />
        )
      },
      width: 100,
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'priceWithDelivery',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Price with delivery']) + ', $'} />,
      headerName: t(TranslationKey['Price with delivery']) + '$',

      renderCell: params => {
        const supplier = params.row.suppliers?.[0]
        const priceWithDelivery = supplier?.price + supplier?.batchDeliveryCostInDollar / supplier?.amount

        return <MultilineTextCell text={toFixed(priceWithDelivery, 2)} />
      },
      width: 120,
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'minlot',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Min batch'])} />,
      headerName: t(TranslationKey['Min batch']),

      renderCell: params => <MultilineTextCell text={params.row.suppliers?.[0]?.minlot} />,
      width: 80,
      type: 'number',
      columnKey: columnnsKeys.shared.QUANTITY,
      table: DataGridFilterTables.SUPPLIERS,
      disableCustomSort: true,
    },

    {
      field: 'minProductionTerm',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,
      headerName: t(TranslationKey['Production time, days']),

      renderCell: ({ row }) => {
        const supplier = row.suppliers?.[0]

        return (
          <MultilineTextCell
            text={
              supplier ? `${supplier?.minProductionTerm} - ${supplier?.maxProductionTerm}` : t(TranslationKey.Missing)
            }
          />
        )
      },
      fields: [
        {
          label: 'Min. production time, days',
          value: 'minProductionTerm',
        },
        {
          label: 'Max. production time, days',
          value: 'maxProductionTerm',
        },
      ],
      width: 115,
      type: 'number',
      columnKey: columnnsKeys.shared.NUMBERS,
      disableCustomSort: true,
      table: DataGridFilterTables.SUPPLIERS,
    },

    {
      field: 'linksToMediaFiles',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Files)} />,
      headerName: t(TranslationKey.Files),

      renderCell: params => <FilesCell files={params.row?.suppliers[0]?.images} />,
      width: 80,
      align: 'center',
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

      renderCell: params => {
        const getDate = status => {
          switch (ideaStatusByCode[status]) {
            case ideaStatus.SUPPLIER_SEARCH:
              return params.row.dateStatusSupplierSearch
            case ideaStatus.SUPPLIER_FOUND:
              return params.row.dateStatusSupplierFound
            case ideaStatus.SUPPLIER_NOT_FOUND:
              return params.row.dateStatusSupplierNotFound
            default:
              return params.value
          }
        }

        return <ShortDateCell value={getDate(params.row.status)} />
      },
      width: 91,
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

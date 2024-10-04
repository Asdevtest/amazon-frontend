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
  ActionButtonsCell,
  FilesCell,
  IdeaSupplierCell,
  ManyUserLinkCell,
  MediaContentCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { LinkWithCopy } from '@components/shared/link-with-copy'
import { Text } from '@components/shared/text'

import { checkIsMediaFileLink } from '@utils/checks'
import { checkAndMakeAbsoluteUrl, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import {
  ProductColumnMenuType,
  getProductColumnMenuItems,
  getProductColumnMenuValue,
} from '@config/data-grid-column-menu/product-column'
import {
  productionTimeColumnMenuItems,
  productionTimeColumnMenuValue,
} from '@config/data-grid-column-menu/production-time'

import {
  accessToProductColumnMenuConfig,
  createdByColumnMenuConfig,
  createdByFields,
  shopColumnMenuConfig,
  shopFields,
} from '../columns-menu.config'

export const clientSearchSuppliersIdeasColumns = rowHandlers => {
  const columns = [
    {
      field: 'xid',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
      renderCell: params => <Text isCell text={params.row.xid} />,
      width: 100,
      type: 'number',
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'parentProduct',
      headerName: t(TranslationKey['Parent product']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Parent product'])} />,

      renderCell: params => {
        const product = params.value

        return (
          <ProductCell
            image={product?.images?.[0]}
            title={product?.amazonTitle}
            asin={product?.asin}
            sku={product?.skuByClient}
          />
        )
      },

      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue({ columnType: ProductColumnMenuType.PARENT }),
      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 170,
    },

    {
      field: 'status',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      headerName: t(TranslationKey.Status),

      renderCell: params => (
        <Text
          isCell
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
        <ActionButtonsCell
          showFirst
          showSecond
          secondDanger
          firstContent={t(TranslationKey.Accept)}
          firstDisabled={params.row.status !== ideaStatusByKey[ideaStatus.SUPPLIER_FOUND]}
          secondContent={t(TranslationKey.Reject)}
          onClickFirst={() => rowHandlers.onClickAcceptOnSuppliersSearch(params.row._id, params.row)}
          onClickSecond={() => rowHandlers.onClickReject(params.row._id)}
        />
      ),
      width: 130,
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'parentProductShop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <Text isCell text={params?.row?.parentProduct?.shop?.name} />,
      width: 100,
      disableCustomSort: true,

      fields: shopFields,
      columnMenuConfig: shopColumnMenuConfig,
      columnKey: columnnsKeys.shared.MULTIPLE,
    },

    {
      field: 'ideaImage',
      headerName: t(TranslationKey.Idea),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Idea)} />,

      renderCell: params => (
        <MediaContentCell image={params.row.linksToMediaFiles.find(el => checkIsMediaFileLink(el))} />
      ),
      width: 70,
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
          return <Text isCell text="" />
        }

        return suppliers[0].link ? (
          <LinkWithCopy
            url={checkAndMakeAbsoluteUrl(suppliers[0].link)}
            valueToCopy={suppliers[0].link}
            title={t(TranslationKey.Site)}
          />
        ) : (
          <Text isCell text={t(TranslationKey['Link not available'])} />
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

        return <Text isCell center text={toFixed(priceWithDelivery || 0, 2)} />
      },
      width: 120,
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'minlot',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Min batch'])} />,
      headerName: t(TranslationKey['Min batch']),

      renderCell: params => <Text isCell text={params.row.suppliers?.[0]?.minlot} />,
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
          <Text
            isCell
            text={
              supplier ? `${supplier?.minProductionTerm} - ${supplier?.maxProductionTerm}` : t(TranslationKey.Missing)
            }
          />
        )
      },

      fields: productionTimeColumnMenuItems,
      columnMenuConfig: productionTimeColumnMenuValue,
      columnKey: columnnsKeys.shared.MULTIPLE,

      width: 115,
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

      renderCell: params => <Text isCell text={params.value} />,
      width: 250,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'buyerComment',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,
      headerName: t(TranslationKey['Buyer comment']),

      renderCell: params => <Text isCell text={params.value} />,
      width: 250,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'createdBy',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

      renderCell: ({ row }) => (
        <UserCell name={row.sub?.name || row.createdBy?.name} id={row.sub?._id || row?.createdBy?._id} />
      ),
      width: 130,

      filterable: false,
      disableCustomSort: true,
      fields: createdByFields,
      columnMenuConfig: createdByColumnMenuConfig,
      columnKey: columnnsKeys.shared.MULTIPLE,
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

        return <NormDateCell value={getDate(params.row.status)} />
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

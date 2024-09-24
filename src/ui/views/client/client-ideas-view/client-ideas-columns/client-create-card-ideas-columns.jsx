import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  CreateCardIdeaActionsCell,
  IdeaProductCell,
  ManyUserLinkCell,
  MediaContentCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { checkIsMediaFileLink } from '@utils/checks'
import { t } from '@utils/translations'

import {
  ProductColumnMenuType,
  getProductColumnMenuItems,
  getProductColumnMenuValue,
} from '@config/data-grid-column-menu/product-column'

import {
  accessToProductColumnMenuConfig,
  createdByColumnMenuConfig,
  createdByFields,
  shopColumnMenuConfig,
  shopFields,
} from '../columns-menu.config'

export const clientCreateCardIdeasColumns = rowHandlers => {
  const columns = [
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
      field: 'parentProductShop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Shop)} />,

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
      field: 'childProduct',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Child product'])} />,
      headerName: t(TranslationKey['Child product']),

      renderCell: params => (
        <IdeaProductCell
          rowData={params.row}
          onClickCreateCard={rowHandlers.onClickCreateCard}
          onClickSelectSupplier={rowHandlers.onClickSelectSupplier}
        />
      ),
      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue({ columnType: ProductColumnMenuType.CHILD }),
      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 250,
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
      field: 'actions',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
      headerName: t(TranslationKey.Action),

      renderCell: params => <CreateCardIdeaActionsCell row={params.row} rowHandlers={rowHandlers} />,
      width: 160,
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'createdBy',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

      renderCell: ({ row }) => (
        <UserCell name={row.sub?.name || row.createdBy?.name} id={row.sub?._id || row?.createdBy?._id} />
      ),
      width: 130,

      fields: createdByFields,
      columnMenuConfig: createdByColumnMenuConfig,
      columnKey: columnnsKeys.shared.MULTIPLE,

      filterable: false,
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
      filterable: false,
      disableCustomSort: true,

      fields: shopFields,
      columnMenuConfig: accessToProductColumnMenuConfig,
      columnKey: columnnsKeys.shared.MULTIPLE,
    },

    {
      field: 'dateStatusProductCreating',
      headerName: t(TranslationKey['Status Updated']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Status Updated'])} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 91,
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

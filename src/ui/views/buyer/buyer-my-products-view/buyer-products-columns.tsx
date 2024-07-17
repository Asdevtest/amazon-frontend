import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { ProductStatusByCode, colorByProductStatus, productStatusTranslateKey } from '@constants/product/product-status'
import { productStrategyStatusesEnum } from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  FeesValuesWithCalculateBtnCell,
  ManyUserLinkCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OpenInNewTabCell,
  ProductAsinCell,
  RedFlagsCell,
  TagsCell,
} from '@components/data-grid/data-grid-cells'

import { formatNormDateTime } from '@utils/date-time'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'
import { IGridColumn } from '@typings/shared/grid-column'
import { ITag } from '@typings/shared/tag'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

interface IHandlers {
  onClickShowProduct: (row: IProduct) => void
}

export const buyerProductsViewColumns = (handlers: IHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'link',
      headerName: t(TranslationKey.Link),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Link)} />,
      renderCell: params => (
        <OpenInNewTabCell isFullSize onClickOpenInNewTab={() => handlers.onClickShowProduct(params.row as IProduct)} />
      ),
      width: 80,

      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.Product),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

      renderCell: params => {
        const product = params.row

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
      columnMenuConfig: getProductColumnMenuValue(),
      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 250,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

      width: 170,
      renderCell: params => (
        <MultilineTextCell
          text={t(
            // @ts-ignore
            productStatusTranslateKey(ProductStatusByCode[params.row.status as keyof typeof ProductStatusByCode]),
          )}
          color={colorByProductStatus(ProductStatusByCode[params.row.status as keyof typeof ProductStatusByCode])}
        />
      ),
      valueGetter: params =>
        // @ts-ignore
        t(productStatusTranslateKey(ProductStatusByCode[params.row.status as keyof typeof ProductStatusByCode])),

      transformValueMethod: status =>
        // @ts-ignore
        t(productStatusTranslateKey(ProductStatusByCode[status as keyof typeof ProductStatusByCode])),

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'strategyStatus',
      headerName: t(TranslationKey.Strategy),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,

      renderCell: params => (
        <MultilineTextCell
          text={productStrategyStatusesEnum[params.value as keyof typeof productStrategyStatusesEnum]?.replace(
            /_/g,
            ' ',
          )}
        />
      ),
      width: 135,

      columnKey: columnnsKeys.client.INVENTORY_STRATEGY_STATUS,
    },

    {
      field: 'feesAndNet',
      headerName: t(TranslationKey['Fees & Net']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Fees & Net'])} />,

      renderCell: params => (
        <FeesValuesWithCalculateBtnCell
          noCalculate={!['30', '40', '50', '60'].includes(params.row.status)}
          fbafee={params.row.fbafee}
          reffee={params.row.reffee}
          productId={params.row._id}
        />
      ),
      width: 110,

      filterable: false,
      sortable: false,
      disableCustomSort: true,
    },

    {
      field: 'amazon',
      headerName: t(TranslationKey['Amazon price']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,
      renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
      valueFormatter: params => (params.value ? toFixedWithDollarSign(params.value, 2) : ''),
      type: 'number',
      width: 90,

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'profit',
      headerName: t(TranslationKey.Profit),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Profit)} />,
      valueFormatter: params => (params.value ? toFixedWithDollarSign(params.value, 2) : ''),
      renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
      type: 'number',
      width: 90,

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'bsr',
      headerName: t(TranslationKey.BSR),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

      renderCell: params => <MultilineTextCell text={params.value} />,
      type: 'number',
      width: 75,

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'fbaamount',
      headerName: t(TranslationKey['Recommend amount']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Recommend amount'])} />,
      valueFormatter: params => (params.value ? toFixedWithDollarSign(params.value, 2) : ''),
      renderCell: params => <MultilineTextCell text={params.value} />,
      type: 'number',
      width: 150,

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ideasOnCheck',
      headerName: t(TranslationKey['Ideas to Check']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Ideas to Check'])} />,
      renderCell: params => <MultilineTextCell text={params.value} />,
      width: 100,
      type: 'number',

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ideasClosed',
      headerName: t(TranslationKey['Closed Ideas']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Closed Ideas'])} />,
      renderCell: params => <MultilineTextCell text={params.value} />,
      width: 100,
      type: 'number',

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ideasFinished',
      headerName: t(TranslationKey['Realized ideas']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Realized ideas'])} />,
      renderCell: params => <MultilineTextCell text={params.value} />,
      width: 125,
      type: 'number',

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'tags',
      headerName: t(TranslationKey.Tags),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tags)} />,
      renderCell: params => <TagsCell tags={params.row.tags} />,
      valueGetter: params => params.row.tags?.map((el: ITag) => `#${el.title}`).join(),
      width: 160,
      sortable: false,
      columnKey: columnnsKeys.shared.TAGS,
      disableCustomSort: true,
    },

    {
      field: 'redFlags',
      headerName: t(TranslationKey['Red flags']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Red flags'])} />,
      renderCell: params => <RedFlagsCell flags={params.row.redFlags} />,
      width: 130,
      sortable: false,
      columnKey: columnnsKeys.shared.RED_FLAGS,
      disableCustomSort: true,
    },

    {
      field: 'subUsers',
      headerName: t(TranslationKey['Access to product']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Access to product'])} />,
      renderCell: ({ row }) => {
        const subUsers = row?.subUsers || []
        const subUsersByShop = row?.subUsersByShop || []

        return <ManyUserLinkCell usersData={subUsers?.concat(subUsersByShop)} />
      },
      valueGetter: ({ row }) => {
        const subUsers = row?.subUsers || []
        const subUsersByShop = row?.subUsersByShop || []

        return subUsers?.concat(subUsersByShop).join(', ')
      },
      width: 187,
      filterable: false,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

      width: 120,
      valueFormatter: params => formatNormDateTime(params.value),
      renderCell: params => <NormDateCell value={params.value} />,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      valueFormatter: params => formatNormDateTime(params.value),
      width: 150,
      flex: 1,
      renderCell: params => <NormDateCell value={params.value} />,

      columnKey: columnnsKeys.shared.DATE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.PRODUCTS
    }

    column.sortable = false
  }

  return columns
}

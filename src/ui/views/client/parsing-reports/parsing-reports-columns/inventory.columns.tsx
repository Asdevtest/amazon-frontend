import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, ProductCell, UserCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const inventoryColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = [
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <Text isCell text={params.row?.shop?.name} />,
      width: 90,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'client',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

      renderCell: params => (
        <UserCell name={params.row.client?.name} id={params.row.client?._id} email={params.row.client?.email} />
      ),
      width: 110,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.ASIN),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
      renderCell: ({ row }) => <ProductCell image={row.image} title={row.title} asin={row.asin} sku={row.sku} />,

      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue<ParsingReportsType>({
        isSimpleSku: true,
        table: ParsingReportsType.INVENTORY,
        customTitleField: 'title',
      }),
      columnKey: columnnsKeys.shared.MULTIPLE,
      width: 170,
    },

    {
      field: 'allFees',
      headerName: 'All fees',
      renderHeader: () => <MultilineTextHeaderCell text="All fees" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'fbaFees',
      headerName: 'FBA fees',
      renderHeader: () => <MultilineTextHeaderCell text="FBA fees" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'refFees',
      headerName: 'REF fees',
      renderHeader: () => <MultilineTextHeaderCell text="REF fees" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'soldBy',
      headerName: 'Sold by',
      renderHeader: () => <MultilineTextHeaderCell text="Sold by" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'sellersDateUpdated',
      headerName: 'Sellers date updated',
      renderHeader: () => <MultilineTextHeaderCell text="Sellers date updated" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'category',
      headerName: 'Category',
      renderHeader: () => <MultilineTextHeaderCell text="Category" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'categoryRank',
      headerName: 'Category rank',
      renderHeader: () => <MultilineTextHeaderCell text="Category rank" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'subcategory',
      headerName: 'Subcategory',
      renderHeader: () => <MultilineTextHeaderCell text="Subcategory" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'subcategoryRank',
      headerName: 'Subcategory rank',
      renderHeader: () => <MultilineTextHeaderCell text="Subcategory rank" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'rating',
      headerName: 'Rating',
      renderHeader: () => <MultilineTextHeaderCell text="Rating" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'reviews',
      headerName: 'Reviews',
      renderHeader: () => <MultilineTextHeaderCell text="Reviews" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'isChanged',
      headerName: 'Is changed',
      renderHeader: () => <MultilineTextHeaderCell text="Is changed" />,

      renderCell: params => <Text isCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
      filterable: false,
      width: 115,
      // columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'brand',
      headerName: 'Brand',
      renderHeader: () => <MultilineTextHeaderCell text="Brand" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'titleChanged',
      headerName: 'Title changed',
      renderHeader: () => <MultilineTextHeaderCell text="Title changed" />,

      renderCell: params => <Text isCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
      filterable: false,
      width: 115,
      // columnKey: columnnsKeys.shared.STRING_VALUE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = ParsingReportsType.INVENTORY
    }

    column.sortable = false
  }

  return columns
}

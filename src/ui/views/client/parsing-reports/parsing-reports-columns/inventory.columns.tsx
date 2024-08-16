import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateCell,
  ProductAsinCell,
  TextCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const inventoryColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = [
    {
      field: 'dateUpdated',
      headerName: 'Date updated',
      renderHeader: () => <MultilineTextHeaderCell text="Date updated" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <TextCell text={params.row?.shop?.name} />,
      width: 90,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'client',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

      renderCell: params => <UserLinkCell blackText name={params.row.client?.name} userId={params.row.client?._id} />,
      width: 110,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.ASIN),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
      renderCell: ({ row }) => (
        <ProductAsinCell image={row?.image} amazonTitle={row?.title} asin={row?.asin} skuByClient={row?.sku} />
      ),

      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue<ParsingReportsType>({
        isSimpleSku: true,
        table: ParsingReportsType.INVENTORY,
        customTitleField: 'title',
      }),
      columnKey: columnnsKeys.shared.MULTIPLE,
      width: 210,
    },

    {
      field: 'price',
      headerName: 'Price',
      renderHeader: () => <MultilineTextHeaderCell text="Price" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'allFees',
      headerName: 'All fees',
      renderHeader: () => <MultilineTextHeaderCell text="All fees" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'fbaFees',
      headerName: 'Fba fees',
      renderHeader: () => <MultilineTextHeaderCell text="Fba fees" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'refFees',
      headerName: 'Ref fees',
      renderHeader: () => <MultilineTextHeaderCell text="Ref fees" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'unitVolume',
      headerName: 'Unit volume',
      renderHeader: () => <MultilineTextHeaderCell text="Unit volume" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'available',
      headerName: 'Available',
      renderHeader: () => <MultilineTextHeaderCell text="Available" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'inbound',
      headerName: 'Inbound',
      renderHeader: () => <MultilineTextHeaderCell text="Inbound" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'reserved',
      headerName: 'Reserved',
      renderHeader: () => <MultilineTextHeaderCell text="Reserved" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'fnSku',
      headerName: 'FnSku',
      renderHeader: () => <MultilineTextHeaderCell text="FnSku" />,

      renderCell: params => <TextCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'historicalDaysOfSupply',
      headerName: 'Historical days of supply',
      renderHeader: () => <MultilineTextHeaderCell text="Historical days of supply" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'estimatedStorageCost',
      headerName: 'Estimated storage cost',
      renderHeader: () => <MultilineTextHeaderCell text="Estimated storage cost" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'estimatedAgedInventorySurcharge',
      headerName: 'Estimated aged inventory surcharge',
      renderHeader: () => <MultilineTextHeaderCell text="Estimated aged inventory surcharge" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'lowInventoryLevelFee',
      headerName: 'Low inventory level fee',
      renderHeader: () => <MultilineTextHeaderCell text="Low inventory level fee" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'inventoryAge0To90Days',
      headerName: 'Inventory age 0 to 90 days',
      renderHeader: () => <MultilineTextHeaderCell text="Inventory age 0 to 90 days" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'inventoryAge91To180Days',
      headerName: 'Inventory age 91 to 180 days',
      renderHeader: () => <MultilineTextHeaderCell text="Inventory age 91 to 180 days" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'inventoryAge181To270Days',
      headerName: 'Inventory age 181 to 270 days',
      renderHeader: () => <MultilineTextHeaderCell text="Inventory age 181 to 270 days" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'inventoryAge271To365Days',
      headerName: 'Inventory age 271 to 365 days',
      renderHeader: () => <MultilineTextHeaderCell text="Inventory age 271 to 365 days" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'inventoryAge365PlusDays',
      headerName: 'Inventory age 365 plus days',
      renderHeader: () => <MultilineTextHeaderCell text="Inventory age 365 plus days" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'storageVolume',
      headerName: 'Storage volume',
      renderHeader: () => <MultilineTextHeaderCell text="Storage volume" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'category',
      headerName: 'Category',
      renderHeader: () => <MultilineTextHeaderCell text="Category" />,

      renderCell: params => <TextCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'categoryRank',
      headerName: 'Category rank',
      renderHeader: () => <MultilineTextHeaderCell text="Category rank" />,

      renderCell: params => <TextCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'subcategory',
      headerName: 'Subcategory',
      renderHeader: () => <MultilineTextHeaderCell text="Subcategory" />,

      renderCell: params => <TextCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'subcategoryRank',
      headerName: 'Subcategory rank',
      renderHeader: () => <MultilineTextHeaderCell text="Subcategory rank" />,

      renderCell: params => <TextCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'rating',
      headerName: 'Rating',
      renderHeader: () => <MultilineTextHeaderCell text="Rating" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'reviews',
      headerName: 'Reviews',
      renderHeader: () => <MultilineTextHeaderCell text="Reviews" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'isChanged',
      headerName: 'Is changed',
      renderHeader: () => <MultilineTextHeaderCell text="Is changed" />,

      renderCell: params => <TextCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
      filterable: false,
      width: 115,
      // columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'brand',
      headerName: 'Brand',
      renderHeader: () => <MultilineTextHeaderCell text="Brand" />,

      renderCell: params => <TextCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'titleChanged',
      headerName: 'Title changed',
      renderHeader: () => <MultilineTextHeaderCell text="Title changed" />,

      renderCell: params => <TextCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
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

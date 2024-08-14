import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, ProductCell, TextCell } from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

export const clientLast30DaySellerBoardColumns = () => {
  const columns = [
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      table: DataGridFilterTables.SELLERBOARD_LAST_30_DAYS,
      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
      renderCell: params => <TextCell text={params.value?.name} />,
      width: 150,

      table: DataGridFilterTables.SELLERBOARD_LAST_30_DAYS,
      columnKey: columnnsKeys.shared.OBJECT,

      disableCustomSort: true,
    },

    {
      field: 'asin',
      headerName: `${t(TranslationKey.ASIN)} / ${t(TranslationKey.SKU)}`,
      renderHeader: () => <MultilineTextHeaderCell text={`${t(TranslationKey.ASIN)} / ${t(TranslationKey.SKU)}`} />,

      renderCell: params => <ProductCell asin={params.row?.asin} sku={params.row?.sku} />,

      fields: getProductColumnMenuItems({ withoutTitle: true }),
      columnMenuConfig: getProductColumnMenuValue({
        isSimpleSku: true,
        table: DataGridFilterTables.SELLERBOARD_LAST_30_DAYS,
      }),
      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 260,
      minWidth: 100,
    },

    {
      field: 'name',
      headerName: t(TranslationKey.Title),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

      renderCell: params => <TextCell text={params.value} />,
      width: 250,

      table: DataGridFilterTables.SELLERBOARD_LAST_30_DAYS,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'date',
      headerName: t(TranslationKey.Date),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Date)} />,

      renderCell: params => <NormDateCell dateWithoutTime value={params.value} />,
      width: 115,

      table: DataGridFilterTables.SELLERBOARD_LAST_30_DAYS,
      columnKey: columnnsKeys.shared.DATE,
    },
    {
      field: 'unitsorganic',
      headerName: 'Unitsorganic',
      renderHeader: () => <MultilineTextHeaderCell text={'Unitsorganic'} />,
      renderCell: params => <TextCell text={params.value} />,
      width: 200,

      table: DataGridFilterTables.SELLERBOARD_LAST_30_DAYS,
      columnKey: columnnsKeys.shared.QUANTITY,
    },
    {
      field: 'unitsppc',
      headerName: 'Unitsppc',
      renderHeader: () => <MultilineTextHeaderCell text={'Unitsppc'} />,
      renderCell: params => <TextCell text={params.value} />,
      width: 200,

      table: DataGridFilterTables.SELLERBOARD_LAST_30_DAYS,
      columnKey: columnnsKeys.shared.QUANTITY,
    },
    {
      field: 'netprofit',
      headerName: 'Netprofit',
      renderHeader: () => <MultilineTextHeaderCell text={'Netprofit'} />,
      renderCell: params => <TextCell text={params.value} />,
      width: 250,

      table: DataGridFilterTables.SELLERBOARD_LAST_30_DAYS,
      columnKey: columnnsKeys.shared.QUANTITY,
    },
  ]

  for (const column of columns) {
    // @ts-ignore
    column.sortable = false
  }

  return columns
}

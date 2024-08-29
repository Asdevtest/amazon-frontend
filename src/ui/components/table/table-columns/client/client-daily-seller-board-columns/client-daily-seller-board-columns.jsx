import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, ProductCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

export const clientDailySellerBoardColumns = () => {
  const columns = [
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 118,

      table: DataGridFilterTables.SELLERBOARD_WAREHOUSE_EVERY_DAY,
      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <Text isCell text={params.value?.name} />,
      width: 150,

      table: DataGridFilterTables.SELLERBOARD_WAREHOUSE_EVERY_DAY,
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
        table: DataGridFilterTables.SELLERBOARD_WAREHOUSE_EVERY_DAY,
      }),
      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 170,
    },

    {
      field: 'title',
      headerName: t(TranslationKey.Title),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 250,

      table: DataGridFilterTables.SELLERBOARD_WAREHOUSE_EVERY_DAY,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'fbaFbmStock',
      headerName: 'FBA/FBM Stock',
      renderHeader: () => <MultilineTextHeaderCell text={'FBA/FBM Stock'} />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 108,

      table: DataGridFilterTables.SELLERBOARD_WAREHOUSE_EVERY_DAY,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'fnsku',
      headerName: 'FNSKU',
      renderHeader: () => <MultilineTextHeaderCell text="FNSKU" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 150,

      table: DataGridFilterTables.SELLERBOARD_WAREHOUSE_EVERY_DAY,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'marketplace',
      headerName: 'Marketplace',
      renderHeader: () => <MultilineTextHeaderCell text="Marketplace" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 150,

      table: DataGridFilterTables.SELLERBOARD_WAREHOUSE_EVERY_DAY,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'reserved',
      headerName: 'Reserved',
      renderHeader: () => <MultilineTextHeaderCell text={'Reserved'} />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 90,

      table: DataGridFilterTables.SELLERBOARD_WAREHOUSE_EVERY_DAY,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'roi',
      headerName: t(TranslationKey.ROI),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ROI)} />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 80,

      table: DataGridFilterTables.SELLERBOARD_WAREHOUSE_EVERY_DAY,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'comment',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 220,

      table: DataGridFilterTables.SELLERBOARD_WAREHOUSE_EVERY_DAY,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'daysOfStockLeft',
      headerName: t(TranslationKey.DaysOfStockLeft),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.DaysOfStockLeft)} />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 150,

      table: DataGridFilterTables.SELLERBOARD_WAREHOUSE_EVERY_DAY,
      columnKey: columnnsKeys.shared.QUANTITY,
    },
    {
      field: 'sentToFba',
      headerName: t(TranslationKey.SentToFba),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.SentToFba)} />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 108,

      table: DataGridFilterTables.SELLERBOARD_WAREHOUSE_EVERY_DAY,
      columnKey: columnnsKeys.shared.QUANTITY,
    },
    {
      field: 'fbaPrepStock',
      headerName: t(TranslationKey.FbaPrepStock),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.FbaPrepStock)} />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 120,

      table: DataGridFilterTables.SELLERBOARD_WAREHOUSE_EVERY_DAY,
      columnKey: columnnsKeys.shared.QUANTITY,
    },
    {
      field: 'ordered',
      headerName: t(TranslationKey.Ordered),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Ordered)} />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 108,

      table: DataGridFilterTables.SELLERBOARD_WAREHOUSE_EVERY_DAY,
      columnKey: columnnsKeys.shared.QUANTITY,
    },
  ]

  for (const column of columns) {
    // @ts-ignore
    column.sortable = false
  }

  return columns
}

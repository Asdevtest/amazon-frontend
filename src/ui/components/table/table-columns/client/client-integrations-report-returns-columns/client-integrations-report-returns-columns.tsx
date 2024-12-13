import { GridRenderCellParams } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, ProductCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

export const clientIntegrationsReportReturnsColumns = () => {
  const columns: IGridColumn[] = [
    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: (params: GridRenderCellParams) => <NormDateCell value={params.value} />,
      width: 118,

      table: DataGridFilterTables.INVENTORY_RETURNS,
      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: (params: GridRenderCellParams) => <Text isCell text={params.value?.name} />,
      width: 150,

      table: DataGridFilterTables.INVENTORY_RETURNS,
      columnKey: columnnsKeys.shared.OBJECT,

      disableCustomSort: true,
    },

    {
      field: 'sku',
      headerName: `${t(TranslationKey.ASIN)} / ${t(TranslationKey.SKU)}`,
      renderHeader: () => <MultilineTextHeaderCell text={`${t(TranslationKey.ASIN)} / ${t(TranslationKey.SKU)}`} />,

      renderCell: (params: GridRenderCellParams) => (
        <ProductCell asin={params.row?.asin} image={params.row?.image} sku={params.row?.sku} />
      ),

      fields: getProductColumnMenuItems({ withoutTitle: true }),
      columnMenuConfig: getProductColumnMenuValue({
        isSimpleSku: true,
        table: DataGridFilterTables.INVENTORY_RETURNS,
      }),
      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 170,
    },

    {
      field: 'disposition',
      headerName: 'Disposition',
      renderHeader: () => <MultilineTextHeaderCell text="Disposition" />,
      renderCell: (params: GridRenderCellParams) => <Text isCell text={params.value} />,
      width: 143,

      table: DataGridFilterTables.INVENTORY_RETURNS,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'orderId',
      headerName: 'Order id',
      renderHeader: () => <MultilineTextHeaderCell text="Order id" />,
      renderCell: (params: GridRenderCellParams) => <Text isCell text={params.value} />,
      width: 143,

      table: DataGridFilterTables.INVENTORY_RETURNS,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'reason',
      headerName: 'Reason',
      renderHeader: () => <MultilineTextHeaderCell text="Reason" />,
      renderCell: (params: GridRenderCellParams) => <Text isCell text={params.value} />,
      width: 143,

      table: DataGridFilterTables.INVENTORY_RETURNS,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: (params: GridRenderCellParams) => <Text isCell text={params.value} />,
      width: 143,

      table: DataGridFilterTables.INVENTORY_RETURNS,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'receivedDate',
      headerName: 'Received Date',
      renderHeader: () => <MultilineTextHeaderCell text="Received Date" />,
      renderCell: (params: GridRenderCellParams) => <NormDateCell dateWithoutTime value={params.value} />,
      width: 118,

      table: DataGridFilterTables.INVENTORY_RETURNS,
      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'returnedDate',
      headerName: 'Returned Date',
      renderHeader: () => <MultilineTextHeaderCell text="Returned Date" />,
      renderCell: (params: GridRenderCellParams) => <NormDateCell dateWithoutTime value={params.value} />,
      width: 118,

      table: DataGridFilterTables.INVENTORY_RETURNS,
      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'reversalDate',
      headerName: 'Reversal Date',
      renderHeader: () => <MultilineTextHeaderCell text="Reversal Date" />,
      renderCell: (params: GridRenderCellParams) => <NormDateCell dateWithoutTime value={params.value} />,
      width: 118,

      table: DataGridFilterTables.INVENTORY_RETURNS,
      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'dateUpdated',
      headerName: 'Date Updated',
      renderHeader: () => <MultilineTextHeaderCell text="Date Updated" />,
      renderCell: (params: GridRenderCellParams) => <NormDateCell dateWithoutTime value={params.value} />,
      width: 118,

      table: DataGridFilterTables.INVENTORY_RETURNS,
      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'timeUpdated',
      headerName: 'Time Updated',
      renderHeader: () => <MultilineTextHeaderCell text="Time Updated" />,
      renderCell: (params: GridRenderCellParams) => <Text isCell text={params.value} />,
      width: 143,

      table: DataGridFilterTables.INVENTORY_RETURNS,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: (params: GridRenderCellParams) => <NormDateCell value={params.value} />,
      width: 118,

      table: DataGridFilterTables.INVENTORY_RETURNS,
      columnKey: columnnsKeys.shared.DATE_VALUE,
    },
  ]

  for (const column of columns) {
    // @ts-ignore
    column.sortable = false
  }

  return columns
}

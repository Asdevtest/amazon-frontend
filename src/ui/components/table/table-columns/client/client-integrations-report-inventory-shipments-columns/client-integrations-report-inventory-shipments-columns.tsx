import { GridRenderCellParams } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, ProductCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

export const clientIntegrationsReportInventoryShipmentsColumns = () => {
  const columns = [
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: (params: GridRenderCellParams<Date>) => <NormDateCell value={params.value} />,
      width: 118,

      table: DataGridFilterTables.INVENTORY_SHIPMENTS,
      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: (params: GridRenderCellParams) => <Text isCell text={params.value?.name} />,
      width: 150,

      table: DataGridFilterTables.INVENTORY_SHIPMENTS,
      columnKey: columnnsKeys.shared.OBJECT,

      disableCustomSort: true,
    },

    {
      field: 'sku',
      headerName: t(TranslationKey.SKU),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.SKU)} />,

      renderCell: (params: GridRenderCellParams) => <ProductCell image={params.row?.image} sku={params.row?.sku} />,
      width: 170,
      disableCustomSort: true,

      table: DataGridFilterTables.INVENTORY_SHIPMENTS,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'shipmentId',
      headerName: 'Shipment ID',
      renderHeader: () => <MultilineTextHeaderCell text={'Shipment ID'} />,
      renderCell: (params: GridRenderCellParams) => <Text isCell text={params.value} />,
      width: 143,

      table: DataGridFilterTables.INVENTORY_SHIPMENTS,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'referenceId',
      headerName: 'Reference ID',
      renderHeader: () => <MultilineTextHeaderCell text={'Reference ID'} />,
      renderCell: (params: GridRenderCellParams) => <Text isCell text={params.value} />,
      width: 108,

      table: DataGridFilterTables.INVENTORY_SHIPMENTS,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'dateCreated',
      headerName: 'Date created',
      renderHeader: () => <MultilineTextHeaderCell text={'Date created'} />,
      renderCell: (params: GridRenderCellParams) => <NormDateCell dateWithoutTime value={params.value} />,
      width: 118,

      table: DataGridFilterTables.INVENTORY_SHIPMENTS,
      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'dateUpdated',
      headerName: 'Date updated',
      renderHeader: () => <MultilineTextHeaderCell text={'Date updated'} />,
      renderCell: (params: GridRenderCellParams) => <NormDateCell dateWithoutTime value={params.value} />,
      width: 118,

      table: DataGridFilterTables.INVENTORY_SHIPMENTS,
      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'shipTo',
      headerName: 'Ship to',
      renderHeader: () => <MultilineTextHeaderCell text={'Ship to'} />,
      renderCell: (params: GridRenderCellParams) => <Text isCell text={params.value} />,
      width: 83,

      table: DataGridFilterTables.INVENTORY_SHIPMENTS,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'unitsExpected',
      headerName: 'Units expected',
      renderHeader: () => <MultilineTextHeaderCell text={'Units expected'} />,
      renderCell: (params: GridRenderCellParams) => <Text isCell text={params.value} />,
      width: 83,

      table: DataGridFilterTables.INVENTORY_SHIPMENTS,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: (params: GridRenderCellParams) => <Text isCell text={params.value} />,
      width: 83,

      table: DataGridFilterTables.INVENTORY_SHIPMENTS,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'scheduledCarrierDeliveryDate',
      headerName: 'Scheduled carrier delivery date',
      renderHeader: () => <MultilineTextHeaderCell text={'Scheduled carrier delivery date'} />,
      renderCell: (params: GridRenderCellParams<Date>) => <NormDateCell dateWithoutTime value={params.value} />,
      width: 155,

      table: DataGridFilterTables.INVENTORY_SHIPMENTS,
      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'deliveryWindowStart',
      headerName: 'Delivery window start',
      renderHeader: () => <MultilineTextHeaderCell text={'Delivery window start'} />,
      renderCell: (params: GridRenderCellParams) => <NormDateCell dateWithoutTime value={params.value} />,
      width: 118,

      table: DataGridFilterTables.INVENTORY_SHIPMENTS,
      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'deliveryWindowEnd',
      headerName: 'Delivery window end',
      renderHeader: () => <MultilineTextHeaderCell text={'Delivery window end'} />,
      renderCell: (params: GridRenderCellParams) => <NormDateCell dateWithoutTime value={params.value} />,
      width: 118,

      table: DataGridFilterTables.INVENTORY_SHIPMENTS,
      columnKey: columnnsKeys.shared.DATE_VALUE,
    },
  ]

  for (const column of columns) {
    // @ts-ignore
    column.sortable = false
  }

  return columns
}

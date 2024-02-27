import { GridRenderCellParams } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductAsinCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

export const clientIntegrationsReportInventoryShipmentsColumns = () => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: (params: GridRenderCellParams<Date>) => <NormDateCell value={params.value} />,
    width: 118,

    table: DataGridFilterTables.INVENTORY_SHIPMENTS,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'shop',
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value?.name} />,
    width: 150,

    table: DataGridFilterTables.INVENTORY_SHIPMENTS,
    columnKey: columnnsKeys.shared.OBJECT,

    sortable: false,
  },

  {
    field: 'sku',
    headerName: t(TranslationKey.SKU),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.SKU)} />,

    renderCell: (params: GridRenderCellParams) => (
      <ProductAsinCell withoutTitle withoutAsin image={params.row?.image} skuByClient={params.row?.sku} />
    ),
    width: 250,
    sortable: false,

    table: DataGridFilterTables.INVENTORY_SHIPMENTS,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'shipmentId',
    headerName: 'Shipment ID',
    renderHeader: () => <MultilineTextHeaderCell text={'Shipment ID'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 143,

    table: DataGridFilterTables.INVENTORY_SHIPMENTS,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'referenceId',
    headerName: 'Reference ID',
    renderHeader: () => <MultilineTextHeaderCell text={'Reference ID'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
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
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'dateUpdated',
    headerName: 'Date updated',
    renderHeader: () => <MultilineTextHeaderCell text={'Date updated'} />,
    renderCell: (params: GridRenderCellParams) => <NormDateCell dateWithoutTime value={params.value} />,
    width: 118,

    table: DataGridFilterTables.INVENTORY_SHIPMENTS,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'shipTo',
    headerName: 'Ship to',
    renderHeader: () => <MultilineTextHeaderCell text={'Ship to'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,

    table: DataGridFilterTables.INVENTORY_SHIPMENTS,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'unitsExpected',
    headerName: 'Units expected',
    renderHeader: () => <MultilineTextHeaderCell text={'Units expected'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,

    table: DataGridFilterTables.INVENTORY_SHIPMENTS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'status',
    headerName: 'Status',
    renderHeader: () => <MultilineTextHeaderCell text={'Status'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
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
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'deliveryWindowStart',
    headerName: 'Delivery window start',
    renderHeader: () => <MultilineTextHeaderCell text={'Delivery window start'} />,
    renderCell: (params: GridRenderCellParams) => <NormDateCell dateWithoutTime value={params.value} />,
    width: 118,

    table: DataGridFilterTables.INVENTORY_SHIPMENTS,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'deliveryWindowEnd',
    headerName: 'Delivery window end',
    renderHeader: () => <MultilineTextHeaderCell text={'Delivery window end'} />,
    renderCell: (params: GridRenderCellParams) => <NormDateCell dateWithoutTime value={params.value} />,
    width: 118,

    table: DataGridFilterTables.INVENTORY_SHIPMENTS,
    columnKey: columnnsKeys.shared.DATE,
  },
]

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, TextCell, UserLinkCell } from '@components/data-grid/data-grid-cells'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const inventoryShipmentsColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = [
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
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'sku',
      headerName: 'Sku',
      renderHeader: () => <MultilineTextHeaderCell text="Sku" />,

      renderCell: params => <TextCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'shipmentId',
      headerName: 'Shipment id',
      renderHeader: () => <MultilineTextHeaderCell text="Shipment id" />,

      renderCell: params => <TextCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'referenceId',
      headerName: 'Reference id',
      renderHeader: () => <MultilineTextHeaderCell text="Reference id" />,

      renderCell: params => <TextCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'amzDateUpdated',
      headerName: 'Amz date updated',
      renderHeader: () => <MultilineTextHeaderCell text="Amz date updated" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'amzDateCreated',
      headerName: 'Amz date created',
      renderHeader: () => <MultilineTextHeaderCell text="Amz date created" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'shipTo',
      headerName: 'Ship to',
      renderHeader: () => <MultilineTextHeaderCell text="Ship to" />,

      renderCell: params => <TextCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'unitsExpected',
      headerName: 'Units expected',
      renderHeader: () => <MultilineTextHeaderCell text="Units expected" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'unitsReceived',
      headerName: 'Units received',
      renderHeader: () => <MultilineTextHeaderCell text="Units received" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'deliveryWindowStart',
      headerName: 'Delivery window start',
      renderHeader: () => <MultilineTextHeaderCell text="Delivery window start" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'deliveryWindowEnd',
      headerName: 'Delivery window end',
      renderHeader: () => <MultilineTextHeaderCell text="Delivery window end" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'status',
      headerName: 'Status',
      renderHeader: () => <MultilineTextHeaderCell text="Status" />,

      renderCell: params => <TextCell text={params.value?.replaceAll('_', ' ')} />,
      transformValueMethod: value => value?.replaceAll('_', ' '),
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'destinationDateUpdated',
      headerName: 'Destination date updated',
      renderHeader: () => <MultilineTextHeaderCell text="Destination date updated" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'shipmentDateCreated',
      headerName: 'Shipment date created',
      renderHeader: () => <MultilineTextHeaderCell text="Shipment date created" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'numberOfDestinations',
      headerName: 'Number of destinations',
      renderHeader: () => <MultilineTextHeaderCell text="Number of destinations" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'trackingNumber',
      headerName: 'Tracking number',
      renderHeader: () => <MultilineTextHeaderCell text="Tracking number" />,

      renderCell: params => <TextCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'scheduledCarrierDeliveryDate',
      headerName: 'Scheduled carrier delivery date',
      renderHeader: () => <MultilineTextHeaderCell text="Scheduled carrier delivery date" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'checkedInData',
      headerName: 'Checked in data',
      renderHeader: () => <MultilineTextHeaderCell text="Checked in data" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = ParsingReportsType.INVENTORY_SHIPMENTS
    }

    column.sortable = false
  }

  return columns
}

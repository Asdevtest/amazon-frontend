import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, UserLinkCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

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

      renderCell: params => <Text isCell text={params.row?.shop?.name} />,
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

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'shipmentId',
      headerName: 'Shipment id',
      renderHeader: () => <MultilineTextHeaderCell text="Shipment id" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'referenceId',
      headerName: 'Reference id',
      renderHeader: () => <MultilineTextHeaderCell text="Reference id" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
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

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'unitsExpected',
      headerName: 'Units expected',
      renderHeader: () => <MultilineTextHeaderCell text="Units expected" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'unitsReceived',
      headerName: 'Units received',
      renderHeader: () => <MultilineTextHeaderCell text="Units received" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
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

      renderCell: params => <Text isCell text={params.value?.replaceAll('_', ' ')} />,
      transformValueMethod: value => value?.replaceAll('_', ' '),
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'trackingNumber',
      headerName: 'Tracking number',
      renderHeader: () => <MultilineTextHeaderCell text="Tracking number" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
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

import { GridRowModel } from '@mui/x-data-grid-premium'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { boxStatusTranslateKey } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell, BoxesAndQuantityCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { formatDate } from '@utils/date-time'
import { getNewTariffTextForBoxOrOrder } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

interface IProductInTransferColumns {
  onClickChangeVariation: (id: string) => void
}

export const productBoxesColumns = ({ onClickChangeVariation }: IProductInTransferColumns) => {
  const columns: IGridColumn[] = [
    {
      field: 'xid',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={row?.xid || '-'} />,
      table: DataGridFilterTables.BOXES,
      columnKey: columnnsKeys.shared.NUMBER,
      width: 80,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={boxStatusTranslateKey(row?.status) || '-'} />,
      table: DataGridFilterTables.BOXES,
      transformValueMethod: boxStatusTranslateKey,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      width: 180,
    },

    {
      field: 'batchXid',
      headerName: t(TranslationKey['Batch number']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch number'])} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={row?.batch?.xid || '-'} />,
      table: DataGridFilterTables.BATCHES,
      columnKey: columnnsKeys.shared.NUMBER,
      width: 100,
    },

    {
      field: 'batchTitle',
      headerName: t(TranslationKey['Batch title']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch title'])} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={row?.batch?.title || '-'} />,
      table: DataGridFilterTables.BATCHES,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      width: 110,
    },

    {
      field: 'boxesAndQuantity',
      headerName: t(TranslationKey['Boxes x units']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Boxes x units'])} />,
      renderCell: ({ row }: GridRowModel) => <BoxesAndQuantityCell boxesData={row} />,
      disableCustomSort: true,
      filterable: false,
      width: 170,
    },

    {
      field: 'storekeeper',
      headerName: t(TranslationKey.Storekeeper),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Storekeeper)} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={row?.storekeeper?.name || '-'} />,
      table: DataGridFilterTables.BOXES,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
      width: 180,
    },

    {
      field: 'destination',
      headerName: t(TranslationKey.Destination),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={row?.destination?.name || '-'} />,
      table: DataGridFilterTables.BOXES,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
      width: 150,
    },

    {
      field: 'fbaShipment',
      headerName: 'FBA Shipment',
      renderHeader: () => <MultilineTextHeaderCell text="FBA Shipment" />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={row?.fbaShipment || '-'} />,
      table: DataGridFilterTables.BOXES,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      width: 165,
    },

    {
      field: 'logicsTariff',
      headerName: t(TranslationKey.Tariff),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={getNewTariffTextForBoxOrOrder(row) || '-'} />,
      table: DataGridFilterTables.BOXES,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
      width: 120,
    },

    {
      field: 'logicsTariffCls',
      headerName: t(TranslationKey['CLS (batch closing date)']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['CLS (batch closing date)'])} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={formatDate(row?.logicsTariff?.cls) || '-'} />,
      table: DataGridFilterTables.BOXES,
      columnKey: columnnsKeys.shared.DATE,
      width: 110,
    },

    {
      field: 'logicsTariffEtd',
      headerName: t(TranslationKey['ETD (date of shipment)']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ETD (date of shipment)'])} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={formatDate(row?.logicsTariff?.etd) || '-'} />,
      table: DataGridFilterTables.BOXES,
      columnKey: columnnsKeys.shared.DATE,
      width: 110,
    },

    {
      field: 'logicsTariffEta',
      headerName: t(TranslationKey['ETA (arrival date)']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ETA (arrival date)'])} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={formatDate(row?.logicsTariff?.eta) || '-'} />,
      table: DataGridFilterTables.BOXES,
      columnKey: columnnsKeys.shared.DATE,
      width: 110,
    },

    {
      field: 'arrivalDate',
      headerName: t(TranslationKey['Arrival date']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Arrival date'])} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={formatDate(row?.batch?.arrivalDate) || '-'} />,
      table: DataGridFilterTables.BATCHES,
      columnKey: columnnsKeys.shared.DATE,
      width: 110,
    },

    {
      field: 'actions',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: ({ row }: GridRowModel) => (
        <ActionButtonsCell
          showFirst
          firstDisabled={!row.batch}
          firstContent={t(TranslationKey['Watch the batch'])}
          onClickFirst={() => onClickChangeVariation(row?.batch?._id)}
        />
      ),
      disableCustomSort: true,
      filterable: false,
      width: 190,
    },
  ]

  for (const column of columns) {
    column.sortable = false
  }

  return columns
}

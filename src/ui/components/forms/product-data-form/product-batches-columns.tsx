import { GridRowModel } from '@mui/x-data-grid-premium'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  BoxesAndQuantityCell,
  MultilineTextHeaderCell,
  StringListCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { formatDate } from '@utils/date-time'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

interface IProductInTransferColumns {
  onClickChangeVariation: (id: string) => void
}

export const productBatchesColumns = ({ onClickChangeVariation }: IProductInTransferColumns) => {
  const columns: IGridColumn[] = [
    {
      field: 'humanFriendlyId',
      headerName: t(TranslationKey['Batch number']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch number'])} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={row?.humanFriendlyId || 0} />,
      table: DataGridFilterTables.BATCHES,
      columnKey: columnnsKeys.shared.QUANTITY,
      width: 80,
    },

    {
      field: 'title',
      headerName: t(TranslationKey['Batch title']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch title'])} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={row?.title || '-'} />,
      table: DataGridFilterTables.BATCHES,
      columnKey: columnnsKeys.shared.STRING,
      width: 110,
    },

    {
      field: 'amountInBatch',
      headerName: t(TranslationKey['Number of units']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Number of units'])} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={row?.amountInBatch || 0} />,
      table: DataGridFilterTables.BATCHES,
      columnKey: columnnsKeys.shared.QUANTITY,
      width: 110,
    },

    {
      field: 'boxesAndQuantity',
      headerName: t(TranslationKey['Boxes x units']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Boxes x units'])} />,
      renderCell: ({ row }: GridRowModel) => <BoxesAndQuantityCell boxesData={row?.boxes} />,
      width: 170,
    },

    {
      field: 'storekeeper',
      headerName: t(TranslationKey.Storekeeper),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Storekeeper)} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={row?.storekeeper?.name || '-'} />,
      table: DataGridFilterTables.BOXES,
      columnKey: columnnsKeys.shared.OBJECT,
      width: 180,
    },

    {
      field: 'destination',
      headerName: t(TranslationKey.Destination),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={row?.boxes?.[0]?.destination?.name || '-'} />,
      table: DataGridFilterTables.BOXES,
      columnKey: columnnsKeys.shared.OBJECT,
      width: 150,
    },

    {
      field: 'fbaShipment',
      headerName: 'FBA Shipment',
      renderHeader: () => <MultilineTextHeaderCell text={'FBA Shipment'} />,
      renderCell: ({ row }: GridRowModel) => (
        <StringListCell
          withCopy
          maxItemsDisplay={4}
          maxLettersInItem={15}
          sourceString={row?.boxes?.[0]?.fbaShipment}
        />
      ),
      table: DataGridFilterTables.BOXES,
      columnKey: columnnsKeys.shared.STRING,
      width: 165,
    },

    {
      field: 'logicsTariffCls',
      headerName: t(TranslationKey['CLS (batch closing date)']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['CLS (batch closing date)'])} />,
      renderCell: ({ row }: GridRowModel) => (
        <Text isCell text={formatDate(row?.boxes?.[0]?.logicsTariff?.cls) || '-'} />
      ),
      table: DataGridFilterTables.BOXES,
      columnKey: columnnsKeys.shared.DATE,
      width: 110,
    },

    {
      field: 'logicsTariffEtd',
      headerName: t(TranslationKey['ETD (date of shipment)']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ETD (date of shipment)'])} />,
      renderCell: ({ row }: GridRowModel) => (
        <Text isCell text={formatDate(row?.boxes?.[0]?.logicsTariff?.etd) || '-'} />
      ),
      table: DataGridFilterTables.BOXES,
      columnKey: columnnsKeys.shared.DATE,
      width: 110,
    },

    {
      field: 'logicsTariffEta',
      headerName: t(TranslationKey['ETA (arrival date)']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ETA (arrival date)'])} />,
      renderCell: ({ row }: GridRowModel) => (
        <Text isCell text={formatDate(row?.boxes?.[0]?.logicsTariff?.eta) || '-'} />
      ),
      table: DataGridFilterTables.BOXES,
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
          firstContent={t(TranslationKey['Watch the batch'])}
          onClickFirst={() => onClickChangeVariation(row?._id)}
        />
      ),
      disableCustomSort: true,
      width: 190,
    },
  ]

  for (const column of columns) {
    column.disableColumnMenu = true
    column.filterable = false
    column.sortable = false
  }

  return columns
}

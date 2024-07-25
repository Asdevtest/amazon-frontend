import { GridRowModel } from '@mui/x-data-grid-premium'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  BatchBoxesCell,
  BatchTrackingCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ToFixedWithKgSignCell,
  WarehouseTariffDatesCell,
} from '@components/data-grid/data-grid-cells'

import { getNewTariffTextForBoxOrOrder, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

import { IColumnsProps } from './warehouse-my-batches-view.config'

export const warehouseMyBatchesViewColumns = (columnsProps: IColumnsProps) => {
  const columns: IGridColumn[] = [
    {
      field: 'asin',
      headerName: t(TranslationKey.Product),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
      renderCell: ({ row }: GridRowModel) => <BatchBoxesCell boxes={row.boxes} />,
      width: 400,
      fields: getProductColumnMenuItems({ withoutSku: true }),
      columnMenuConfig: getProductColumnMenuValue(),
      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
    },

    {
      field: 'title',
      headerName: t(TranslationKey['Batch title']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch title'])} />,
      renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={row.title} />,
      width: 150,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'destination',
      headerName: t(TranslationKey.Destination),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
      renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={row?.boxes?.[0]?.destination?.name} />,
      width: 130,
      filterable: false,
      sortable: false,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'quantityBoxes',
      headerName: t(TranslationKey.Boxes),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Boxes)} />,
      renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={row.quantityBoxes} />,
      type: 'number',
      width: 70,
      filterable: false,
      sortable: false,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'humanFriendlyId',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
      renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={row.humanFriendlyId} />,
      type: 'number',
      width: 80,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'logicsTariff',
      headerName: t(TranslationKey.Tariff),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,
      renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={getNewTariffTextForBoxOrOrder(row.boxes[0])} />,
      width: 250,
      filterable: false,
      sortable: false,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'trackingNumber',
      headerName: t(TranslationKey['Batch tracking']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch tracking'])} />,
      renderCell: ({ row }: GridRowModel) => (
        <BatchTrackingCell
          disabled={!columnsProps.isSentBatches}
          id={row?._id}
          arrivalDate={row?.arrivalDate}
          trackingNumber={row?.trackingNumber}
          rowHandlers={columnsProps}
        />
      ),
      width: 210,
      filterable: false,
      sortable: false,
      columnKey: columnnsKeys.shared.BATCHES_TRACKING,
    },

    {
      field: 'finalWeight',
      headerName: t(TranslationKey['Final weight']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,
      renderCell: ({ row }: GridRowModel) => <ToFixedWithKgSignCell value={row.finalWeight} fix={2} />,
      width: 120,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'deliveryTotalPrice',
      headerName: t(TranslationKey['Delivery cost']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Delivery cost'])} />,
      renderCell: ({ row }: GridRowModel) => (
        <MultilineTextCell text={toFixedWithDollarSign(row.deliveryTotalPrice, 2)} />
      ),
      width: 120,
      filterable: false,
      sortable: false,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'cls',
      headerName: t(TranslationKey.Dates),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Dates)} />,
      renderCell: ({ row }: GridRowModel) => (
        <WarehouseTariffDatesCell
          cls={row.boxes[0].logicsTariff?.cls}
          etd={row.boxes[0].logicsTariff?.etd}
          eta={row.boxes[0].logicsTariff?.eta}
        />
      ),
      width: 330,
      filterable: false,
      sortable: false,
      columnKey: columnnsKeys.shared.BATCHES_SHIPPING_DATE,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.updatedAt} />,
      width: 120,
      columnKey: columnnsKeys.shared.DATE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.BATCHES
    }
    column.sortable = false
  }

  return columns
}

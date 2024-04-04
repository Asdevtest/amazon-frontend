import { GridValidRowModel } from '@mui/x-data-grid-premium'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { ApproximateCell } from '@components/data-grid/data-grid-cells/approximate-cell/approximate-cell'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

export const SupplierApproximateCalculationsColumns = () => [
  {
    field: 'name',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,
    width: 160,
    renderCell: (params: GridValidRowModel) => <MultilineTextCell text={params.value} />,
    filterable: false,
    sortable: false,
    table: DataGridFilterTables.STOREKEEPERS,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'destinationName',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

    renderCell: (params: GridValidRowModel) => (
      <ApproximateCell destinations={params.row.destinationVariations} field="destinationName" />
    ),
    minWidth: 140,
    align: 'center',
    filterable: false,
    sortable: false,
    table: DataGridFilterTables.STOREKEEPERS,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'minWeight',
    headerName: t(TranslationKey['Min. weight, kg']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Min. weight, kg'])} />,
    renderCell: (params: GridValidRowModel) => (
      <ApproximateCell destinations={params.row.destinationVariations} field="minWeight" />
    ),
    width: 100,
    align: 'center',
    filterable: false,
    sortable: false,
    table: DataGridFilterTables.STOREKEEPERS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'maxWeight',
    headerName: t(TranslationKey['Max. weight, kg']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Max. weight, kg'])} />,
    renderCell: (params: GridValidRowModel) => (
      <ApproximateCell destinations={params.row.destinationVariations} field="maxWeight" />
    ),
    width: 100,
    align: 'center',
    filterable: false,
    sortable: false,
    table: DataGridFilterTables.STOREKEEPERS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'costUnitWithDeliveryToChina',
    headerName: t(TranslationKey['Cost per unit with delivery to China']),
    renderHeader: () => (
      <MultilineTextHeaderCell text={t(TranslationKey['Cost per unit with delivery to China']) + ', $'} />
    ),
    renderCell: (params: GridValidRowModel) => <MultilineTextCell text={toFixed(params.value, 2)} />,
    width: 130,
    align: 'center',
    filterable: false,
    sortable: false,
    table: DataGridFilterTables.STOREKEEPERS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'pricePerKgUsd',
    headerName: t(TranslationKey['price per unit']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['price per unit']) + ', $'} />,
    renderCell: (params: GridValidRowModel) => (
      <ApproximateCell destinations={params.row.destinationVariations} field="pricePerKgUsd" />
    ),
    width: 130,
    align: 'center',
    filterable: false,
    sortable: false,
    table: DataGridFilterTables.STOREKEEPERS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'costUnitWithDeliveryToUsa',
    headerName: t(TranslationKey['Cost of per unit in the U.S.']) + ', $',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Cost of per unit in the U.S.']) + ', $'} />,
    renderCell: (params: GridValidRowModel) => (
      <ApproximateCell destinations={params.row.destinationVariations} field="costUnitWithDeliveryToUsa" />
    ),
    width: 130,
    align: 'center',
    filterable: false,
    sortable: false,
    table: DataGridFilterTables.STOREKEEPERS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'roi',
    headerName: t(TranslationKey['ROI calculation']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ROI calculation'])} />,
    renderCell: (params: GridValidRowModel) => (
      <ApproximateCell destinations={params.row.destinationVariations} field="roi" />
    ),
    width: 140,
    align: 'center',
    filterable: false,
    sortable: false,
    table: DataGridFilterTables.STOREKEEPERS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },
]

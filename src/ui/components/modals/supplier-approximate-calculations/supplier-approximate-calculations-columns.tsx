import { GridRenderCellParams, GridValidRowModel } from '@mui/x-data-grid-premium'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  TariffInfoCell,
  VariationTariffDateCell,
} from '@components/data-grid/data-grid-cells'
import { VariationTariffRoiCell } from '@components/data-grid/data-grid-cells/variation-tariff-roi-cell/variation-tariff-roi-cell'

import { formatDateWithoutTime } from '@utils/date-time'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IDestinationVariationWithCalculations } from '@typings/shared/destinations'

interface columnHandlersProps {
  isHideCalculation: boolean
}

export const SupplierApproximateCalculationsColumns = (columnHandlers: columnHandlersProps) => {
  const columns = [
    {
      field: 'name',
      headerName: t(TranslationKey.Tariff),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,
      width: 140,
      renderCell: (params: GridValidRowModel) => (
        <TariffInfoCell title={params.value} description={params?.row?.description} />
      ),
      filterable: false,
      sortable: false,
      table: DataGridFilterTables.STOREKEEPERS,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'destinationName',
      headerName: t(TranslationKey.Destination),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

      renderCell: () => null,
      valueGetter: (params: GridRenderCellParams) =>
        params.row?.destinationVariations
          ?.map((el: IDestinationVariationWithCalculations) => el?.destination?.name)
          .join(', '),
      minWidth: 100,
      align: 'center',
      filterable: false,
      sortable: false,
      table: DataGridFilterTables.STOREKEEPERS,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'minWeight',
      headerName: `${t(TranslationKey.Weight)}, ${t(TranslationKey.kg)}`,
      renderHeader: () => <MultilineTextHeaderCell text={`${t(TranslationKey.Weight)}, ${t(TranslationKey.kg)}`} />,
      renderCell: () => null,
      valueGetter: (params: GridRenderCellParams) =>
        params.row?.destinationVariations
          ?.map(
            (variation: IDestinationVariationWithCalculations) =>
              `${toFixed(variation?.minWeight)} - ${toFixed(variation?.maxWeight)}`,
          )
          .join(', '),
      width: 140,
      align: 'center',
      fields: [
        {
          label: () => t(TranslationKey['Min. weight, kg']),
          value: 'minWeight',
        },
        {
          label: () => t(TranslationKey['Max. weight, kg']),
          value: 'maxWeight',
        },
      ],
      filterable: false,
      sortable: false,
      table: DataGridFilterTables.STOREKEEPERS,
      columnKey: columnnsKeys.shared.NUMBERS,
    },

    {
      field: 'pricePerKgRmb',
      headerName: t(TranslationKey['Price per kg']) + ', Ұ',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Price per kg']) + ', Ұ'} />,
      renderCell: () => null,
      valueGetter: (params: GridRenderCellParams) =>
        params.row?.destinationVariations
          ?.map((variation: IDestinationVariationWithCalculations) => toFixed(variation?.pricePerKgRmb))
          .join(', '),
      width: 80,
      align: 'center',
      filterable: false,
      sortable: false,
      table: DataGridFilterTables.STOREKEEPERS,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'pricePerKgUsd',
      headerName: t(TranslationKey['Price per kg']) + ', $',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Price per kg']) + ', $'} />,
      renderCell: () => null,
      valueGetter: (params: GridRenderCellParams) =>
        params.row?.destinationVariations
          ?.map((variation: IDestinationVariationWithCalculations) => toFixed(variation?.pricePerKgUsd))
          .join(', '),
      width: 80,
      align: 'center',
      filterable: false,
      sortable: false,
      table: DataGridFilterTables.STOREKEEPERS,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'cls',
      headerName: t(TranslationKey.Dates),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Dates)} />,
      renderCell: (params: GridValidRowModel) => <VariationTariffDateCell tariff={params.row} />,
      valueGetter: (params: GridRenderCellParams) => {
        return `cls: ${formatDateWithoutTime(params.row?.cls)}, etd: ${formatDateWithoutTime(
          params.row?.etd,
        )}, eta: ${formatDateWithoutTime(params.row?.eta)}`
      },
      width: 140,
      align: 'center',
      filterable: false,
      sortable: false,
      table: DataGridFilterTables.STOREKEEPERS,
      columnKey: columnnsKeys.shared.BATCHES_SHIPPING_DATE,
    },

    {
      field: 'deliveryTimeInDay',
      headerName: t(TranslationKey['Delivery time, days']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Delivery time, days'])} />,
      width: 130,
      renderCell: (params: GridValidRowModel) => <MultilineTextCell text={params.value} />,
      table: DataGridFilterTables.STOREKEEPERS,
      sortable: false,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'costUnitWithDeliveryToChina',
      headerName: t(TranslationKey['Cost per unit with delivery to China']),
      renderHeader: () => (
        <MultilineTextHeaderCell text={t(TranslationKey['Cost per unit with delivery to China']) + ', $'} />
      ),
      renderCell: (params: GridValidRowModel) => <MultilineTextCell text={toFixed(params.value, 2)} />,
      valueGetter: (params: GridRenderCellParams) => toFixed(params.row?.costUnitWithDeliveryToChina),
      width: 150,
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
        <MultilineTextCell text={toFixed(params.row.avgCostUnitWithDeliveryToUsa, 2)} />
      ),
      valueGetter: (params: GridRenderCellParams) =>
        params.row?.destinationVariations
          ?.map((variation: IDestinationVariationWithCalculations) =>
            toFixed(variation?.destination?.costUnitWithDeliveryToUsa),
          )
          .join(', '),
      width: 130,
      align: 'center',
      filterable: false,
      sortable: false,
      table: DataGridFilterTables.STOREKEEPERS,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'roi',
      headerName: `${t(TranslationKey['ROI calculation'])}, %`,
      renderHeader: () => <MultilineTextHeaderCell text={`${t(TranslationKey['ROI calculation'])}, %`} />,
      renderCell: (params: GridValidRowModel) => <VariationTariffRoiCell roi={toFixed(params.row.avgRoi, 2)} />,
      valueGetter: (params: GridRenderCellParams) =>
        params.row?.destinationVariations
          ?.map((variation: IDestinationVariationWithCalculations) => toFixed(variation?.destination?.roi))
          .join(', '),
      width: 140,
      align: 'center',
      filterable: false,
      sortable: false,
      table: DataGridFilterTables.STOREKEEPERS,
      columnKey: columnnsKeys.shared.QUANTITY,
    },
  ]

  if (columnHandlers.isHideCalculation) {
    // @ts-ignore
    return columns?.slice(0, -3)
  }

  return columns
}

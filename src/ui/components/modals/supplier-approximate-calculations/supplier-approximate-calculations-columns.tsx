import { GridValidRowModel } from '@mui/x-data-grid-premium'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ApproximateWeightCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  TariffInfoCell,
  VariationTariffDateCell,
} from '@components/data-grid/data-grid-cells'
import { ApproximateCell } from '@components/data-grid/data-grid-cells/approximate-cell/approximate-cell'
import { VariationTariffRoiCell } from '@components/data-grid/data-grid-cells/variation-tariff-roi-cell/variation-tariff-roi-cell'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IVariationParams } from './supplier-approximate-calculations.type'

interface columnHandlersProps {
  isTariffsSelect: boolean
  isHideCalculation: boolean
  getCurrentVariationId: () => string | undefined
  getCurrentDestinationId: () => string | undefined
  getStrictVariationSelect: () => boolean | undefined
  onClickChangeVariation: ({ variationId, destinationId, logicsTariffId }: IVariationParams) => void
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

      renderCell: (params: GridValidRowModel) => (
        <ApproximateCell borderLeft destinations={params.row.destinationVariations} field="destinationName" />
      ),
      minWidth: 100,
      align: 'center',
      filterable: false,
      sortable: false,
      table: DataGridFilterTables.STOREKEEPERS,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'minWeight',
      headerName: t(TranslationKey.Weight),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Weight)} />,
      renderCell: (params: GridValidRowModel) => (
        <ApproximateWeightCell
          isTariffsSelect={columnHandlers.isTariffsSelect}
          variations={params.row.destinationVariations}
          currentVariationId={columnHandlers.getCurrentVariationId()}
          currentDestinationId={columnHandlers.getCurrentDestinationId()}
          isStrictVariationSelect={columnHandlers.getStrictVariationSelect()}
          onClickChangeVariation={columnHandlers.onClickChangeVariation}
        />
      ),
      width: 140,
      align: 'center',
      filterable: false,
      sortable: false,
      table: DataGridFilterTables.STOREKEEPERS,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'pricePerKgRmb',
      headerName: t(TranslationKey['Price per kg']) + ', Ұ',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Price per kg']) + ', Ұ'} />,
      renderCell: (params: GridValidRowModel) => (
        <ApproximateCell destinations={params.row.destinationVariations} field="pricePerKgRmb" />
      ),
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
      renderCell: (params: GridValidRowModel) => (
        <ApproximateCell borderRight destinations={params.row.destinationVariations} field="pricePerKgUsd" />
      ),
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
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'costUnitWithDeliveryToChina',
      headerName: t(TranslationKey['Cost per unit with delivery to China']),
      renderHeader: () => (
        <MultilineTextHeaderCell text={t(TranslationKey['Cost per unit with delivery to China']) + ', $'} />
      ),
      renderCell: (params: GridValidRowModel) => <MultilineTextCell text={toFixed(params.value, 2)} />,
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
        <ApproximateCell borderLeft destinations={params.row.destinationVariations} field="costUnitWithDeliveryToUsa" />
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
      headerName: `${t(TranslationKey['ROI calculation'])}, %`,
      renderHeader: () => <MultilineTextHeaderCell text={`${t(TranslationKey['ROI calculation'])}, %`} />,
      renderCell: (params: GridValidRowModel) => (
        <VariationTariffRoiCell destinations={params.row.destinationVariations} />
      ),
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

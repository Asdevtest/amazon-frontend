import { GridRowModel } from '@mui/x-data-grid-premium'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { boxStatusTranslateKey, colorByBoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  BoxesAndQuantityCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  StringListCell,
} from '@components/data-grid/data-grid-cells'

import { formatDate } from '@utils/date-time'
import { getNewTariffTextForBoxOrOrder } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

interface IProductInTransferColumns {
  onClickChangeVariation: (id: string) => void
}

export const productBoxesColumns = ({ onClickChangeVariation }: IProductInTransferColumns) => [
  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={row?.humanFriendlyId || '-'} />,
    table: DataGridFilterTables.BOXES,
    columnKey: columnnsKeys.shared.QUANTITY,
    width: 60,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: ({ row }: GridRowModel) => (
      <MultilineTextCell
        text={t(boxStatusTranslateKey(row?.status)) || '-'}
        customTextStyles={colorByBoxStatus(row?.status)}
      />
    ),
    table: DataGridFilterTables.BOXES,
    columnKey: columnnsKeys.shared.STRING,
    width: 180,
  },

  {
    field: 'batchHumanFriendlyId',
    headerName: t(TranslationKey['Batch number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch number'])} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={row?.batch?.humanFriendlyId || '-'} />,
    table: DataGridFilterTables.BATCHES,
    columnKey: columnnsKeys.shared.QUANTITY,
    width: 100,
  },

  {
    field: 'batchTitle',
    headerName: t(TranslationKey['Batch title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch title'])} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={row?.batch?.title || '-'} />,
    table: DataGridFilterTables.BATCHES,
    columnKey: columnnsKeys.shared.STRING,
    width: 110,
  },

  {
    field: 'boxesAndQuantity',
    headerName: t(TranslationKey['Boxes and the quantity of the selected product in them']),
    renderHeader: () => (
      <MultilineTextHeaderCell text={t(TranslationKey['Boxes and the quantity of the selected product in them'])} />
    ),
    renderCell: ({ row }: GridRowModel) => <BoxesAndQuantityCell boxesData={row} />,
    disableColumnMenu: true,
    disableCustomSort: true,
    filterable: false,
    sortable: false,
    width: 170,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey.Storekeeper),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Storekeeper)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={row?.storekeeper?.name || '-'} />,
    table: DataGridFilterTables.BOXES,
    columnKey: columnnsKeys.shared.OBJECT,
    sortable: false,
    width: 180,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={row?.destination?.name || '-'} />,
    table: DataGridFilterTables.BOXES,
    columnKey: columnnsKeys.shared.OBJECT,
    width: 150,
  },

  {
    field: 'fbaShipment',
    headerName: 'FBA Shipment',
    renderHeader: () => <MultilineTextHeaderCell text={'FBA Shipment'} />,
    renderCell: ({ row }: GridRowModel) => (
      <StringListCell withCopy maxItemsDisplay={4} maxLettersInItem={15} sourceString={row?.fbaShipment} />
    ),
    table: DataGridFilterTables.BOXES,
    columnKey: columnnsKeys.shared.STRING,
    width: 165,
  },

  {
    field: 'logicsTariff',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={getNewTariffTextForBoxOrOrder(row) || '-'} />,
    table: DataGridFilterTables.BOXES,
    columnKey: columnnsKeys.shared.OBJECT,
    width: 120,
  },

  {
    field: 'logicsTariffCls',
    headerName: t(TranslationKey['CLS (batch closing date)']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['CLS (batch closing date)'])} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={formatDate(row?.logicsTariff?.cls) || '-'} />,
    table: DataGridFilterTables.BOXES,
    columnKey: columnnsKeys.shared.DATE,
    width: 110,
  },

  {
    field: 'logicsTariffEtd',
    headerName: t(TranslationKey['ETD (date of shipment)']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ETD (date of shipment)'])} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={formatDate(row?.logicsTariff?.etd) || '-'} />,
    table: DataGridFilterTables.BOXES,
    columnKey: columnnsKeys.shared.DATE,
    width: 110,
  },

  {
    field: 'logicsTariffEta',
    headerName: t(TranslationKey['ETA (arrival date)']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ETA (arrival date)'])} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={formatDate(row?.logicsTariff?.eta) || '-'} />,
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
        isFirstButton
        disabledFirstButton={!row.batch}
        firstButtonElement={t(TranslationKey['Watch the batch'])}
        firstButtonStyle={ButtonStyle.PRIMARY}
        onClickFirstButton={() => onClickChangeVariation(row?.batch?._id)}
      />
    ),
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    width: 190,
  },
]

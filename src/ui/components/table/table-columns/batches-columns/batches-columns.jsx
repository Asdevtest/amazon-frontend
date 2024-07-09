import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { BatchStatus } from '@constants/statuses/batch-status'
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

export const batchesViewColumns = (rowHandlers, getStatus) => [
  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
    renderCell: params => <BatchBoxesCell boxes={params.row.originalData.boxes} />,
    width: 400,
    filterable: false,
    sortable: false,
    columnKey: columnnsKeys.shared.BATCHES_PRODUCTS,
  },

  {
    field: 'title',
    headerName: t(TranslationKey['Batch title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch title'])} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 150,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
    renderCell: params => <MultilineTextCell text={params.row?.boxes?.[0]?.destination?.name} />,
    width: 130,
    filterable: false,
    sortable: false,
    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'quantityBoxes',
    headerName: t(TranslationKey.Boxes),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Boxes)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 70,
    filterable: false,
    sortable: false,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 80,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'logicsTariff',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,
    renderCell: params => <MultilineTextCell text={getNewTariffTextForBoxOrOrder(params.row.originalData.boxes[0])} />,
    width: 250,
    filterable: false,
    sortable: false,
    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'trackingNumber',
    headerName: t(TranslationKey['Batch tracking']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch tracking'])} />,
    renderCell: params => {
      const isDisabled = getStatus() !== BatchStatus.HAS_DISPATCHED

      return (
        <BatchTrackingCell
          disableMultilineForTrack
          disabled={isDisabled}
          disabledArrivalDate={isDisabled}
          id={params.row?.originalData?._id}
          arrivalDate={params.row?.originalData?.arrivalDate}
          trackingNumber={params.row?.originalData?.trackingNumber}
          rowHandlers={rowHandlers}
        />
      )
    },
    width: 210,
    filterable: false,
    sortable: false,
    columnKey: columnnsKeys.shared.BATCHES_TRACKING,
  },

  {
    field: 'finalWeight',
    headerName: t(TranslationKey['Final weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,
    renderCell: params => <ToFixedWithKgSignCell value={params.row.originalData.finalWeight} fix={2} />,
    type: 'number',
    width: 120,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'deliveryTotalPrice',
    headerName: t(TranslationKey['Delivery cost']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Delivery cost'])} />,
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    type: 'number',
    width: 120,
    filterable: false,
    sortable: false,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'cls',
    headerName: t(TranslationKey.Dates),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Dates)} />,
    renderCell: params => (
      <WarehouseTariffDatesCell
        cls={params.row.originalData.boxes[0].logicsTariff?.cls}
        etd={params.row.originalData.boxes[0].logicsTariff?.etd}
        eta={params.row.originalData.boxes[0].logicsTariff?.eta}
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
    renderCell: params => <NormDateCell value={params.value} />,
    width: 120,
    columnKey: columnnsKeys.shared.DATE,
  },
]

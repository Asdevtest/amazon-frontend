/* eslint-disable no-unused-vars */
import React from 'react'

import { BatchStatus } from '@constants/statuses/batch-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  NormDateCell,
  BatchBoxesCell,
  ToFixedWithKgSignCell,
  WarehouseTariffDatesCell,
  MultilineTextHeaderCell,
  MultilineTextCell,
  Ayaya,
  BatchTrackingCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'
import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'

export const batchesViewColumns = (rowHandlers, getStatus) => [
  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
    width: 550,
    renderCell: params => <BatchBoxesCell boxes={params.row.originalData.boxes} />,
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
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 130,
    filterable: false,
    sortable: false,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Boxes),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Boxes)} />,

    renderCell: params => (
      <MultilineTextCell text={params.row.originalData.boxes.reduce((ac, cur) => (ac += cur.amount), 0)} />
    ),
    type: 'number',
    width: 70,
    filterable: false,
    sortable: false,
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
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 250,
    filterable: false,
    sortable: false,
    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'trackingNumber',
    headerName: t(TranslationKey['Batch tracking']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch tracking'])} />,
    renderCell: params => (
      <BatchTrackingCell
        disableMultilineForTrack
        disabled={getStatus() !== BatchStatus.HAS_DISPATCHED}
        id={params.row?.originalData?._id}
        arrivalDate={params.row?.originalData?.arrivalDate}
        trackingNumber={params.row?.originalData?.trackingNumber}
        rowHandlers={rowHandlers}
      />
    ),
    width: 198,
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
    width: 150,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'deliveryTotalPrice',
    headerName: t(TranslationKey['Delivery cost']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Delivery cost'])} />,
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    type: 'number',
    width: 150,
    filterable: false,
    sortable: false,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'totalPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    type: 'number',
    width: 150,
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
    width: 350,
    filterable: false,
    sortable: false,
    columnKey: columnnsKeys.shared.BATCHES_SHIPPING_DATE,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <NormDateCell value={params.value} />,
    width: 150,
    // type: 'date',

    columnKey: columnnsKeys.shared.DATE,
  },
]

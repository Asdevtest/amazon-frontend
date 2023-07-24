/* eslint-disable no-unused-vars */
import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  BatchBoxesCell,
  BatchTrackingCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
  WarehouseTariffDatesCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'
import { DataGridSelectViewProductBatch } from '@components/data-grid/data-grid-custom-components/data-grid-select-view-product-batch'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const clientBatchesViewColumns = (rowHandlers, getProductViewMode) => [
  {
    field: 'orders',
    renderHeader: () => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Product)}
        component={
          <DataGridSelectViewProductBatch
            changeViewModeHandler={rowHandlers?.changeViewModeHandler}
            selectedViewMode={getProductViewMode()}
            rootStyles={{ marginLeft: 15 }}
          />
        }
      />
    ),
    headerName: t(TranslationKey.Product),
    width: 384,
    renderCell: params => (
      <BatchBoxesCell boxes={params.row.originalData.boxes} productViewMode={getProductViewMode()} />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'title',
    headerName: t(TranslationKey['Batch title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch title'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 150,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 130,
    sortable: false,
  },

  {
    field: 'boxesCount',
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
    width: 60,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey['Int warehouse']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.storekeeper?._id} />
    ),
    width: 150,
    sortable: false,
  },

  {
    field: 'tariff',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 110,
    sortable: false,
  },

  {
    field: 'batchTracking',
    headerName: t(TranslationKey['Batch tracking']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch tracking'])} />,
    renderCell: params => (
      <BatchTrackingCell
        disabled
        disableMultilineForTrack
        rowHandlers={rowHandlers}
        id={params.row?.originalData?._id}
        arrivalDate={params.row?.originalData?.arrivalDate}
        trackingNumber={params.row?.originalData?.trackingNumber}
      />
    ),
    width: 198,
    filterable: false,
    sortable: false,
  },

  {
    field: 'finalWeight',
    headerName: t(TranslationKey['Final weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,
    renderCell: params => <ToFixedWithKgSignCell value={params.row.originalData.finalWeight} fix={2} />,

    type: 'number',
    width: 100,
  },

  {
    field: 'deliveryTotalPrice',
    headerName: t(TranslationKey['Delivery cost']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Delivery cost'])} />,
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,

    type: 'number',
    width: 110,
    sortable: false,
  },

  {
    field: 'totalPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,

    type: 'number',
    width: 120,
    sortable: false,
  },

  {
    field: 'dates',
    headerName: t(TranslationKey['Shipping dates']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Shipping dates'])} />,

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
  },

  {
    field: 'updatedAt',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    headerName: t(TranslationKey.Updated),
    renderCell: params => <NormDateCell value={params.value} />,
    width: 130,
    // type: 'date',
  },
]

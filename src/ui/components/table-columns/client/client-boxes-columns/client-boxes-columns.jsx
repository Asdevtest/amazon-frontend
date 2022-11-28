/* eslint-disable no-unused-vars */
import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  ChangeChipCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OrderCell,
  OrderManyItemsCell,
  MultilineTextCell,
  ShortBoxDimensions,
  OrdersIdsItemsCell,
} from '@components/data-grid-cells/data-grid-cells'

import {findTariffInStorekeepersData} from '@utils/checks'
import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

export const clientBoxesViewColumns = (handlers, storekeepersData) => [
  // {
  //   field: 'isDraft',
  //   headerName: '',
  //   renderCell: params => (params.value ? 'isDraft' : 'OK'),
  //   width: 60,
  //   type: 'boolean',
  // },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey.Storekeeper),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Storekeeper)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 100,
    sortable: false,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 60,
  },

  {
    field: 'orderIdsItems',
    headerName: t(TranslationKey['№ Order/ № Item']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['№ Order/ № Item'])} />,

    renderCell: params => params.value && <OrdersIdsItemsCell value={params.value} />,
    width: 140,
    sortable: false,
  },

  {
    field: 'orders',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    width: 400,
    renderCell: params =>
      params.row.originalData ? (
        params.row.originalData?.items.length > 1 ? (
          <OrderManyItemsCell
            box={params.row.originalData}
            error={
              !findTariffInStorekeepersData(
                storekeepersData,
                params.row.originalData.storekeeper?._id,
                params.row.originalData.logicsTariff?._id,
              ) && t(TranslationKey['The tariff is invalid or has been removed!'])
            }
          />
        ) : (
          <OrderCell
            box={params.row.originalData}
            product={params.row.originalData?.items[0].product}
            superbox={params.row.originalData?.amount > 1 && params.row.originalData?.amount}
            error={
              !findTariffInStorekeepersData(
                storekeepersData,
                params.row.originalData?.storekeeper?._id,
                params.row.originalData?.logicsTariff?._id,
              ) && t(TranslationKey['The tariff is invalid or has been removed!'])
            }
          />
        )
      ) : (
        ''
      ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'qty',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,

    renderCell: params =>
      params.row.originalData ? (
        // params.row.originalData?.amount > 1 ? (
        //   <SuperboxQtyCell qty={params.row.qty} superbox={params.row.originalData?.amount} />
        // ) : (
        <MultilineTextCell text={params.value * params.row.originalData?.amount} />
      ) : (
        // )
        ''
      ),
    width: 90,
    sortable: false,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey['Destination and tariff']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Destination and tariff'])} />,

    renderCell: params =>
      params.row.originalData ? (
        <div style={{display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', width: '100%'}}>
          <MultilineTextCell text={params.row.destination} />
          <MultilineTextCell text={params.row.logicsTariff} />
        </div>
      ) : (
        ''
      ),
    width: 170,
    filterable: false,
    sortable: false,
  },

  {
    field: 'amazonPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 110,
    sortable: false,
  },

  {
    field: 'fbaShipment',
    headerName: 'FBA Shipment / Shipping Label',
    renderHeader: () => <MultilineTextHeaderCell text={'FBA Shipment / Shipping Label'} />,

    renderCell: params =>
      params.row.originalData ? (
        <div style={{display: 'flex', flexDirection: 'column', gap: '7px'}}>
          <ChangeChipCell
            label={t(TranslationKey['Shipping label']) + ':'}
            disabled={params.row.originalData?.isDraft}
            row={params.row.originalData}
            value={params.row.shippingLabel}
            text={'Set Shipping Label'}
            onClickChip={handlers.onClickShippingLabel}
            onDoubleClickChip={handlers.onDoubleClickShippingLabel}
            onDeleteChip={handlers.onDeleteShippingLabel}
          />

          <ChangeChipCell
            label={t(TranslationKey['FBA Shipment']) + ':'}
            disabled={params.row.originalData?.isDraft}
            row={params.row.originalData}
            value={params.row.fbaShipment}
            text={t(TranslationKey['FBA Shipment'])}
            onClickChip={handlers.onClickFbaShipment}
            onDoubleClickChip={handlers.onDoubleClickFbaShipment}
            onDeleteChip={handlers.onDeleteFbaShipment}
          />
        </div>
      ) : (
        ''
      ),
    minWidth: 220,
    headerAlign: 'center',
    sortable: false,
  },

  {
    field: 'dimansions',
    headerName: t(TranslationKey.Demensions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Demensions)} />,

    renderCell: params =>
      params.row.originalData ? (
        <ShortBoxDimensions
          box={params.row.originalData}
          volumeWeightCoefficient={params.row.volumeWeightCoefficient}
        />
      ) : (
        ''
      ),
    width: 210,
    sortable: false,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    renderCell: params => <NormDateCell params={params} />,
    width: 120,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell params={params} />,
    width: 120,
    type: 'date',
  },
]

import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  ChangeChipCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OrderCell,
  OrderManyItemsCell,
  renderFieldValueCell,
  ShortBoxDimensions,
  SuperboxQtyCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {findTariffInStorekeepersData} from '@utils/checks'
import {t} from '@utils/translations'

export const clientBoxesViewColumns = (handlers, storekeepersData) => [
  {
    field: 'isDraft',
    headerName: '',
    renderCell: params => (params.value ? 'isDraft' : 'OK'),
    width: 60,
    type: 'boolean',
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

    renderCell: params => renderFieldValueCell(params.value),
    width: 50,
  },

  {
    field: 'orders',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    width: 400,
    renderCell: params =>
      params.row.originalData.items.length > 1 ? (
        <OrderManyItemsCell
          box={params.row.originalData}
          error={
            !findTariffInStorekeepersData(
              storekeepersData,
              params.row.originalData.storekeeper._id,
              params.row.originalData.logicsTariff._id,
            ) && t(TranslationKey['The tariff is invalid or has been removed!'])
          }
        />
      ) : (
        <OrderCell
          product={params.row.originalData.items[0].product}
          superbox={params.row.originalData.amount > 1 && params.row.originalData.amount}
          error={
            !findTariffInStorekeepersData(
              storekeepersData,
              params.row.originalData.storekeeper._id,
              params.row.originalData.logicsTariff._id,
            ) && t(TranslationKey['The tariff is invalid or has been removed!'])
          }
        />
      ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'qty',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,

    renderCell: params =>
      params.row.originalData.amount > 1 ? (
        <SuperboxQtyCell qty={params.row.qty} superbox={params.row.originalData.amount} />
      ) : (
        renderFieldValueCell(params.value)
      ),
    width: 110,
    type: 'number',
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Warehouse),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Warehouse)} />,

    renderCell: params => renderFieldValueCell(params.value),
    width: 160,
  },

  {
    field: 'amazonPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,

    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 120,
    type: 'number',
  },

  {
    field: 'fbaShipment',
    headerName: 'FBA Shipment / Shipping Label',
    renderHeader: () => <MultilineTextHeaderCell text={'FBA Shipment / Shipping Label'} />,

    renderCell: params => (
      <div style={{display: 'flex', flexDirection: 'column', gap: '7px'}}>
        <ChangeChipCell
          label={t(TranslationKey['Shipping label']) + ':'}
          disabled={params.row.originalData.isDraft}
          row={params.row.originalData}
          value={params.row.shippingLabel}
          text={'Set Shipping Label'}
          onClickChip={handlers.onClickShippingLabel}
          onDoubleClickChip={handlers.onDoubleClickShippingLabel}
          onDeleteChip={handlers.onDeleteShippingLabel}
        />

        <ChangeChipCell
          label={t(TranslationKey['FBA Shipment']) + ':'}
          disabled={params.row.originalData.isDraft}
          row={params.row.originalData}
          value={params.row.fbaShipment}
          text={t(TranslationKey['FBA Shipment'])}
          onClickChip={handlers.onClickFbaShipment}
          onDoubleClickChip={handlers.onDoubleClickFbaShipment}
          onDeleteChip={handlers.onDeleteFbaShipment}
        />
      </div>
    ),
    minWidth: 230,
    headerAlign: 'center',
  },

  {
    field: 'dimansions',
    headerName: t(TranslationKey.Demensions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Demensions)} />,

    renderCell: params => (
      <ShortBoxDimensions box={params.row.originalData} volumeWeightCoefficient={params.row.volumeWeightCoefficient} />
    ),
    width: 230,
  },

  {
    field: 'createdAt',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    renderCell: params => <NormDateCell params={params} />,
    width: 110,
    type: 'date',
  },

  {
    field: 'updatedAt',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell params={params} />,
    width: 110,
    type: 'date',
  },
]

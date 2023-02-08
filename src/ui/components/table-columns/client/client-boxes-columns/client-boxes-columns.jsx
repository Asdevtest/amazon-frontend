/* eslint-disable no-unused-vars */
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

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
  CheckboxCell,
  WarehouseDestinationAndTariffCell,
  ShopsDataCell,
} from '@components/data-grid-cells/data-grid-cells'

import {findTariffInStorekeepersData} from '@utils/checks'
import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

export const clientBoxesViewColumns = (handlers, storekeepersData, destinations, destinationsFavourites, shopsData) => [
  {
    field: 'storekeeper',
    headerName: t(TranslationKey.Storekeeper),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Storekeeper)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 100,
    sortable: false,
  },

  {
    field: 'shops',
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} Icon={FilterAltOutlinedIcon} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 100,
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
    field: 'isFormed',
    headerName: t(TranslationKey.Formed),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Formed)} Icon={FilterAltOutlinedIcon} />,

    renderCell: params =>
      params.row.originalData ? (
        <CheckboxCell
          disabled={params.row.originalData.isDraft}
          checked={params.value}
          onClick={() => handlers.onChangeIsFormedInBox(params.row.originalData)}
        />
      ) : (
        ''
      ),
    width: 130,
    sortable: false,
    filterable: false,
  },

  {
    field: 'qty',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,

    renderCell: params =>
      params.row.originalData ? <MultilineTextCell text={params.value * params.row.originalData?.amount} /> : '',
    type: 'number',
    width: 90,
    sortable: false,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey['Destination and tariff']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Destination and tariff'])} />,

    renderCell: params =>
      params.row.originalData ? (
        <WarehouseDestinationAndTariffCell
          destinations={destinations}
          boxesMy={params.row.originalData}
          destinationsFavourites={destinationsFavourites}
          setDestinationsFavouritesItem={handlers.onClickSetDestinationFavourite}
          storekeepers={storekeepersData}
          setShowSelectionStorekeeperAndTariffModal={handlers.setShowSelectionStorekeeperAndTariffModal}
          isDraft={params.row.isDraft}
          onSelectDestination={handlers.onSelectDestination}
          onClickSetTariff={handlers.onClickSetTariff}
        />
      ) : (
        ''
      ),
    width: 215,
    filterable: false,
    sortable: false,
  },

  {
    field: 'amazonPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    type: 'number',
    width: 110,
    sortable: false,
  },

  {
    field: 'fbaShipment',
    headerName: 'FBA Shipment / Shipping Label',
    renderHeader: () => <MultilineTextHeaderCell text={'FBA Shipment / Shipping Label'} />,

    renderCell: params =>
      params.row.originalData ? (
        <div style={{display: 'flex', flexDirection: 'column', gap: '7px', padding: '10px 0'}}>
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
    minWidth: 150,
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

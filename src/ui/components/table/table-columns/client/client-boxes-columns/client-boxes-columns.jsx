/* eslint-disable no-unused-vars */

import React, { useMemo, useCallback } from 'react'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { BoxStatus, boxStatusTranslateKey, colorByBoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

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
  ChangeInputCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { findTariffInStorekeepersData } from '@utils/checks'
import { formatDate, getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { timeToDeadlineInHoursAndMins, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { unitsOfChangeOptions } from '@constants/configs/sizes-settings'

export const clientBoxesViewColumns = (
  handlers,
  getStorekeepersData,
  getDestinations,
  getDestinationsFavourites,
  getColumnMenuSettings,
  getOnHover,
  getUnitsOption,
) => [
  {
    field: 'storekeeper',
    headerName: t(TranslationKey.Storekeeper),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Storekeeper)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 100,
    sortable: false,
    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'shopIds',
    headerName: t(TranslationKey.Shop),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Shop)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 100,
    sortable: false,
    columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_SHOPS,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Status)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    width: 160,
    renderCell: params => (
      <MultilineTextCell
        leftAlign
        text={t(boxStatusTranslateKey(params.value))}
        otherStyles={colorByBoxStatus(params.value)}
      />
    ),

    columnKey: columnnsKeys.shared.BOXES_STATUS,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.ID)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 60,

    columnKey: columnnsKeys.client.WAREHOUSE_ID,
  },

  {
    field: 'orderIdsItems',
    headerName: t(TranslationKey['№ Order/ № Item']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['№ Order/ № Item'])}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={
          getColumnMenuSettings()?.item?.currentFilterData?.length ||
          getColumnMenuSettings()?.id?.currentFilterData?.length
        }
      />
    ),

    renderCell: params => params.value && <OrdersIdsItemsCell value={params.value} />,
    width: 160,
    sortable: false,
    columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_ORDER_IDS_ITEMS,
  },

  {
    field: 'orders',
    headerName: t(TranslationKey.Product),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Product)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={
          getColumnMenuSettings()?.asin?.currentFilterData?.length ||
          getColumnMenuSettings()?.skusByClient?.currentFilterData?.length ||
          getColumnMenuSettings()?.amazonTitle?.currentFilterData?.length
        }
      />
    ),

    width: 400,
    renderCell: params => {
      const productMemo = useMemo(() => params.row.originalData?.items[0]?.product, [])
      const rowMemo = useMemo(() => params.row.originalData, [])

      return params.row.originalData ? (
        params.row.originalData?.items.length > 1 ? (
          <OrderManyItemsCell
            box={rowMemo}
            error={
              !findTariffInStorekeepersData(
                getStorekeepersData(),
                params.row.originalData.storekeeper?._id,
                params.row.originalData.logicsTariff?._id,
              ) && t(TranslationKey['The tariff is invalid or has been removed!'])
            }
          />
        ) : (
          <OrderCell
            box={rowMemo}
            product={productMemo}
            superbox={params.row.originalData?.amount > 1 && params.row.originalData?.amount}
            error={
              !findTariffInStorekeepersData(
                getStorekeepersData(),
                params.row.originalData?.storekeeper?._id,
                params.row.originalData?.logicsTariff?._id,
              ) && t(TranslationKey['The tariff is invalid or has been removed!'])
            }
          />
        )
      ) : (
        ''
      )
    },
    filterable: false,
    sortable: false,
    columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_PRODUCT,
  },

  {
    field: 'isFormed',
    headerName: t(TranslationKey.Formed),
    renderHeader: () => <MultilineTextHeaderCell withIcon isFilterActive text={t(TranslationKey.Formed)} />,

    renderCell: params => {
      const onChangeIsFormedInBox = useCallback(() => handlers.onChangeIsFormedInBox(params.row.originalData), [])

      return params.row.originalData ? (
        <CheckboxCell
          disabled={params.row.originalData.isDraft || params.row.status !== BoxStatus.IN_STOCK}
          checked={params.value}
          onClick={onChangeIsFormedInBox}
        />
      ) : (
        ''
      )
    },
    width: 130,
    sortable: false,
    filterable: false,

    columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_IS_FORMED,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Quantity)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params =>
      params.row.originalData ? <MultilineTextCell text={params.value * params.row.originalData?.amount} /> : '',
    type: 'number',
    width: 90,
    sortable: false,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey['Destination and tariff']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Destination and tariff'])}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={
          getColumnMenuSettings()?.logicsTariff?.currentFilterData?.length ||
          getColumnMenuSettings()?.destination?.currentFilterData?.length
        }
      />
    ),

    renderCell: params => {
      // const destinationsMemo = useMemo(() => getDestinations(), [getDestinations()])
      // const destinationsFavouritesMemo = useMemo(() => getDestinationsFavourites(), [getDestinationsFavourites()])
      // const storekeepersDataMemo = useMemo(() => getStorekeepersData(), [getStorekeepersData()])

      const rowMemo = useMemo(() => params.row.originalData, [params.row.originalData])

      const handlersMemo = useMemo(() => handlers, [])

      return params.row.originalData ? (
        <WarehouseDestinationAndTariffCell
          destinations={getDestinations()}
          boxesMy={rowMemo}
          destinationsFavourites={getDestinationsFavourites()}
          setDestinationsFavouritesItem={handlersMemo.onClickSetDestinationFavourite}
          storekeepers={getStorekeepersData()}
          setShowSelectionStorekeeperAndTariffModal={handlersMemo.setShowSelectionStorekeeperAndTariffModal}
          disabled={params.row.isDraft || params.row.status !== BoxStatus.IN_STOCK}
          onSelectDestination={handlersMemo.onSelectDestination}
          onClickSetTariff={handlersMemo.onClickSetTariff}
        />
      ) : (
        ''
      )
    },
    width: 215,
    filterable: false,
    sortable: false,
    columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_DESTINATION,
  },

  {
    field: 'amazonPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Total price'])}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        // isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    type: 'number',
    width: 110,
    sortable: false,
  },

  {
    field: 'deadline',
    headerName: 'Deadline',
    renderHeader: () => <MultilineTextHeaderCell text={'Deadline'} />,

    renderCell: params => (
      <MultilineTextCell
        withLineBreaks
        tooltipText={params.value ? timeToDeadlineInHoursAndMins({ date: params.value }) : ''}
        color={params.value && getDistanceBetweenDatesInSeconds(params.value) < 86400 ? '#FF1616' : null}
        text={params.value ? formatDate(params.value) : ''}
      />
    ),
    width: 120,
  },

  {
    field: 'fbaShipment',
    headerName: 'FBA Shipment / Shipping Label',
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={'FBA Shipment / Shipping Label'}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        // isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => {
      const rowMemo = useMemo(() => params.row.originalData, [params.row.originalData])

      const handlersMemo = useMemo(() => handlers, [])

      return params.row.originalData ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', padding: '10px 0' }}>
          <ChangeChipCell
            label={t(TranslationKey['Shipping label']) + ':'}
            disabled={params.row.originalData?.isDraft || params.row.status !== BoxStatus.IN_STOCK}
            row={rowMemo}
            value={params.row.shippingLabel}
            text={'Set Shipping Label'}
            onClickChip={handlersMemo.onClickShippingLabel}
            onDoubleClickChip={handlersMemo.onDoubleClickShippingLabel}
            onDeleteChip={handlersMemo.onDeleteShippingLabel}
          />

          <ChangeChipCell
            label={t(TranslationKey['FBA Shipment']) + ':'}
            disabled={params.row.originalData?.isDraft || params.row.status !== BoxStatus.IN_STOCK}
            row={rowMemo}
            value={params.row.fbaShipment}
            text={t(TranslationKey['FBA Shipment'])}
            onClickChip={handlersMemo.onClickFbaShipment}
            onDoubleClickChip={handlersMemo.onDoubleClickFbaShipment}
            onDeleteChip={handlersMemo.onDeleteFbaShipment}
          />
        </div>
      ) : (
        ''
      )
    },
    minWidth: 150,
    headerAlign: 'center',
    sortable: false,
  },

  {
    field: 'dimansions',
    headerName: t(TranslationKey.Dimensions),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Dimensions)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        component={
          <CustomSwitcher
            condition={getUnitsOption()}
            nameFirstArg={unitsOfChangeOptions.EU}
            nameSecondArg={unitsOfChangeOptions.US}
            firstArgValue={unitsOfChangeOptions.EU}
            secondArgValue={unitsOfChangeOptions.US}
            changeConditionHandler={handlers.onChangeUnitsOption}
          />
        }
        // isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => {
      const rowMemo = useMemo(() => params.row.originalData, [])

      return params.row.originalData ? (
        <ShortBoxDimensions
          box={rowMemo}
          volumeWeightCoefficient={params.row.volumeWeightCoefficient}
          unitsOption={getUnitsOption()}
        />
      ) : (
        ''
      )
    },
    width: 210,
    sortable: false,
  },

  {
    field: 'prepId',
    headerName: 'PREP ID',
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={'PREP ID'}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => {
      const onClickSavePrepId = useCallback(handlers.onClickSavePrepId, [])

      return (
        <ChangeInputCell
          maxLength={25}
          rowId={params.row.originalData._id}
          text={params.value}
          onClickSubmit={onClickSavePrepId}
        />
      )
    },
    width: 240,

    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Created)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <NormDateCell value={params.value} />,
    width: 120,
    // type: 'date',
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Updated)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <NormDateCell value={params.value} />,
    width: 120,
    // type: 'date',
    columnKey: columnnsKeys.shared.DATE,
  },
]

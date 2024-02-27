import { unitsOfChangeOptions } from '@constants/configs/sizes-settings'
import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { BoxStatus, boxStatusTranslateKey, colorByBoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ChangeChipCell,
  ChangeInputCell,
  DeadlineCell,
  FormedCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OrderCell,
  OrderManyItemsCell,
  OrdersIdsItemsCell,
  ShortBoxDimensionsCell,
  WarehouseDestinationAndTariffCell,
} from '@components/data-grid/data-grid-cells'
import { CustomSwitcher } from '@components/shared/custom-switcher'

import { findTariffInStorekeepersData } from '@utils/checks'
import { formatNormDateTime } from '@utils/date-time'
import { toFixedWithDollarSign, trimBarcode } from '@utils/text'
import { t } from '@utils/translations'

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
    field: 'shopId',
    headerName: t(TranslationKey.Shop),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Shop)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineTextCell twoLines text={params.value} />,

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
        customTextStyles={colorByBoxStatus(params.value)}
      />
    ),
    valueFormatter: params => t(boxStatusTranslateKey(params.value)),
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
          getColumnMenuSettings()?.skuByClient?.currentFilterData?.length ||
          getColumnMenuSettings()?.amazonTitle?.currentFilterData?.length
        }
      />
    ),

    width: 300,
    renderCell: params => {
      return params.row.originalData?.items.length > 1 ? (
        <OrderManyItemsCell
          box={params.row.originalData}
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
          box={params.row.originalData}
          product={params.row.originalData?.items[0]?.product}
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
    },
    valueGetter: params =>
      params.row.originalData.items
        ?.filter(item => Boolean(item.product.asin))
        .map(item => {
          return `Asin ${item.product.asin}`
        })
        .join('\n'),

    filterable: false,
    sortable: false,
    columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_PRODUCT,
  },

  {
    field: 'isFormed',
    headerName: t(TranslationKey.Formed),
    renderHeader: () => (
      <MultilineTextHeaderCell
        withIcon
        isFilterActive={getColumnMenuSettings()?.isFormedData?.isFormed !== null}
        text={t(TranslationKey.Formed)}
      />
    ),

    renderCell: params => (
      <FormedCell
        sub={params.row.originalData?.sub}
        isChecked={!!params.value}
        disable={params.row.originalData.isDraft || params.row.status !== BoxStatus.IN_STOCK}
        onChangeIsFormedInBox={() => handlers.onChangeIsFormedInBox(params.row.originalData)}
      />
    ),
    width: 120,
    sortable: false,
    filterable: false,
    valueFormatter: params => (params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)),
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
      return params.row.originalData ? (
        <WarehouseDestinationAndTariffCell
          destinations={getDestinations()}
          boxesMy={params.row.originalData}
          destinationsFavourites={getDestinationsFavourites()}
          setDestinationsFavouritesItem={handlers.onClickSetDestinationFavourite}
          storekeepers={getStorekeepersData()}
          setShowSelectionStorekeeperAndTariffModal={handlers.setShowSelectionStorekeeperAndTariffModal}
          disabled={params.row.isDraft || params.row.status !== BoxStatus.IN_STOCK}
          onSelectDestination={handlers.onSelectDestination}
          onClickSetTariff={handlers.onClickSetTariff}
        />
      ) : (
        ''
      )
    },
    width: 215,
    filterable: false,
    sortable: false,
    align: 'center',
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
    headerName: t(TranslationKey.Deadline),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Deadline)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.Deadline?.currentFilterData?.length}
      />
    ),
    renderCell: params => <DeadlineCell deadline={params.row.deadline} />,
    valueFormatter: params => (params.value ? formatNormDateTime(params.value) : ''),
    width: 100,
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
      return params.row.originalData ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', padding: '10px 0' }}>
          <ChangeChipCell
            label={t(TranslationKey['Shipping label']) + ':'}
            disabled={params.row.originalData?.isDraft || params.row.status !== BoxStatus.IN_STOCK}
            row={params.row.originalData}
            value={params.row.shippingLabel}
            text={'Set Shipping Label'}
            onClickChip={handlers.onClickShippingLabel}
            onDoubleClickChip={handlers.onDoubleClickShippingLabel}
            onDeleteChip={handlers.onDeleteShippingLabel}
          />

          <ChangeChipCell
            label={t(TranslationKey['FBA Shipment']) + ':'}
            disabled={params.row.originalData?.isDraft || params.row.status !== BoxStatus.IN_STOCK}
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
      )
    },
    valueGetter: params =>
      `Shipping Label:${params.row.shippingLabel ? trimBarcode(params.row.shippingLabel) : '-'}\n FBA Shipment:${
        params.row.fbaShipment || ''
      }`,
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
          <div>
            <CustomSwitcher
              condition={getUnitsOption()}
              switcherSettings={[
                { label: () => unitsOfChangeOptions.EU, value: unitsOfChangeOptions.EU },
                { label: () => unitsOfChangeOptions.US, value: unitsOfChangeOptions.US },
              ]}
              changeConditionHandler={handlers.onChangeUnitsOption}
            />
          </div>
        }
        // isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => {
      return params.row.originalData ? (
        <ShortBoxDimensionsCell
          box={params.row.originalData}
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
      return (
        <ChangeInputCell
          maxLength={25}
          rowId={params.row.originalData._id}
          text={params.value}
          onClickSubmit={handlers.onClickSavePrepId}
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
    valueFormatter: params => formatNormDateTime(params.value),
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
    valueFormatter: params => formatNormDateTime(params.value),
    renderCell: params => <NormDateCell value={params.value} />,
    width: 120,
    // type: 'date',
    columnKey: columnnsKeys.shared.DATE,
  },
]

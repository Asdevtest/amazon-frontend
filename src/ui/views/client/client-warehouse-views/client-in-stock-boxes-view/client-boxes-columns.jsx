import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
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
  RedFlagsCell,
  WarehouseDestinationAndTariffCell,
} from '@components/data-grid/data-grid-cells'
import { Dimensions } from '@components/shared/dimensions'
import { SizeSwitcher } from '@components/shared/size-switcher'

import { findTariffInStorekeepersData } from '@utils/checks'
import { formatNormDateTime } from '@utils/date-time'
import { toFixedWithDollarSign, trimBarcode } from '@utils/text'
import { t } from '@utils/translations'

export const clientBoxesViewColumns = (
  handlers,
  getStorekeepersData,
  getDestinations,
  getDestinationsFavourites,
  getUnitsOption,
) => {
  const columns = [
    {
      field: 'storekeeper',
      headerName: t(TranslationKey.Storekeeper),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Storekeeper)} />,

      renderCell: params => <MultilineTextCell text={params.value?.name} />,
      width: 100,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'shopId',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <MultilineTextCell twoLines text={params.row.items?.[0]?.product?.shop?.name} />,

      width: 100,
      disableCustomSort: true,
      columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_SHOPS,
      table: DataGridFilterTables.PRODUCTS,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

      width: 160,
      renderCell: params => (
        <MultilineTextCell
          leftAlign
          threeLines
          text={boxStatusTranslateKey(params.value)}
          customTextStyles={colorByBoxStatus(params.value)}
        />
      ),
      valueFormatter: params => boxStatusTranslateKey(params.value),

      transformValueMethod: boxStatusTranslateKey,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'humanFriendlyId',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

      renderCell: params => <MultilineTextCell text={params.value} />,
      type: 'number',
      width: 60,

      columnKey: columnnsKeys.client.WAREHOUSE_ID,
    },

    {
      field: 'id',
      headerName: t(TranslationKey['№ Order']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['№ Order'])} />,

      renderCell: params => <MultilineTextCell text={params.row.items?.[0]?.order?.id} />,
      width: 160,

      columnKey: columnnsKeys.shared.QUANTITY,
      table: DataGridFilterTables.ORDERS,
      disableCustomSort: true,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.Product),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

      width: 300,
      renderCell: params => {
        return params.row?.items.length > 1 ? (
          <OrderManyItemsCell
            box={params.row}
            error={
              !findTariffInStorekeepersData(
                getStorekeepersData(),
                params.row.storekeeper?._id,
                params.row.logicsTariff?._id,
              ) && t(TranslationKey['The tariff is invalid or has been removed!'])
            }
          />
        ) : (
          <OrderCell
            box={params.row}
            product={params.row.items[0]?.product}
            superbox={params.row.amount > 1 && params.row.amount}
            error={
              !findTariffInStorekeepersData(
                getStorekeepersData(),
                params.row.storekeeper?._id,
                params.row.logicsTariff?._id,
              ) && t(TranslationKey['The tariff is invalid or has been removed!'])
            }
          />
        )
      },
      valueGetter: params =>
        params.row.items
          ?.filter(item => Boolean(item.product.asin))
          .map(item => {
            return `Asin ${item.product.asin}`
          })
          .join('\n'),

      table: DataGridFilterTables.PRODUCTS,
      filterable: false,
      columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_PRODUCT,
    },

    {
      field: 'isFormed',
      headerName: t(TranslationKey.Formed),
      renderHeader: () => <MultilineTextHeaderCell withIcon text={t(TranslationKey.Formed)} />,

      renderCell: params => (
        <FormedCell
          sub={params.row.sub}
          isChecked={!!params.value}
          disable={params.row.isDraft || params.row.status !== BoxStatus.IN_STOCK}
          onChangeIsFormedInBox={() => handlers.onChangeIsFormedInBox(params.row)}
        />
      ),
      width: 120,

      filterable: false,
      valueFormatter: params => (params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)),
      columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_IS_FORMED,
      disableCustomSort: true,
    },

    {
      field: 'totalAmount',
      headerName: t(TranslationKey.Quantity),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,

      renderCell: params => <MultilineTextCell text={params.value} />,
      type: 'number',
      width: 95,

      columnKey: columnnsKeys.shared.QUANTITY,
      disableCustomSort: true,
    },

    {
      field: 'destination',
      headerName: t(TranslationKey['Destination and tariff']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Destination and tariff'])} />,

      renderCell: params => {
        return params.row ? (
          <WarehouseDestinationAndTariffCell
            destinations={getDestinations()}
            boxesMy={params.row}
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
      disableCustomSort: true,
      align: 'center',
      columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_DESTINATION,
    },

    {
      field: 'totalPrice',
      headerName: t(TranslationKey['Total price']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,

      renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
      type: 'number',
      width: 110,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'deadline',
      headerName: t(TranslationKey.Deadline),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
      renderCell: params => <DeadlineCell deadline={params.row.deadline} />,
      valueFormatter: params => (params.value ? formatNormDateTime(params.value) : ''),
      width: 100,
    },

    {
      field: 'fbaShipment',
      headerName: 'FBA Shipment / Shipping Label',
      renderHeader: () => <MultilineTextHeaderCell text={'FBA Shipment / Shipping Label'} />,

      renderCell: params => {
        return params.row ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', padding: '10px 0' }}>
            <ChangeChipCell
              label={t(TranslationKey['Shipping label']) + ':'}
              disabled={params.row.isDraft || params.row.status !== BoxStatus.IN_STOCK}
              row={params.row}
              value={params.row.shippingLabel}
              text={'Set Shipping Label'}
              onClickChip={handlers.onClickShippingLabel}
              onDoubleClickChip={handlers.onDoubleClickShippingLabel}
              onDeleteChip={handlers.onDeleteShippingLabel}
            />

            <ChangeChipCell
              label={t(TranslationKey['FBA Shipment']) + ':'}
              disabled={params.row.isDraft || params.row.status !== BoxStatus.IN_STOCK}
              row={params.row}
              value={params.row.fbaShipment}
              text={t(TranslationKey['FBA Shipment'])}
              onClickChip={handlers.onClickFbaShipment}
              onDoubleClickChip={handlers.onDoubleClickFbaShipment}
              onDeleteChip={handlers.onDeleteFbaShipment}
            />
          </div>
        ) : null
      },
      valueGetter: params =>
        `Shipping Label:${params.row.shippingLabel ? trimBarcode(params.row.shippingLabel) : '-'}\n FBA Shipment:${
          params.row.fbaShipment || ''
        }`,
      minWidth: 150,
      headerAlign: 'center',
      disableCustomSort: true,
    },

    {
      field: 'dimansions',
      headerName: t(TranslationKey.Dimensions),
      renderHeader: () => (
        <MultilineTextHeaderCell
          text={t(TranslationKey.Dimensions)}
          component={<SizeSwitcher condition={getUnitsOption()} onChangeCondition={handlers.onChangeUnitsOption} />}
        />
      ),
      renderCell: params => (
        <Dimensions isCell isTotalWeight data={params.row} transmittedSizeSetting={getUnitsOption()} />
      ),
      width: 210,
      disableCustomSort: true,
    },

    {
      field: 'prepId',
      headerName: 'PREP ID',
      renderHeader: () => <MultilineTextHeaderCell text={'PREP ID'} />,

      renderCell: params => (
        <ChangeInputCell
          isString
          maxLength={25}
          rowId={params.row._id}
          text={params.value}
          onClickSubmit={handlers.onClickSavePrepId}
        />
      ),
      width: 240,

      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'redFlags',
      headerName: t(TranslationKey['Red flags']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Red flags'])} />,
      renderCell: params => <RedFlagsCell flags={params.row?.items?.[0]?.product?.redFlags} />,
      valueGetter: ({ row }) => row?.items?.[0]?.product?.redFlags?.map(el => el?.title).join(', '),
      width: 130,
      columnKey: columnnsKeys.shared.RED_FLAGS,
      table: DataGridFilterTables.PRODUCTS,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      valueFormatter: params => formatNormDateTime(params.value),
      width: 120,
      // type: 'date',
      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      valueFormatter: params => formatNormDateTime(params.value),
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,
      // type: 'date',
      columnKey: columnnsKeys.shared.DATE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.BOXES
    }

    column.sortable = false
  }

  return columns
}

import { CiCircleCheck } from 'react-icons/ci'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { BoxStatus, boxStatusTranslateKey, colorByBoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  ChangeInputCell,
  DeadlineCell,
  DimensionsCell,
  DimensionsHeaderCell,
  FormedCell,
  ManyUserLinkCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductsCell,
  RedFlagsCell,
  StringListCell,
  WarehouseDestinationAndTariffCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { calcFinalWeightForBox } from '@utils/calculation'
import { formatNormDateTime } from '@utils/date-time'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

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

      renderCell: params => <Text isCell text={params?.row.storekeeper?.name} />,
      valueGetter: ({ row }) => row.storekeeper?.name,
      width: 100,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'shopId',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <Text isCell text={params.row.items?.[0]?.product?.shop?.name} />,

      valueGetter: ({ row }) => row.items?.[0]?.product?.shop?.name,

      width: 100,
      disableCustomSort: true,
      sortOptions: 'asc',
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      table: DataGridFilterTables.PRODUCTS,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

      width: 160,
      renderCell: params => (
        <Text isCell text={boxStatusTranslateKey(params.value)} color={colorByBoxStatus(params.value)} />
      ),
      valueFormatter: params => boxStatusTranslateKey(params.value),

      transformValueMethod: boxStatusTranslateKey,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'xid',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
      renderCell: params => <Text isCell text={params.value} />,
      type: 'number',
      width: 80,

      columnKey: columnnsKeys.client.WAREHOUSE_ID,
    },

    {
      field: 'orderXid',

      headerName: t(TranslationKey['№ Order']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['№ Order'])} />,

      renderCell: params => {
        return <StringListCell data={params.row.items?.map(item => item.order?.xid)} />
      },
      valueGetter: ({ row }) => row.items?.map(item => item.order?.xid),
      width: 160,

      columnKey: columnnsKeys.shared.NUMBER,
      table: DataGridFilterTables.ORDERS,
      disableCustomSort: true,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.Product),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
      renderCell: params => <ProductsCell box={params.row} storekeepers={getStorekeepersData()} />,
      valueGetter: params =>
        params.row.items
          ?.filter(item => Boolean(item.product.asin))
          .map(item => {
            return `Asin ${item.product.asin}`
          })
          .join('\n'),

      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue(),
      columnKey: columnnsKeys.shared.MULTIPLE,
      width: 210,
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

      renderCell: params => <Text isCell text={params.value} />,
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
      valueGetter: ({ row }) => {
        const storekeepers = getStorekeepersData()
        const destinations = getDestinations()

        const selectedDestination = destinations.find(el => el?._id === row?.destination?._id)?.name
        const currentStorekeeper = storekeepers?.find(el => el._id === row?.storekeeper?._id)
        const currentTariff = currentStorekeeper?.tariffLogistics?.find(el => el?._id === row?.logicsTariff?._id)

        return `Destination: ${selectedDestination || t(TranslationKey['Not chosen'])}, Tariff: ${
          currentTariff?.name || t(TranslationKey['Not chosen'])
        }`
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

      renderCell: params => <Text isCell text={toFixedWithDollarSign(params.value, 2)} />,
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
      field: 'clientComment',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

      renderCell: params => (
        <Text
          isCell
          editMode
          text={params.value}
          onClickSubmit={comment => handlers.onClickSaveClientComment(params.row._id, comment)}
        />
      ),

      width: 280,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'subUsers',
      headerName: t(TranslationKey['Access to product']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Access to product'])} />,
      renderCell: params => {
        const product = params.row?.items?.[0]?.product
        const subUsers = product?.subUsers || []
        const subUsersByShop = product?.subUsersByShop || []

        return <ManyUserLinkCell usersData={subUsers?.concat(subUsersByShop)} />
      },
      valueGetter: ({ row }) => {
        const product = row?.items?.[0]?.product
        const subUsers = product?.subUsers || []
        const subUsersByShop = product?.subUsersByShop || []

        return subUsers
          ?.concat(subUsersByShop)
          ?.map(user => user?.name)
          .join(', ')
      },
      width: 187,
      table: DataGridFilterTables.PRODUCTS,
      filterable: false,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'fbaShipment',
      headerName: 'FBA Shipment / Shipping Label',
      renderHeader: () => <MultilineTextHeaderCell text={'FBA Shipment / Shipping Label'} />,
      renderCell: params => {
        const disabled = params.row.isDraft || params.row.status !== BoxStatus.IN_STOCK
        const firstIcon = params.row.shippingLabel ? <CiCircleCheck size={16} /> : null
        const secondIcon = params.row.fbaShipment ? <CiCircleCheck size={16} /> : null

        return (
          <ActionButtonsCell
            showFirst
            showSecond
            firstGhost={!params.row.shippingLabel}
            secondGhost={!params.row.fbaShipment}
            firstDropdown={!!params.row.shippingLabel}
            secondDropdown={!!params.row.fbaShipment}
            firstIcon={firstIcon}
            firstContent="Shipping label"
            firstDisabled={disabled}
            secondIcon={secondIcon}
            secondContent="FBA Shipment"
            secondDisabled={disabled}
            onClickFirst={() => handlers.onClickShippingLabel(params.row)}
            onClickSecond={() => handlers.onClickFbaShipment(params.row)}
            onClickRemoveFirst={() => handlers.onDeleteShippingLabel(params.row)}
            onClickRemoveSecond={() => handlers.onDeleteFbaShipment(params.row)}
          />
        )
      },
      valueGetter: params =>
        `Shipping Label: ${
          params.row.shippingLabel ? getAmazonImageUrl(params.row.shippingLabel, true) : '-'
        } / FBA Shipment: ${params.row.fbaShipment || ''}`,
      width: 180,
      disableCustomSort: true,
    },

    {
      field: 'dimensions',
      headerName: t(TranslationKey.Dimensions),
      renderHeader: params => (
        <DimensionsHeaderCell
          data={params.row}
          transmittedSizeSetting={getUnitsOption()}
          onChangeUnitsOption={handlers.onChangeUnitsOption}
        />
      ),
      renderCell: params => (
        <DimensionsCell isCell isTotalWeight data={params.row} transmittedSizeSetting={getUnitsOption()} />
      ),
      valueGetter: ({ row }) => {
        const boxFinalWeight = toFixed(calcFinalWeightForBox(row, row.volumeWeightCoefficient), 2)
        return `L:${row?.lengthCmWarehouse}, W:${row?.widthCmWarehouse}, H:${row?.heightCmWarehouse}, FW:${boxFinalWeight}`
      },
      minWidth: 230,
      disableCustomSort: true,
      filterable: false,
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
      width: 115,
      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      valueFormatter: params => formatNormDateTime(params.value),
      renderCell: params => <NormDateCell value={params.value} />,
      width: 115,
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

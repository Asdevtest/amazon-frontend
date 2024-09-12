import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import {
  OrderStatus,
  OrderStatusByCode,
  OrderStatusByKey,
  OrderStatusTranslate,
  orderColorByStatus,
} from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  DeadlineCell,
  IconHeaderCell,
  LinkCell,
  ManyUserLinkCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OpenInNewTabCell,
  PriorityAndChinaDeliverCell,
  ProductCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { checkIsHasHttp } from '@utils/checks'
import { formatDate, formatNormDateTime } from '@utils/date-time'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getNewTariffTextForBoxOrOrder, toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { IOrder } from '@typings/models/orders/order'
import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'
import {
  productionTimeColumnMenuItems,
  productionTimeColumnMenuValue,
} from '@config/data-grid-column-menu/production-time'

interface IRowHandlers {
  onClickReorder: (item: IOrder, isPending: boolean) => void
  onClickOpenNewTab: (id: string) => void
  onClickWarehouseOrderButton: (guid: string) => void
}

export const clientOrdersViewColumns = (rowHandlers: IRowHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'link',
      renderHeader: () => null,
      renderCell: params => (
        <OpenInNewTabCell onClickOpenInNewTab={() => rowHandlers.onClickOpenNewTab(params.row._id)} />
      ),
      width: 50,
      filterable: false,

      disableColumnMenu: true,
    },

    {
      field: 'id',
      headerName: t(TranslationKey.ID) + ' / item',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID) + ' / item'} />,
      valueGetter: params => params.row.idItem,
      renderCell: params => <Text isCell text={`${params.row.id || '-'} / ${params.row.item || '-'}`} />,
      width: 100,

      columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_ORDER_IDS_ITEMS,
    },

    {
      field: 'shopId',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
      renderCell: params => <Text isCell text={params.row?.product?.shop?.name} />,
      width: 100,

      columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_SHOPS,
      table: DataGridFilterTables.PRODUCTS,
      disableCustomSort: true,
    },

    {
      field: 'priority',
      headerName: t(TranslationKey.Priority),
      renderHeader: () => <IconHeaderCell url={'/assets/icons/bookmark.svg'} />,
      renderCell: params => (
        <PriorityAndChinaDeliverCell
          priority={params.row.priority}
          chinaDelivery={params.row.expressChinaDelivery}
          status={params.row.status}
        />
      ),
      width: 75,
      //

      columnKey: columnnsKeys.client.MY_ORDERS_PRIORITY,
    },

    {
      field: 'asin',
      headerName: 'ASIN',
      renderHeader: () => <MultilineTextHeaderCell text={'ASIN'} />,
      renderCell: params => {
        const product = params.row.product

        return (
          <ProductCell
            image={product?.images?.[0]}
            title={product?.amazonTitle}
            asin={product?.asin}
            sku={product?.skuByClient}
          />
        )
      },

      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue(),
      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 170,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: params => (
        <Text
          isCell
          text={OrderStatusTranslate(OrderStatusByCode[params.row.status as keyof typeof OrderStatusByCode])}
          color={orderColorByStatus(OrderStatusByCode[params.row.status as keyof typeof OrderStatusByCode])}
        />
      ),
      width: 160,
      disableCustomSort: true,
      filterable: false,
      columnKey: columnnsKeys.client.ORDERS_STATUS,
    },

    {
      field: 'action',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: params => {
        const firstButtonCondition =
          Number(params.row.status) <=
          Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT as keyof typeof OrderStatusByKey])
        const firstButtonText = firstButtonCondition ? t(TranslationKey['To order']) : t(TranslationKey['Repeat order'])

        return (
          <ActionButtonsCell
            showFirst
            showSecond
            firstContent={firstButtonText}
            secondContent={t(TranslationKey.Stocks)}
            onClickFirst={() => rowHandlers.onClickReorder(params.row as IOrder, firstButtonCondition)}
            onClickSecond={() => rowHandlers.onClickWarehouseOrderButton(params.row.product._id)}
          />
        )
      },
      width: 150,
      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'barCode',
      headerName: t(TranslationKey.BarCode),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,
      width: 100,
      renderCell: params => <LinkCell value={params.row?.product?.barCode} />,
      // @ts-ignore
      valueFormatter: ({ row }) =>
        checkIsHasHttp(row?.product?.barCode) ? row?.product?.barCode : getAmazonImageUrl(row?.product?.barCode, true),
      align: 'center',
      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'amount',
      headerName: t(TranslationKey.Quantity),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 100,
      type: 'number',

      columnKey: columnnsKeys.shared.QUANTITY,
      disableCustomSort: true,
    },

    {
      field: 'subUsers',
      headerName: t(TranslationKey['Access to product']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Access to product'])} />,
      renderCell: params => {
        const subUsers = params.row?.product?.subUsers || []
        const subUsersByShop = params.row?.product?.subUsersByShop || []

        return <ManyUserLinkCell usersData={subUsers?.concat(subUsersByShop)} />
      },
      valueGetter: ({ row }) => {
        const subUsers = row?.product?.subUsers || []
        const subUsersByShop = row?.product?.subUsersByShop || []

        return subUsers?.concat(subUsersByShop).join(', ')
      },
      width: 187,
      table: DataGridFilterTables.PRODUCTS,
      filterable: false,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'storekeeper',
      headerName: t(TranslationKey['Int warehouse']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,
      renderCell: params => (
        <UserLinkCell blackText name={params.row.storekeeper?.name} userId={params.row.storekeeper?._id} />
      ),
      width: 160,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'logicsTariff',
      headerName: t(TranslationKey.Tariff),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,
      renderCell: params => <Text isCell text={getNewTariffTextForBoxOrOrder(params.row)} />,
      width: 200,
      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'destination',
      headerName: t(TranslationKey['Where to']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Where to'])} />,
      renderCell: params => <Text isCell text={params.row.destination?.name} />,
      valueGetter: params => params.row.destination?.name,
      width: 140,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'minProductionTerm',
      headerName: t(TranslationKey['Production time']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,
      renderCell: params => {
        const supplier = params.row.orderSupplier

        return (
          <Text
            isCell
            text={
              supplier ? `${supplier?.minProductionTerm} - ${supplier?.maxProductionTerm}` : t(TranslationKey.Missing)
            }
          />
        )
      },
      valueGetter: params => {
        const supplier = params.row?.orderSupplier

        return `${supplier?.minProductionTerm} - ${supplier?.maxProductionTerm}`
      },

      fields: productionTimeColumnMenuItems,
      columnMenuConfig: productionTimeColumnMenuValue,
      columnKey: columnnsKeys.shared.MULTIPLE,

      disableCustomSort: true,
      width: 120,
    },

    {
      field: 'deadline',
      headerName: t(TranslationKey.Deadline),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
      renderCell: params =>
        params.row.status < 20 ? <DeadlineCell deadline={params.row.deadline} /> : <Text isCell text={'-'} />,
      width: 100,
      valueGetter: params => (params.value ? formatDate(params.value) : ''),
      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'needsResearch',
      headerName: t(TranslationKey['Re-search supplier']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Re-search supplier'])} />,
      renderCell: params => <Text isCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
      width: 140,

      columnKey: columnnsKeys.freelancer.FREELANCE_REQUESTS_CONFIRMATION,
    },

    {
      field: 'totalPrice',
      headerName: t(TranslationKey['Total price']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,
      renderCell: params => <Text isCell text={toFixedWithDollarSign(params.value, 2)} />,
      valueFormatter: params => toFixedWithDollarSign(params.value, 2),
      width: 140,
      type: 'number',

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'weight',
      headerName: t(TranslationKey['Total weight']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total weight'])} />,
      renderCell: params => <Text isCell text={toFixedWithKg(params.row.product?.weight)} />,
      valueGetter: params => toFixedWithKg(params.row.product?.weight, 2),
      width: 110,
      type: 'number',
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'buyerComment',
      headerName: t(TranslationKey['Buyer comment']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 200,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'clientComment',
      headerName: t(TranslationKey['Client comment']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 200,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.STRING,
    },
    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      valueFormatter: params => formatNormDateTime(params.value),
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      valueFormatter: params => formatNormDateTime(params.value),
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.ORDERS
    }
    column.sortable = false
  }

  return columns
}

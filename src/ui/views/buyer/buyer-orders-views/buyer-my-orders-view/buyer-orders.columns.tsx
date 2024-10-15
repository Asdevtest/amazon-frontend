/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from '@mui/material'

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
  DeadlineCell,
  IconHeaderCell,
  LinkCell,
  ManyUserLinkCell,
  MultilineTextHeaderCell,
  NormDateCell,
  PaymentMethodsCell,
  PriorityAndChinaDeliverCell,
  ProductCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { convertDaysToSeconds, formatDate, getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { IOrder } from '@typings/models/orders/order'
import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'
import {
  productionTimeColumnMenuItems,
  productionTimeColumnMenuValue,
} from '@config/data-grid-column-menu/production-time'
import { payColumnMenuItems, payColumnMenuValue } from '@config/data-grid-column-menu/to-pay-column'

interface buyerOrdersColumnsParams {
  rowHandlers: {
    onClickPaymentMethodsCell: (row: IOrder) => void
  }
  isShowPartialPayment: boolean
  isDisableCustomSort: boolean
}

export const buyerOrdersColumns = ({
  rowHandlers,
  isShowPartialPayment,
  isDisableCustomSort,
}: buyerOrdersColumnsParams) => {
  const columns: IGridColumn[] = [
    {
      field: 'xid',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
      renderCell: params => <Text isCell text={params.value} />,

      sortable: true,
      width: 100,

      columnKey: columnnsKeys.shared.NUMBER,
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
      sortable: false,
      width: 60,

      columnKey: columnnsKeys.buyer.ORDERS_PRIORITY,
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
      valueGetter: params => `ASIN: ${params.row.product.asin ?? ''}, SKU: ${params.row.product.skuByClient ?? ''}`,

      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue(),
      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 170,
    },

    {
      field: 'paymentDetailsAttached',
      headerName: t(TranslationKey['Payment documents']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Payment documents'])} />,
      renderCell: params => <Checkbox sx={{ pointerEvents: 'none' }} checked={params.row.paymentDetailsAttached} />,
      valueGetter: params => params.row.paymentDetailsAttached,
      width: 120,
      align: 'center',

      columnKey: columnnsKeys.freelancer.FREELANCE_REQUESTS_CONFIRMATION,
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
      width: 140,
      sortable: false,
      disableCustomSort: isDisableCustomSort,
      columnKey: columnnsKeys.client.ORDERS_STATUS,
    },

    {
      field: 'amount',
      headerName: t(TranslationKey.Quantity),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 130,
      type: 'number',
      sortable: false,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'totalPrice',
      headerName: t(TranslationKey.Price),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Price)} />,
      renderCell: params => <Text isCell text={toFixedWithDollarSign(params.row.totalPrice, 2)} />,
      valueGetter: params => toFixedWithDollarSign(params.row.totalPrice, 2),
      width: 90,
      type: 'number',

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'paymentMethod',
      headerName: t(TranslationKey['Payment methods']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Payment methods'])} />,
      renderCell: params => (
        <PaymentMethodsCell
          paymentMethods={params.row.payments?.map((payment: any) => payment.paymentMethod)}
          onClickCell={() => rowHandlers.onClickPaymentMethodsCell(params.row as IOrder)}
        />
      ),
      valueGetter: params => params.row.payments.map((payment: any) => payment?.paymentMethod?.title).join(', '),
      width: 180,
      sortable: false,

      disableCustomSort: true,
      columnKey: columnnsKeys.shared.PAYMENTS,
    },

    {
      field: 'priceInYuan',
      headerName: t(TranslationKey['To pay']) + ', Ұ',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['To pay']) + ', Ұ'} />,

      renderCell: params => (
        <Text
          isCell
          text={
            toFixed(params.row.partialPayment ? params.row.partialPaymentAmountRmb : params.row.priceInYuan, 2) || '0'
          }
        />
      ),
      valueGetter: params =>
        toFixed(params.row.partialPayment ? params.row.partialPaymentAmountRmb : params.row.priceInYuan, 2) || '0',
      type: 'number',

      fields: payColumnMenuItems,
      columnMenuConfig: payColumnMenuValue,
      columnKey: columnnsKeys.shared.MULTIPLE,
      width: 115,
    },

    {
      field: 'barCode',
      headerName: t(TranslationKey.BarCode),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,
      renderCell: params => <LinkCell value={params.row.product.barCode} />,
      width: 70,
      sortable: false,
      filterable: false,
      disableCustomSort: true,
      align: 'center',
    },

    {
      field: 'storekeeper',
      headerName: t(TranslationKey['Int warehouse']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,
      renderCell: params => (
        <UserCell
          name={params.row.storekeeper?.name}
          id={params.row.storekeeper?._id}
          email={params.row.storekeeper?.email}
        />
      ),
      width: 120,
      sortable: false,

      columnKey: columnnsKeys.shared.OBJECT,
      disableCustomSort: true,
    },

    {
      field: 'minProductionTerm',
      headerName: t(TranslationKey['Production time, days']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,

      renderCell: params => {
        const currentSupplier = params.row.orderSupplier

        return <Text isCell text={`${currentSupplier?.minProductionTerm} - ${currentSupplier?.maxProductionTerm}`} />
      },
      valueGetter: params => {
        const currentSupplier = params.row.orderSupplier

        return `${currentSupplier?.minProductionTerm} - ${currentSupplier?.maxProductionTerm}`
      },

      fields: productionTimeColumnMenuItems,
      columnMenuConfig: productionTimeColumnMenuValue,
      columnKey: columnnsKeys.shared.MULTIPLE,

      width: 120,
      disableCustomSort: true,
    },

    {
      field: 'deadline',
      headerName: t(TranslationKey.Deadline),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
      renderCell: params =>
        params.row.status < 20 ? <DeadlineCell deadline={params.row.deadline} /> : <Text isCell text={'-'} />,
      valueGetter: params => (params.row.deadline ? formatDate(params.row.deadline) : ''),
      width: 100,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'paymentDateToSupplier',
      headerName: t(TranslationKey['Payment date']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Payment date'])} />,
      renderCell: params => (
        <Text
          isCell
          color={
            Math.abs(getDistanceBetweenDatesInSeconds(params.row.paymentDateToSupplier)) >
              convertDaysToSeconds(params.row.orderSupplier?.productionTerm) &&
            params.row.status === OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER as keyof typeof OrderStatusByKey] &&
            !!params.row.orderSupplier?.minProductionTerm
              ? '#FF1616'
              : undefined
          }
          text={params.row.paymentDateToSupplier ? formatDate(params.row.paymentDateToSupplier) : ''}
        />
      ),
      valueGetter: params => formatDate(params.row.paymentDateToSupplier) ?? '',
      width: 115,

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
      field: 'client',
      headerName: t(TranslationKey.Client),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
      renderCell: params => (
        <UserCell
          name={params.row.product.client?.name}
          id={params.row.product.client?._id}
          email={params.row.product.client?.email}
        />
      ),

      width: 180,
      sortable: false,
      table: DataGridFilterTables.PRODUCTS,
      columnKey: columnnsKeys.shared.OBJECT,
      disableCustomSort: true,
    },

    {
      field: 'destination',
      headerName: t(TranslationKey.Destination),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
      renderCell: params => <Text isCell text={params.row.destination?.name} />,
      valueGetter: params => params.row.destination?.name,
      width: 130,
      sortable: false,

      columnKey: columnnsKeys.shared.OBJECT,
      disableCustomSort: true,
    },

    {
      field: 'clientComment',
      headerName: t(TranslationKey['Client comment']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 400,
      sortable: false,

      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'buyerComment',
      headerName: t(TranslationKey['Buyer comment']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 400,
      sortable: false,

      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'subUsers',
      headerName: t(TranslationKey['Access to product']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Access to product'])} />,
      renderCell: ({ row }) => {
        const subUsers = row?.product?.subUsers || []
        const subUsersByShop = row?.product?.subUsersByShop || []

        return <ManyUserLinkCell usersData={subUsers?.concat(subUsersByShop)} />
      },
      valueGetter: ({ row }) => {
        const subUsers = row?.product?.subUsers || []
        const subUsersByShop = row?.product?.subUsersByShop || []

        return subUsers?.concat(subUsersByShop).join(', ')
      },
      width: 187,
      filterable: false,
      disableCustomSort: true,
      table: DataGridFilterTables.PRODUCTS,
      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 100,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 100,

      columnKey: columnnsKeys.shared.DATE,
    },
  ]

  if (isShowPartialPayment) {
    columns.splice(9, 0, {
      field: 'partiallyPaid',
      headerName: t(TranslationKey['Paid for']) + ', Ұ',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Paid for']) + ', Ұ'} />,
      renderCell: params => <Text isCell text={toFixed(params.row.partiallyPaid, 2) || '0'} />,
      width: 110,
      type: 'number',

      columnKey: columnnsKeys.shared.QUANTITY,
    })
  }

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.ORDERS
    }

    column.sortable = false
  }

  return columns
}

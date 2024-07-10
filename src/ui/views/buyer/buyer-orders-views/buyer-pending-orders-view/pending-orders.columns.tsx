import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { OrderStatusByCode, OrderStatusTranslate, orderColorByStatus } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  DeadlineCell,
  DownloadAndCopyBtnsCell,
  IconHeaderCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  PriorityAndChinaDeliverCell,
  ProductAsinCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'

import { formatDate } from '@utils/date-time'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import {
  productColumnMenuItems,
  productColumnMenuValue,
  productionTermColumnMenuItems,
  productionTermColumnMenuValue,
} from './column.config'

export const pendingOrdersColumns = () => {
  const columns: IGridColumn[] = [
    {
      field: 'id',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
      renderCell: params => <MultilineTextCell text={params.value} />,
      sortable: true,

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'priority',
      headerName: t(TranslationKey.Priority),
      renderHeader: () => <IconHeaderCell url={'/assets/icons/bookmark.svg'} />,
      width: 90,
      renderCell: params => (
        <PriorityAndChinaDeliverCell
          priority={params.value}
          chinaDelivery={params.row.expressChinaDelivery}
          status={params.row.status}
        />
      ),

      disableCustomSort: true,

      columnKey: columnnsKeys.buyer.ORDERS_PRIORITY,
    },

    {
      field: 'asin',
      headerName: 'ASIN',
      renderHeader: () => <MultilineTextHeaderCell text={'ASIN'} />,

      width: 280,
      renderCell: params => {
        const product = params.row.product

        return (
          <ProductAsinCell
            image={product?.images?.[0]}
            amazonTitle={product?.amazonTitle}
            asin={product?.asin}
            skuByClient={product?.skuByClient}
          />
        )
      },

      fields: productColumnMenuItems,
      columnMenuConfig: productColumnMenuValue,

      disableCustomSort: true,

      columnKey: columnnsKeys.shared.MULTIPLE,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

      width: 130,
      renderCell: ({ value }) => {
        return (
          <MultilineTextCell
            text={OrderStatusTranslate(OrderStatusByCode[value as keyof typeof OrderStatusByCode])}
            color={orderColorByStatus(OrderStatusByCode[value as keyof typeof OrderStatusByCode])}
          />
        )
      },

      transformValueMethod: value =>
        OrderStatusTranslate(OrderStatusByCode[Number(value) as keyof typeof OrderStatusByCode]),
      columnKey: columnnsKeys.shared.STRING_VALUE,

      disableCustomSort: true,
    },

    {
      field: 'amount',
      headerName: t(TranslationKey.Quantity),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
      renderCell: params => <MultilineTextCell text={params.value} />,

      width: 90,
      columnKey: columnnsKeys.shared.NUMBER,
      disableCustomSort: true,
    },

    {
      field: 'totalPrice',
      headerName: t(TranslationKey.Price),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Price)} />,

      renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.row.totalPrice, 2)} />,

      width: 90,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'barCode',
      headerName: t(TranslationKey.BarCode),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

      width: 140,
      renderCell: params => (
        <DownloadAndCopyBtnsCell
          value={params.row.product.barCode}
          isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
        />
      ),
      disableCustomSort: true,
    },

    {
      field: 'storekeeper',
      headerName: t(TranslationKey['Int warehouse']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,

      renderCell: params => (
        <UserMiniCell userName={params.row.storekeeper?.name} userId={params.row.storekeeper?._id} />
      ),

      width: 120,
      disableCustomSort: true,
      hideEmptyObject: true,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'minProductionTerm',
      headerName: t(TranslationKey['Production time']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,

      renderCell: params => {
        const currentSupplier = params.row?.orderSupplier

        return (
          <MultilineTextCell text={`${currentSupplier?.minProductionTerm} - ${currentSupplier?.maxProductionTerm}`} />
        )
      },
      valueGetter: params => {
        const currentSupplier = params.row?.orderSupplier

        return `${currentSupplier?.minProductionTerm} - ${currentSupplier?.maxProductionTerm}`
      },

      fields: productionTermColumnMenuItems,
      columnMenuConfig: productionTermColumnMenuValue,

      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 120,
    },

    {
      field: 'deadline',
      headerName: t(TranslationKey.Deadline),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
      renderCell: params =>
        params.row.status < 20 ? <DeadlineCell deadline={params.row.deadline} /> : <MultilineTextCell text={'-'} />,
      columnKey: columnnsKeys.shared.DATE,
      width: 100,
    },

    {
      field: 'paymentDateToSupplier',
      headerName: 'Payment date',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Payment date'])} />,

      renderCell: params => (
        <MultilineTextCell text={formatDate(params.row.paymentDateToSupplier) || t(TranslationKey.Missing)} />
      ),
      width: 115,
    },

    {
      field: 'needsResearch',
      headerName: t(TranslationKey['Re-search supplier']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Re-search supplier'])} />,

      width: 100,
      renderCell: params => <MultilineTextCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
    },

    {
      field: 'client',
      headerName: t(TranslationKey.Client),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,

      renderCell: params => (
        <UserMiniCell userName={params.row.product.client?.name} userId={params.row.product.client?._id} />
      ),
      width: 130,
      table: DataGridFilterTables.PRODUCTS,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      hideEmptyObject: true,
      disableCustomSort: true,
    },

    {
      field: 'warehouses',
      headerName: t(TranslationKey.Destination),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

      renderCell: params => <MultilineTextCell text={params.row.destination?.name} />,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      width: 130,
      disableCustomSort: true,
    },

    {
      field: 'clientComment',
      headerName: t(TranslationKey['Client comment']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,

      renderCell: params => <MultilineTextCell threeLines maxLength={140} text={params.value} />,
      width: 200,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'buyerComment',
      headerName: t(TranslationKey['Buyer comment']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,

      renderCell: params => <MultilineTextCell threeLines maxLength={140} text={params.value} />,
      width: 200,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      columnKey: columnnsKeys.shared.DATE,
      width: 100,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      columnKey: columnnsKeys.shared.DATE,
      width: 100,
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

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { OrderStatusByCode, OrderStatusTranslate, orderColorByStatus } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  DownloadAndCopyBtnsCell,
  IconHeaderCell,
  MultilineTextHeaderCell,
  NormDateCell,
  PriorityAndChinaDeliverCell,
  ProductAsinCell,
  TextCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

export const adminOrdersViewColumns = () => {
  const columns: IGridColumn[] = [
    {
      field: 'id',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
      renderCell: params => <TextCell text={params.value} />,
      columnKey: columnnsKeys.shared.NUMBER,
      width: 100,
    },

    {
      field: 'priorityAndChinaDelivery',
      headerName: 'priorityAndChinaDelivery',
      renderHeader: () => <IconHeaderCell url={'/assets/icons/bookmark.svg'} />,
      width: 60,
      renderCell: params => (
        <PriorityAndChinaDeliverCell
          priority={params.row.priority}
          chinaDelivery={params.row.expressChinaDelivery}
          status={params.row.status}
        />
      ),
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.Product),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

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

      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue(),
      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 260,
      minWidth: 100,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

      width: 220,
      renderCell: params => {
        const orderByCode = OrderStatusByCode[params.value as keyof typeof OrderStatusByCode]

        return <TextCell text={OrderStatusTranslate(orderByCode)} color={orderColorByStatus(orderByCode)} />
      },

      transformValueMethod: status =>
        OrderStatusTranslate(OrderStatusByCode[status as keyof typeof OrderStatusByCode]) as string,

      columnKey: columnnsKeys.shared.STRING_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'barCode',
      headerName: t(TranslationKey.BarCode),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

      width: 210,
      renderCell: params => <DownloadAndCopyBtnsCell value={params.row.product.barCode} />,

      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'amount',
      headerName: t(TranslationKey.Quantity),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
      renderCell: params => <TextCell text={params.value} />,
      type: 'number',
      width: 150,

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'client',
      headerName: t(TranslationKey.Client),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,

      renderCell: params => (
        <UserLinkCell blackText name={params.row.product.client?.name} userId={params.row.product.client?._id} />
      ),
      width: 200,
      disableCustomSort: true,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'storekeeper',
      headerName: t(TranslationKey.Storekeeper),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Storekeeper)} />,

      renderCell: params => <UserLinkCell blackText name={params.value?.name} userId={params.value?._id} />,
      width: 200,
      disableCustomSort: true,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'buyer',
      headerName: t(TranslationKey.Buyer),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Buyer)} />,

      width: 200,
      renderCell: params => <UserLinkCell blackText name={params.value?.name} userId={params.value?._id} />,
      disableCustomSort: true,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'partialPaymentAmountRmb',
      headerName: t(TranslationKey['Pay more']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Pay more'])} />,

      width: 140,
      renderCell: params => <TextCell text={toFixedWithDollarSign(params.value, 2)} />,
      disableCustomSort: true,

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'totalPrice',
      headerName: t(TranslationKey['Total price']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,

      width: 150,
      renderCell: params => <TextCell text={toFixedWithDollarSign(params.value, 2)} />,

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'weight',
      headerName: t(TranslationKey['Gross weight']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Gross weight'])} />,

      width: 160,
      renderCell: params => <TextCell copyable={false} text={toFixedWithKg(params.value)} />,
      table: DataGridFilterTables.PRODUCTS,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 150,

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

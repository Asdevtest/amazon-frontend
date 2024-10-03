import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  DeadlineCell,
  IconHeaderCell,
  LinkCell,
  MultilineTextHeaderCell,
  NormDateCell,
  PriorityAndChinaDeliverCell,
  ProductCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { checkIsHasHttp } from '@utils/checks'
import { formatDate } from '@utils/date-time'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { OrderPriority } from '@typings/enums/order/order-priority'
import { IOrder } from '@typings/models/orders/order'
import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

import {
  productionTermColumnMenuItems,
  productionTermColumnMenuValue,
} from '../buyer-pending-orders-view/column.config'

interface IHandlers {
  onClickTableRowBtn: (order: IOrder) => void
}

export const buyerFreeOrdersViewColumns = (handlers: IHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'id',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
      renderCell: params => <Text isCell text={params.value} />,

      columnKey: columnnsKeys.shared.NUMBER,
      width: 65,
    },

    {
      field: 'priorityAndChinaDelivery',
      headerName: t(TranslationKey.Priority),
      renderHeader: () => <IconHeaderCell url={'/assets/icons/bookmark.svg'} />,
      renderCell: params => (
        <PriorityAndChinaDeliverCell
          priority={params.row.priority}
          chinaDelivery={params.row.expressChinaDelivery}
          status={params.row.status}
        />
      ),

      valueGetter: params => {
        const priority = params.row.priority

        const isUrgent = Number(priority) === OrderPriority.URGENT_PRIORITY

        return isUrgent ? 'Urgent' : 'Normal'
      },

      disableCustomSort: true,
      filterable: false,
      width: 80,
    },

    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
      renderCell: params => (
        <ActionButtonsCell
          showFirst
          firstContent={t(TranslationKey['Get to work'])}
          onClickFirst={() => handlers.onClickTableRowBtn(params.row as IOrder)}
        />
      ),

      disableCustomSort: true,
      filterable: false,
      width: 150,
      disableExport: true,
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
      valueGetter: params => params.row.product?.asin,

      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue(),
      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 170,
    },

    {
      field: 'amount',
      headerName: t(TranslationKey.Quantity),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
      renderCell: params => <Text isCell text={params.value} />,

      columnKey: columnnsKeys.shared.NUMBER,
      width: 100,
    },

    {
      field: 'totalPrice',
      headerName: t(TranslationKey.Price),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Price)} />,
      renderCell: params => <Text isCell text={toFixedWithDollarSign(params.value, 2)} />,

      columnKey: columnnsKeys.shared.NUMBER,
      width: 110,
    },

    {
      field: 'barCode',
      headerName: t(TranslationKey.BarCode),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,
      renderCell: params => <LinkCell value={params.row.product?.barCode} />,

      valueGetter: params => {
        const barCode = params?.row?.product?.barCode

        return checkIsHasHttp(barCode) ? barCode : getAmazonImageUrl(barCode, true)
      },

      disableCustomSort: true,
      filterable: false,
      width: 70,
      align: 'center',
    },

    {
      field: 'minProductionTerm',
      headerName: t(TranslationKey['Production time, days']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,
      renderCell: params => {
        const currentSupplier = params.row?.orderSupplier

        return <Text isCell text={`${currentSupplier?.minProductionTerm} - ${currentSupplier?.maxProductionTerm}`} />
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
      renderCell: params => <DeadlineCell deadline={params.row.deadline} />,

      valueGetter: params => formatDate(params.row.deadline) || '',

      columnKey: columnnsKeys.shared.DATE,
      width: 100,
    },

    {
      field: 'needsResearch',
      headerName: t(TranslationKey['Re-search supplier']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Re-search supplier'])} />,
      renderCell: params => <Text isCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,

      disableCustomSort: true,
      filterable: false,
      width: 140,
    },

    {
      field: 'storekeeper',
      headerName: t(TranslationKey['Int warehouse']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,
      renderCell: params => <UserCell name={params.row.storekeeper?.name} id={params.row.storekeeper?._id} />,
      valueGetter: params => params.row.storekeeper?.name,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      width: 155,
    },

    {
      field: 'client',
      headerName: t(TranslationKey.Client),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
      renderCell: params => <UserCell name={params.row.product.client?.name} id={params.row.product.client?._id} />,

      valueGetter: params => params.row.product?.client?.name,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      table: DataGridFilterTables.PRODUCTS,
      width: 120,
    },

    {
      field: 'destination',
      headerName: t(TranslationKey.Destination),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
      renderCell: params => <Text isCell text={params.row.destination?.name} />,

      valueGetter: params => params.row.destination?.name,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      width: 160,
    },

    {
      field: 'clientComment',
      headerName: t(TranslationKey['Client comment']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,
      renderCell: params => <Text isCell text={params.value} />,

      columnKey: columnnsKeys.shared.STRING_VALUE,
      width: 400,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: params => <NormDateCell value={params.value} />,

      columnKey: columnnsKeys.shared.DATE,
      width: 115,
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

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
  DownloadAndCopyBtnsCell,
  IconHeaderCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OpenInNewTabCell,
  OrderCell,
  PriorityAndChinaDeliverCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { checkIsHasHttp } from '@utils/checks'
import { formatDate, formatNormDateTime } from '@utils/date-time'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

export const clientOrdersViewColumns = rowHandlers => {
  const columns = [
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
      renderCell: params => <MultilineTextCell text={`${params.row.id || '-'} / ${params.row.item || '-'}`} />,
      width: 100,

      columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_ORDER_IDS_ITEMS,
    },

    {
      field: 'shopId',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
      renderCell: params => <MultilineTextCell twoLines text={params.row?.product?.shop?.name} />,
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
      renderCell: params => <OrderCell product={params.row.product} />,
      width: 280,

      table: DataGridFilterTables.PRODUCTS,
      columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
      disableCustomSort: true,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: params => (
        <MultilineTextCell
          maxLength={50}
          text={OrderStatusTranslate(OrderStatusByCode[params.row.status])}
          color={orderColorByStatus(OrderStatusByCode[params.row.status])}
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
        const firstButtonCondition = Number(params.row.status) <= Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT])
        const firstButtonText = firstButtonCondition ? t(TranslationKey['To order']) : t(TranslationKey['Repeat order'])

        return (
          <ActionButtonsCell
            isFirstButton
            isSecondButton
            firstButtonStyle={firstButtonCondition ? ButtonStyle.SUCCESS : ButtonStyle.PRIMARY}
            secondButtonStyle={ButtonStyle.PRIMARY}
            secondButtonVariant={ButtonVariant.OUTLINED}
            firstButtonElement={firstButtonText}
            secondButtonElement={t(TranslationKey['Warehouse and orders'])}
            onClickFirstButton={() => rowHandlers.onClickReorder(params.row, firstButtonCondition)}
            onClickSecondButton={() => rowHandlers.onClickWarehouseOrderButton(params.row.product._id)}
          />
        )
      },
      width: 220,
      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'barCode',
      headerName: t(TranslationKey.BarCode),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,
      width: 170,
      renderCell: params => (
        <DownloadAndCopyBtnsCell
          value={params.row?.product?.barCode}
          isFirstRow={params.api.getSortedRowIds()?.[0] === params.row._id}
        />
      ),
      valueFormatter: ({ row }) =>
        checkIsHasHttp(row?.product?.barCode) ? row?.product?.barCode : getAmazonImageUrl(row?.product?.barCode, true),

      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'amount',
      headerName: t(TranslationKey.Quantity),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
      renderCell: params => <MultilineTextCell text={params.value} />,
      width: 100,
      type: 'number',

      columnKey: columnnsKeys.shared.QUANTITY,
      disableCustomSort: true,
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
      field: 'destination',
      headerName: t(TranslationKey['Where to']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Where to'])} />,
      renderCell: params => <MultilineTextCell leftAlign threeLines text={params.row.destination?.name} />,
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
          <MultilineTextCell
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
      fields: [
        {
          label: () => t(TranslationKey['Min. production time, days']),
          value: 'minProductionTerm',
        },
        {
          label: () => t(TranslationKey['Max. production time, days']),
          value: 'maxProductionTerm',
        },
      ],
      width: 120,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.NUMBERS,
      table: DataGridFilterTables.SUPPLIERS,
    },

    {
      field: 'deadline',
      headerName: t(TranslationKey.Deadline),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
      renderCell: params =>
        params.row.status < 20 ? <DeadlineCell deadline={params.row.deadline} /> : <MultilineTextCell text={'-'} />,
      width: 100,
      valueGetter: params => (params.value ? formatDate(params.value) : ''),
      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'needsResearch',
      headerName: t(TranslationKey['Re-search supplier']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Re-search supplier'])} />,
      renderCell: params => <MultilineTextCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
      width: 100,

      columnKey: columnnsKeys.freelancer.FREELANCE_REQUESTS_CONFIRMATION,
    },

    {
      field: 'totalPrice',
      headerName: t(TranslationKey['Total price']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,
      renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
      valueFormatter: params => toFixedWithDollarSign(params.value, 2),
      width: 140,
      type: 'number',

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'weight',
      headerName: t(TranslationKey['Total weight']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total weight'])} />,
      renderCell: params => <ToFixedWithKgSignCell value={params.row.product?.weight} fix={2} />,
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
      renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={140} text={params.value} />,
      width: 200,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'clientComment',
      headerName: t(TranslationKey['Client comment']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,
      renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={140} text={params.value} />,
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

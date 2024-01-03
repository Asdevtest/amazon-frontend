import { t } from 'i18n-js'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
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
  DownloadAndCopyBtnsCell,
  IconHeaderCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  NormalActionBtnCell,
  OrderCell,
  PriorityAndChinaDeliverCell,
  SuccessActionBtnCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'

export const clientProductOrdersViewColumns = (handlers, isSomeFilterOn) => [
  {
    field: 'id',
    headerName: t(TranslationKey.ID) + ' / item',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID) + ' / item'} />,
    renderCell: params => <MultilineTextCell text={params.row.idItem} />,
    width: 100,
    type: 'number',
  },

  {
    field: 'priorityAndChinaDelivery',
    headerName: t(TranslationKey.Priority),
    renderHeader: () => <IconHeaderCell url={'/assets/icons/bookmark.svg'} />,
    width: 60,
    renderCell: params => (
      <PriorityAndChinaDeliverCell
        priority={params.row.originalData.priority}
        chinaDelivery={params.row.originalData.expressChinaDelivery}
        status={params.row.originalData.status}
      />
    ),
    sortable: false,
    filterable: false,
  },

  {
    field: 'asin',
    headerName: 'ASIN',
    renderHeader: () => <MultilineTextHeaderCell text={'ASIN'} />,

    width: 400,
    renderCell: params => <OrderCell product={params.row.originalData.product} />,
    sortable: false,
  },

  {
    field: 'orderStatus',
    headerName: t(TranslationKey.Status),
    renderHeader: () => {
      const { isActiveFilter } = isSomeFilterOn()

      return (
        <MultilineTextHeaderCell
          isFilterActive={isActiveFilter}
          text={t(TranslationKey.Status)}
          Icon={FilterAltOutlinedIcon}
        />
      )
    },

    width: 160,
    renderCell: params => (
      <MultilineTextCell
        leftAlign
        text={OrderStatusTranslate(OrderStatusByCode[params.row.originalData.status], 'client')}
        color={orderColorByStatus(OrderStatusByCode[params.row.originalData.status])}
      />
    ),

    columnKey: columnnsKeys.shared.PRODUCT_ORDERS_STATUS,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    width: 200,
    renderCell: params => (
      <>
        {Number(params.row.originalData.status) > Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]) ? (
          <NormalActionBtnCell
            bTnText={t(TranslationKey['Repeat order'])}
            onClickOkBtn={() => handlers.onClickReorder(params.row.originalData)}
          />
        ) : (
          <SuccessActionBtnCell
            bTnText={t(TranslationKey['To order'])}
            onClickOkBtn={() => handlers.onClickReorder(params.row.originalData, true)}
          />
        )}
      </>
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

    width: 170,
    renderCell: params => (
      <DownloadAndCopyBtnsCell value={params.value} isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id} />
    ),
    sortable: false,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,

    type: 'number',
    width: 80,
    sortable: false,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey['Int warehouse']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.storekeeper?._id} />
    ),
    width: 130,
    sortable: false,
  },

  {
    field: 'warehouses',
    headerName: t(TranslationKey['Where to']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Where to'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'productionTerm',
    headerName: t(TranslationKey['Production time']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,

    renderCell: params => <MultilineTextCell text={params.row.originalData?.orderSupplier?.productionTerm} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'deadline',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
    renderCell: params =>
      params.row.originalData.status < 20 ? (
        <DeadlineCell deadline={params.row.deadline} />
      ) : (
        <MultilineTextCell text={'-'} />
      ),
    width: 100,
  },

  {
    field: 'needsResearch',
    headerName: t(TranslationKey['Re-search supplier']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Re-search supplier'])} />,

    width: 100,
    renderCell: params => <MultilineTextCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
  },

  {
    field: 'totalPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,

    type: 'number',
    width: 140,
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
  },

  {
    field: 'grossWeightKg',
    headerName: t(TranslationKey['Total weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total weight'])} />,

    type: 'number',
    width: 110,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    sortable: false,
  },
  {
    field: 'trackingNumberChina',
    headerName: t(TranslationKey['Track number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Track number'])} />,

    width: 160,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'buyerComment',
    headerName: t(TranslationKey['Buyer comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,

    renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={140} text={params.value} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'clientComment',
    headerName: t(TranslationKey['Client comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,

    renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={140} text={params.value} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    width: 120,
    renderCell: params => <NormDateCell value={params.value} />,
    // type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    width: 140,
    renderCell: params => <NormDateCell value={params.value} />,
    // type: 'date',
  },
]

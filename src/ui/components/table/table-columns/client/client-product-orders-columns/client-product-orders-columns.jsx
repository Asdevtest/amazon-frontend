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
  ActionButtonsCell,
  BarCodeCell,
  DeadlineCell,
  IconHeaderCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OrderCell,
  PriorityAndChinaDeliverCell,
  TextCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { toFixedWithDollarSign, toFixedWithKg } from '@utils/text'

import { ButtonStyle } from '@typings/enums/button-style'

export const clientProductOrdersViewColumns = (handlers, isSomeFilterOn) => [
  {
    field: 'id',
    headerName: t(TranslationKey.ID) + ' / item',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID) + ' / item'} />,
    renderCell: params => <TextCell text={params.row.idItem} />,
    width: 100,
    type: 'number',
  },

  {
    field: 'priorityAndChinaDelivery',
    headerName: t(TranslationKey.Priority),
    renderHeader: () => <IconHeaderCell url={'/assets/icons/bookmark.svg'} />,
    width: 90,
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

    width: 300,
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
      <TextCell
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
    width: 240,
    renderCell: params => {
      const isRepeatOrder =
        Number(params.row.originalData.status) > Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT])
      const currentStyle = isRepeatOrder ? ButtonStyle.PRIMARY : ButtonStyle.SUCCESS
      const currentText = isRepeatOrder ? t(TranslationKey['Repeat order']) : t(TranslationKey['To order'])

      return (
        <ActionButtonsCell
          isFirstButton
          firstButtonElement={currentText}
          firstButtonStyle={currentStyle}
          onClickFirstButton={() => handlers.onClickReorder(params.row.originalData, !isRepeatOrder)}
        />
      )
    },
    filterable: false,
    sortable: false,
  },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

    width: 100,
    renderCell: params => <BarCodeCell value={params.value} />,
    sortable: false,
    align: 'center',
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,

    renderCell: params => <TextCell text={params.value} />,

    type: 'number',
    width: 90,
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

    renderCell: params => <TextCell text={params.value} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'productionTerm',
    headerName: t(TranslationKey['Production time']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,

    renderCell: params => {
      const orderSupplier = params.row.originalData?.orderSupplier

      return orderSupplier ? (
        <TextCell text={`${orderSupplier?.minProductionTerm} - ${orderSupplier?.maxProductionTerm}`} />
      ) : null
    },
    width: 160,
    sortable: false,
  },

  {
    field: 'deadline',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
    renderCell: params =>
      params.row.originalData.status < 20 ? <DeadlineCell deadline={params.row.deadline} /> : <TextCell text={'-'} />,
    width: 100,
  },

  {
    field: 'needsResearch',
    headerName: t(TranslationKey['Re-search supplier']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Re-search supplier'])} />,

    width: 140,
    renderCell: params => <TextCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
  },

  {
    field: 'totalPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,

    type: 'number',
    width: 140,
    renderCell: params => <TextCell text={toFixedWithDollarSign(params.value, 2)} />,
  },

  {
    field: 'grossWeightKg',
    headerName: t(TranslationKey['Total weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total weight'])} />,

    type: 'number',
    width: 110,
    renderCell: params => <TextCell text={toFixedWithKg(params.value)} />,
    sortable: false,
  },
  {
    field: 'trackingNumberChina',
    headerName: t(TranslationKey['Track number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Track number'])} />,

    width: 160,
    renderCell: params => <TextCell text={params.value} />,
  },

  {
    field: 'buyerComment',
    headerName: t(TranslationKey['Buyer comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,

    renderCell: params => <TextCell text={params.value} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'clientComment',
    headerName: t(TranslationKey['Client comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,

    renderCell: params => <TextCell text={params.value} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    width: 115,
    renderCell: params => <NormDateCell value={params.value} />,
    // type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    width: 115,
    renderCell: params => <NormDateCell value={params.value} />,
    // type: 'date',
  },
]

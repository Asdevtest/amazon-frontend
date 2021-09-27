import React from 'react'

import {DeliveryType, deliveryTypeCodeToKey} from '@constants/delivery-options'
import {texts} from '@constants/texts'
import {WarehouseType} from '@constants/warehouses'

import {
  DeliveryCell,
  NoActiveBarcodeCell,
  OrderCell,
  WarehouseCell,
  renderFieldValueCell,
  NormDateCell,
  OrderStatusCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').buyerMyOrdersTableColumns

export const buyerMyOrdersViewColumns = () => [
  {
    field: 'createDate',
    headerName: textConsts.createdAtField,
    renderCell: params => <NormDateCell params={params} />,
    width: 150,
    type: 'date',
  },

  {
    field: 'status',
    headerName: textConsts.statusField,
    width: 200,
    renderCell: params => <OrderStatusCell status={params.row.status} />,
    filterable: false,
  },

  {
    field: 'orders',
    headerName: textConsts.ordersField,
    width: 300,
    renderCell: params => <OrderCell product={params.row.product} />,
    filterable: false,
  },

  {field: 'amount', headerName: textConsts.amountField, type: 'number', width: 130},

  {
    field: 'barCode',
    headerName: textConsts.barcodeField,
    renderCell: params => <NoActiveBarcodeCell barCode={params.row.product.barCode} />,
    width: 200,
    filterable: false,
  },

  {
    field: 'warehouse',
    headerName: textConsts.warehouseField,
    renderCell: params => <WarehouseCell warehouse={params.row.warehouse} />,
    width: 200,
    valueParser: value => {
      switch (value) {
        case WarehouseType.ONT:
          return '25'
        case WarehouseType.LGB8:
          return '30'
        case WarehouseType.MEM1:
          return '35'
        case WarehouseType.MDW2:
          return '40'
        case WarehouseType.LAX9:
          return '42'
        default:
          return value
      }
    },
  },

  {
    field: 'deliveryMethod',
    headerName: textConsts.deliveryField,
    renderCell: params => <DeliveryCell delivery={params.row.deliveryMethod} />,
    width: 200,
    valueParser: value => {
      switch (value.toUpperCase()) {
        case deliveryTypeCodeToKey[DeliveryType.SEA]:
          return '1'
        case deliveryTypeCodeToKey[DeliveryType.AIR]:
          return '2'

        default:
          return value
      }
    },
  },

  {
    field: 'clientComment',
    headerName: textConsts.clientCommentField,
    renderCell: params => renderFieldValueCell(params.row.clientComment),
    width: 300,
  },

  {
    field: 'buyerComment',
    headerName: textConsts.buyerCommentField,
    renderCell: params => renderFieldValueCell(params.row.clientComment),
    width: 300,
  },
]

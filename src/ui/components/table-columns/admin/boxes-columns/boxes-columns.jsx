import React from 'react'

import {texts} from '@constants/texts'
import {WarehouseType} from '@constants/warehouses'

import {
  FinalWeightCell,
  IdCell,
  NoActiveBarcodeCell,
  NormDateWithParseISOCell,
  OrderCell,
  PriceCell,
  renderFieldValueCell,
  WarehouseCell,
  WeightCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').adminBoxesTableColumns

export const adminBoxesViewColumns = () => [
  {
    field: 'createdAt',
    headerName: textConsts.createdAtField,
    renderCell: params => <NormDateWithParseISOCell params={params} />,
    width: 150,
    type: 'date',
  },
  {
    field: 'orders',
    headerName: textConsts.ordersField,
    width: 300,
    renderCell: params => <OrderCell product={params.row.items[0].product} />,
    filterable: false,
  },
  {
    field: 'orderId',
    headerName: textConsts.ordersId,
    renderCell: params => <IdCell id={params.row.items[0].order._id} />,
    width: 200,
    filterable: false,
  },

  {
    field: 'barCode',
    headerName: textConsts.barCode,
    renderCell: params => <NoActiveBarcodeCell barCode={params.row.items[0].product.barCode} />,
    width: 200,
    filterable: false,
  },

  {
    field: 'asin',
    headerName: textConsts.asinField,
    renderCell: params => renderFieldValueCell(params.row.items[0].product.id),
    width: 150,
    filterable: false,
  },

  {
    field: 'qty',
    headerName: textConsts.qtyField,
    renderCell: params => renderFieldValueCell(params.row.items[0].order.amount),
    width: 150,
    filterable: false,
  },

  {
    field: 'material',
    headerName: textConsts.materialField,
    renderCell: params => renderFieldValueCell(params.row.items[0].product.material),
    width: 150,
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
    field: 'id',
    headerName: textConsts.boxIdField,
    renderCell: params => <IdCell id={params.row.id} />,
    width: 200,
  },

  {
    field: 'price',
    headerName: textConsts.priceField,
    renderCell: params => <PriceCell price={params.row.items[0].product.amazon} />,
    width: 200,
    filterable: false,
  },

  {
    field: 'weight',
    headerName: textConsts.weightField,
    renderCell: params => (
      <FinalWeightCell
        volumeWeight={
          params.row.volumeWeightKgWarehouse ? params.row.volumeWeightKgWarehouse : params.row.volumeWeightKgSupplier
        }
        weightFinalAccounting={
          params.row.weightFinalAccountingKgWarehouse
            ? params.row.weightFinalAccountingKgWarehouse
            : params.row.weightFinalAccountingKgSupplier
        }
      />
    ),
    width: 200,
    filterable: false,
  },

  {
    field: 'grossWeight',
    headerName: textConsts.grossWeightField,
    renderCell: params => (
      <WeightCell
        weight={params.row.weighGrossKgWarehouse ? params.row.weighGrossKgWarehouse : params.row.weighGrossKgSupplier}
      />
    ),
    width: 200,
    filterable: false,
  },

  {
    field: 'trackId',
    headerName: textConsts.trackIdField,
    renderCell: params => renderFieldValueCell(params.row.items[0].order.trackingNumberChina),
    width: 150,
    filterable: false,
  },
]

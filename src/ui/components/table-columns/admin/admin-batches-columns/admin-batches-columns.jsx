import React from 'react'

import {texts} from '@constants/texts'

import {
  BatchBoxesCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
  WarehouseTariffDatesCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').adminBatchesTableColumns

export const adminBatchesViewColumns = () => [
  {
    field: 'orders',
    headerName: textConsts.ordersField,
    width: 550,
    renderCell: params => <BatchBoxesCell boxes={params.row.originalData.boxes} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'storekeeper',
    headerName: textConsts.storekeeperNameField,
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.storekeeper?._id} />,
    width: 170,
  },

  {
    field: 'destination',
    headerName: textConsts.warehouseField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 100,
  },

  {
    field: 'humanFriendlyId',
    headerName: textConsts.humanFriendlyIdField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 80,
  },

  {
    field: 'tariff',
    headerName: textConsts.deliveryField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },

  {
    field: 'finalWeight',
    headerName: textConsts.weightField,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 130,
  },

  {
    field: 'totalPrice',
    headerName: textConsts.toralPriceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 130,
  },

  {
    field: 'dates',
    headerName: textConsts.datesField,
    renderCell: params => <WarehouseTariffDatesCell row={params.row.originalData.boxes[0].logicsTariff} />,
    width: 350,
    filterable: false,
    sortable: false,
  },
]

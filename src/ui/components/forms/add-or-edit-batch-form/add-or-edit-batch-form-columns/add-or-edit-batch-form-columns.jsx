import {texts} from '@constants/texts'

import {
  NormDateCell,
  OrderCell,
  OrderManyItemsCell,
  renderFieldValueCell,
  SuperboxQtyCell,
  ToFixedWithDollarSignCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').addOrEditBatchFormColumnsTexts

export const addOrEditBatchFormColumns = () => [
  {
    field: 'humanFriendlyId',
    headerName: textConsts.humanFriendlyIdField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 70,
  },

  {
    field: 'qty',
    headerName: textConsts.qtyField,
    renderCell: params =>
      params.row.originalData.amount > 1 ? (
        <SuperboxQtyCell qty={params.row.qty} superbox={params.row.originalData.amount} />
      ) : (
        renderFieldValueCell(params.value)
      ),
    width: 70,
    type: 'number',
  },

  {
    field: 'orders',
    headerName: textConsts.ordersField,
    width: 330,
    renderCell: params =>
      params.row.originalData.items.length > 1 ? (
        <OrderManyItemsCell box={params.row.originalData} />
      ) : (
        <OrderCell
          product={params.row.originalData.items[0].product}
          superbox={params.row.originalData.amount > 1 && params.row.originalData.amount}
          box={params.row.originalData}
        />
      ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'destination',
    headerName: textConsts.warehouseField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 130,
  },

  {
    field: 'client',
    headerName: textConsts.clientField,
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.client._id} />,
    width: 160,
  },

  {
    field: 'logicsTariff',
    headerName: textConsts.logicsTariffField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 130,
  },

  {
    field: 'updatedAt',
    headerName: textConsts.updatedAtField,
    renderCell: params => <NormDateCell params={params} />,
    width: 110,
    type: 'date',
  },

  {
    field: 'finalWeight',
    headerName: textConsts.weightField,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 120,
  },

  {
    field: 'amazonPrice',
    headerName: textConsts.priceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 120,
    type: 'number',
  },
]

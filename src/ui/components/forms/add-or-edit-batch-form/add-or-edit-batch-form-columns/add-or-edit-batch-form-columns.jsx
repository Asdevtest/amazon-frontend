import {TranslationKey} from '@constants/translations/translation-key'

import {
  NormDateCell, // OrderCell,
  // OrderManyItemsCell,
  MultilineTextCell, // SuperboxQtyCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
  OrderBoxesCell,
} from '@components/data-grid-cells/data-grid-cells'

import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

export const addOrEditBatchFormColumns = () => [
  // {
  //   field: 'humanFriendlyId',
  //   headerName: t(TranslationKey.ID),
  //   renderCell: params => <MultilineTextCell text={params.value} />,
  //   width: 70,
  // },

  // {
  //   field: 'qty',
  //   headerName: t(TranslationKey.Quantity),
  //   renderCell: params =>
  //     params.row.originalData.amount > 1 ? (
  //       <SuperboxQtyCell qty={params.row.qty} superbox={params.row.originalData.amount} />
  //     ) : (
  //       <MultilineTextCell text={params.value} />
  //     ),
  //   width: 150,
  //   // type: 'number',
  // },

  {
    field: 'boxes',
    headerName: t(TranslationKey.Boxes),
    width: 330,
    renderCell: params =>
      params.row.originalData.items.length > 1 ? (
        <div>
          <OrderBoxesCell
            superbox
            qty={params.row.qty}
            superboxQty={params.row.originalData.amount}
            box={params.row.originalData}
          />
        </div>
      ) : (
        <div>
          <OrderBoxesCell
            qty={params.row.qty}
            superboxQty={params.row.originalData.amount > 1 && params.row.originalData.amount}
            box={params.row.originalData}
            product={params.row.originalData.items[0].product}
          />
        </div>
      ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'logicsTariff',
    headerName: t(TranslationKey.Tariff),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 160,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 170,
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderCell: params => <UserLinkCell blackText name={params.value} userId={params.row.originalData.client._id} />,
    width: 160,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderCell: params => <NormDateCell params={params} />,
    width: 150,
    type: 'date',
  },

  {
    field: 'finalWeight',
    headerName: t(TranslationKey['Final weight']),
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    // type: 'number',
    width: 170,
  },

  {
    field: 'deliveryTotalPrice',
    headerName: t(TranslationKey['Total price']),
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 170,
    // type: 'number',
  },
]

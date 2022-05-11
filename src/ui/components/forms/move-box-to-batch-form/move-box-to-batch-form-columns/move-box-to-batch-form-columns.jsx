import {Radio} from '@material-ui/core'

import {texts} from '@constants/texts'

import {
  NormDateCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
  ToFixedWithKgSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').moveBoxToBatchFormColumns

export const moveBoxToBatchFormColumns = (handlers, selectedRow) => [
  {
    field: '.',
    headerName: '',
    width: 15,
    renderCell: params => (
      <Radio
        color="primary"
        checked={params.row.id === selectedRow?.id}
        onChange={() => handlers.onClickRowRadioBtn(params.row)}
      />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'destination',
    headerName: textConsts.warehouseField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 110,
  },

  {
    field: 'humanFriendlyId',
    headerName: textConsts.boxIdField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 60,
  },

  {
    field: 'tariff',
    headerName: textConsts.logicsTariffField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'updatedAt',
    headerName: textConsts.updatedAtField,
    renderCell: params => <NormDateCell params={params} />,
    width: 110,
    type: 'date',
  },

  {
    field: 'volumeWeight',
    headerName: textConsts.volumeWeightField,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 120,
  },

  {
    field: 'finalWeight',
    headerName: textConsts.weightField,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 120,
  },

  {
    field: 'totalPrice',
    headerName: textConsts.priceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 120,
    type: 'number',
  },
]

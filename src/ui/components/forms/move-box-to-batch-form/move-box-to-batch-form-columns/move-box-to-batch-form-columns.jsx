import {Radio} from '@mui/material'

import {TranslationKey} from '@constants/translations/translation-key'

import {NormDateCell, MultilineTextCell, ToFixedWithKgSignCell} from '@components/data-grid-cells/data-grid-cells'

import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

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
    headerName: t(TranslationKey.Destination),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 110,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 60,
  },

  {
    field: 'tariff',
    headerName: t(TranslationKey.Tariff),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 200,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderCell: params => <NormDateCell params={params} />,
    width: 110,
    type: 'date',
  },

  {
    field: 'volumeWeight',
    headerName: t(TranslationKey['Volume weight']),
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 120,
  },

  {
    field: 'finalWeight',
    headerName: t(TranslationKey['Final weight']),
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 120,
  },

  {
    field: 'totalPrice',
    headerName: t(TranslationKey['Total price']),
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 120,
    type: 'number',
  },
]

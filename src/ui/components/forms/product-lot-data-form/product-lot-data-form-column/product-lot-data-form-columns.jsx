/* eslint-disable no-unused-vars */
import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  WarehouseTariffDatesCell,
  MultilineTextCell,
  NormalActionBtnCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const productLotDataFormColumns = () => [
  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey['Batch number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch number'])} />,

    renderCell: params => <MultilineTextCell text={params.row.humanFriendlyId} />,
    width: 150,
  },

  {
    field: 'amountInBatch',
    headerName: t(TranslationKey['Quantity of the selected item in the batch']),
    renderHeader: () => (
      <MultilineTextHeaderCell text={t(TranslationKey['Quantity of the selected item in the batch'])} />
    ),

    renderCell: params => <MultilineTextCell text={params.row.amountInBatch} />,
    width: 180,
  },

  {
    field: 'shippingLabel',
    headerName: t(TranslationKey['Boxes and the quantity of the selected product in them']),
    renderHeader: () => (
      <MultilineTextHeaderCell text={t(TranslationKey['Boxes and the quantity of the selected product in them'])} />
    ),

    renderCell: params => <MultilineTextCell text={params.value ? params.value : '-'} />,
    width: 200,
  },

  {
    field: 'date',
    headerName: t(TranslationKey.Date),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Date)} />,

    renderCell: params => <WarehouseTariffDatesCell row={params.row.boxes[0].logicsTariff} />,
    width: 370,
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: params => <NormalActionBtnCell bTnText={t(TranslationKey['Watch the batch'])} />,
    width: 240,
  },
]

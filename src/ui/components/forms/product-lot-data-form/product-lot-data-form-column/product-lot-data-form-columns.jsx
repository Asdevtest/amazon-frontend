/* eslint-disable no-unused-vars */
import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  WarehouseTariffDatesCell,
  MultilineTextCell,
  NormalActionBtnCell,
  BoxesAndQuantity,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const productLotDataFormColumns = handlers => [
  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey['Batch number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch number'])} />,

    renderCell: params => <MultilineTextCell text={params.row.boxes[0].humanFriendlyId} />,
    width: 80,
  },

  {
    field: 'batchTitle',
    headerName: t(TranslationKey['Batch title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch title'])} />,

    renderCell: params => <MultilineTextCell text={params.row.title} />,
    width: 80,
  },

  {
    field: 'amountInBatch',
    headerName: t(TranslationKey['Quantity of the selected item in the batch']),
    renderHeader: () => (
      <MultilineTextHeaderCell text={t(TranslationKey['Quantity of the selected item in the batch'])} />
    ),

    renderCell: params => <MultilineTextCell text={params.row.amountInBatch} />,
    width: 150,
  },

  {
    field: 'boxesAndQuantity',
    headerName: t(TranslationKey['Boxes and the quantity of the selected product in them']),
    renderHeader: () => (
      <MultilineTextHeaderCell text={t(TranslationKey['Boxes and the quantity of the selected product in them'])} />
    ),

    renderCell: params => <BoxesAndQuantity boxesData={params.row.boxes} />,
    width: 200,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

    renderCell: params => <MultilineTextCell text={params.row.boxes[0].destination.name} />,
    width: 100,
  },

  {
    field: 'date',
    headerName: t(TranslationKey.Date),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Date)} />,

    renderCell: params => <WarehouseTariffDatesCell row={params.row.boxes[0].logicsTariff} />,
    width: 330,
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: params => (
      <NormalActionBtnCell
        bTnText={t(TranslationKey['Watch the batch'])}
        onClickOkBtn={() => handlers.onClickShowBatchBtn(params.row._id)}
      />
    ),
    width: 190,
  },
]

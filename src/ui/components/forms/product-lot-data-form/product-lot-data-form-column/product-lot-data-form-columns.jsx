import { TranslationKey } from '@constants/translations/translation-key'

import {
  BoxesAndQuantity,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormalActionBtnCell,
  StringListCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { formatDate } from '@utils/date-time'
import { t } from '@utils/translations'

export const productLotDataFormColumns = handlers => [
  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey['Batch number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch number'])} />,

    renderCell: params => <MultilineTextCell text={params.row.humanFriendlyId} />,
    width: 80,
  },

  {
    field: 'batchTitle',
    headerName: t(TranslationKey['Batch title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch title'])} />,

    renderCell: params => <MultilineTextCell leftAlign text={params.row.title} />,
    width: 130,
  },

  {
    field: 'amountInBatch',
    headerName: t(TranslationKey['Quantity of the selected item in the batch']),
    renderHeader: () => (
      <MultilineTextHeaderCell text={t(TranslationKey['Quantity of the selected item in the batch'])} />
    ),

    renderCell: params => <MultilineTextCell text={params.row.amountInBatch} />,
    width: 145,
  },

  {
    field: 'boxesAndQuantity',
    headerName: t(TranslationKey['Boxes and the quantity of the selected product in them']),
    renderHeader: () => (
      <MultilineTextHeaderCell text={t(TranslationKey['Boxes and the quantity of the selected product in them'])} />
    ),

    renderCell: params => <BoxesAndQuantity boxesData={params.row.boxes} />,
    width: 175,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey.Storekeeper),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Storekeeper)} />,

    renderCell: params => <MultilineTextCell text={params.value.name} />,
    width: 100,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

    renderCell: params => <MultilineTextCell text={params.row.boxes[0].destination.name} />,
    width: 100,
  },

  {
    field: 'fbaShipment',
    headerName: 'FBA Shipment',
    renderHeader: () => <MultilineTextHeaderCell text={'FBA Shipment'} />,

    renderCell: params => (
      <StringListCell withCopy maxItemsDisplay={4} maxLettersInItem={15} sourceString={params.value} />
    ),
    width: 155,
    sortable: false,
  },

  {
    field: 'cls',
    headerName: t(TranslationKey['CLS (batch closing date)']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['CLS (batch closing date)'])} />,

    renderCell: params => <MultilineTextCell text={formatDate(params.value)} />,

    width: 110,
  },

  {
    field: 'etd',
    headerName: t(TranslationKey['ETD (date of shipment)']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ETD (date of shipment)'])} />,

    renderCell: params => <MultilineTextCell text={formatDate(params.value)} />,
    width: 110,
  },

  {
    field: 'eta',
    headerName: t(TranslationKey['ETA (arrival date)']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ETA (arrival date)'])} />,

    renderCell: params => <MultilineTextCell text={formatDate(params.value)} />,
    width: 110,
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
    width: 165,
  },
]

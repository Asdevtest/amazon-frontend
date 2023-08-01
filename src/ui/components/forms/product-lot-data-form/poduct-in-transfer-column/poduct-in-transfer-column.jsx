/* eslint-disable no-unused-vars */
import { boxStatusTranslateKey, colorByBoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  BoxesAndQuantity,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormalActionBtnCell,
  StringListCell,
  WarehouseTariffDatesCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { formatDate } from '@utils/date-time'
import { getFullTariffTextForBoxOrOrder } from '@utils/text'
import { t } from '@utils/translations'

export const productInTransferColumns = handlers => [
  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

    renderCell: params => <MultilineTextCell text={params?.row?.humanFriendlyId} />,
    type: 'number',
    width: 60,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    renderCell: params => (
      <MultilineTextCell text={t(boxStatusTranslateKey(params.value))} otherStyles={colorByBoxStatus(params.value)} />
    ),
    width: 80,
  },

  {
    field: 'batchNumber',
    headerName: t(TranslationKey['Batch number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch number'])} />,

    renderCell: params => <MultilineTextCell text={params?.row?.batch?.humanFriendlyId} />,
    width: 60,
  },

  {
    field: 'batchTitle',
    headerName: t(TranslationKey['Batch title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch title'])} />,

    renderCell: params => <MultilineTextCell leftAlign text={params?.row?.batch?.title} />,
    width: 110,
  },

  {
    field: 'boxesAndQuantity',
    headerName: t(TranslationKey['Boxes and the quantity of the selected product in them']),
    renderHeader: () => (
      <MultilineTextHeaderCell text={t(TranslationKey['Boxes and the quantity of the selected product in them'])} />
    ),

    renderCell: params => <BoxesAndQuantity boxesData={params?.row} />,
    width: 154,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey.Storekeeper),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Storekeeper)} />,

    renderCell: params => <MultilineTextCell text={params.value.name} />,
    width: 180,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

    renderCell: params => <MultilineTextCell text={params.row.destination.name} />,
    width: 100,
  },

  {
    field: 'fbaShipment',
    headerName: 'FBA Shipment',
    renderHeader: () => <MultilineTextHeaderCell text={'FBA Shipment'} />,

    renderCell: params => (
      <StringListCell withCopy maxItemsDisplay={4} maxLettersInItem={15} sourceString={params.value} />
    ),
    width: 160,
    sortable: false,
  },

  {
    field: 'logicsTariff',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,

    renderCell: params => <MultilineTextCell text={getFullTariffTextForBoxOrOrder(params.row)} />,
    width: 80,
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
        disabled={!params.row.batch}
        bTnText={t(TranslationKey['Watch the batch'])}
        onClickOkBtn={() => handlers.onClickShowBatchBtn(params?.row?.batch?._id)}
      />
    ),
    width: 190,
  },
]

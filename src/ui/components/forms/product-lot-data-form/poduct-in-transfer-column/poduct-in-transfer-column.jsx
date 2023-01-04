/* eslint-disable no-unused-vars */
import {boxStatusTranslateKey, colorByBoxStatus} from '@constants/box-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  WarehouseTariffDatesCell,
  MultilineTextCell,
  NormalActionBtnCell,
  BoxesAndQuantity,
} from '@components/data-grid-cells/data-grid-cells'

import {getFullTariffTextForBoxOrOrder} from '@utils/text'
import {t} from '@utils/translations'

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
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

    renderCell: params => <MultilineTextCell text={params.row.destination.name} />,
    width: 100,
  },

  {
    field: 'logicsTariff',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,

    renderCell: params => <MultilineTextCell text={getFullTariffTextForBoxOrOrder(params.row)} />,
    width: 105,
  },

  {
    field: 'date',
    headerName: t(TranslationKey.Date),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Date)} />,

    renderCell: params => <WarehouseTariffDatesCell row={params.row.logicsTariff} />,
    width: 310,
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: params => (
      <NormalActionBtnCell
        bTnText={t(TranslationKey['Watch the batch'])}
        onClickOkBtn={() => handlers.onClickShowBatchBtn(params?.row?.batch?._id)}
      />
    ),
    width: 190,
  },
]

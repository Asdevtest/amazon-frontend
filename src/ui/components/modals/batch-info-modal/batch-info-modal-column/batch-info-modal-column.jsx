/* eslint-disable no-unused-vars */
import {Typography} from '@mui/material'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserLinkCell,
  PricePerUnitCell,
  ManyItemsPriceCell,
} from '@components/data-grid-cells/data-grid-cells'

import {calcFinalWeightForBox} from '@utils/calculation'
import {toFixedWithKg, getFullTariffTextForBoxOrOrder} from '@utils/text'
import {t} from '@utils/translations'

export const batchInfoModalColumn = volumeWeightCoefficient => [
  {
    field: 'boxes',
    headerName: t(TranslationKey.Boxes),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Boxes)} />,

    renderCell: params => <ManyItemsPriceCell params={params.row} />,
    width: 300,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

    renderCell: params => <MultilineTextCell text={params.row.humanFriendlyId} />,
    type: 'number',
    width: 70,
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,

    renderCell: params => <UserLinkCell blackText name={params.row.client.name} userId={params.row.client._id} />,
    width: 120,
  },

  {
    field: 'logicsTariff',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,

    renderCell: params => <MultilineTextCell text={getFullTariffTextForBoxOrOrder(params.row)} />,
    width: 210,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
    renderCell: params => <MultilineTextCell text={params.row.destination?.name} />,
    width: 120,
  },

  {
    field: 'updatedAt',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    headerName: t(TranslationKey.Updated),
    renderCell: params => <NormDateCell params={params} />,
    width: 180,
    type: 'date',
  },

  {
    field: 'finalWeight',
    headerName: <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,
    renderCell: params => (
      <MultilineTextCell text={toFixedWithKg(calcFinalWeightForBox(params.row, volumeWeightCoefficient), 2)} />
    ),
    type: 'number',
    width: 120,
  },

  {
    field: 'pricePerUnit',
    headerName: <MultilineTextHeaderCell text={t(TranslationKey['Price per unit'])} />,
    renderCell: params => <PricePerUnitCell item={params.row} />,
    type: 'number',
    width: 140,
  },
]

/* eslint-disable no-unused-vars */
import {Typography} from '@mui/material'

import {getBatchWeightCalculationMethodForBox} from '@constants/batch-weight-calculations-method'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserLinkCell,
  PricePerUnitCell,
  ManyItemsPriceCell,
  FinalPricePerUnitCell,
  OrdersIdsItemsCell,
} from '@components/data-grid-cells/data-grid-cells'

import {calcFinalWeightForBox} from '@utils/calculation'
import {toFixedWithKg, getFullTariffTextForBoxOrOrder} from '@utils/text'
import {t} from '@utils/translations'

export const batchInfoModalColumn = (volumeWeightCoefficient, calculationMethod, isActualGreaterTheVolume) => [
  {
    field: 'boxes',
    headerName: t(TranslationKey.Boxes),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Boxes)} />,

    renderCell: params => <ManyItemsPriceCell withoutSku withQuantity params={params.row} />,
    width: 300,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

    renderCell: params => <MultilineTextCell text={params.row.humanFriendlyId} />,
    type: 'number',
    width: 60,
  },

  {
    field: 'orderIdsItems',
    headerName: t(TranslationKey['№ Order/ № Item']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['№ Order/ № Item'])} />,

    renderCell: params => params.value && <OrdersIdsItemsCell value={params.value} />,
    width: 140,
    sortable: false,
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
    width: 200,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
    renderCell: params => <MultilineTextCell text={params.row.destination?.name} />,
    width: 110,
  },

  {
    field: 'updatedAt',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    headerName: t(TranslationKey.Updated),
    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },

  {
    field: 'finalWeight',
    headerName: <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,
    renderCell: params => (
      <MultilineTextCell
        text={toFixedWithKg(
          getBatchWeightCalculationMethodForBox(calculationMethod, isActualGreaterTheVolume)(
            params.row,
            volumeWeightCoefficient,
          ) * params.row.amount,
          2,
        )}
      />
    ),
    type: 'number',
    width: 100,
  },

  {
    field: 'pricePerUnit',
    headerName: <MultilineTextHeaderCell text={t(TranslationKey['Price per unit'])} />,
    renderCell: params => <PricePerUnitCell item={params.row} />,
    type: 'number',
    width: 90,
  },

  {
    field: 'finalPrice',
    headerName: <MultilineTextHeaderCell text={t(TranslationKey['Final price'])} />,
    renderCell: params => (
      <FinalPricePerUnitCell
        box={params.row}
        boxFinalWeight={getBatchWeightCalculationMethodForBox(calculationMethod, isActualGreaterTheVolume)(
          params.row,
          volumeWeightCoefficient,
        )}
      />
    ),
    type: 'number',
    width: 90,
  },
]

import { BatchStatus } from '@constants/statuses/batch-status'
import { getBatchWeightCalculationMethodForBox } from '@constants/statuses/batch-weight-calculations-method'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActualCostWithDelivery,
  ActualCostWithDeliveryPerUnit,
  FinalPricePerUnitCell,
  ManyItemsPriceCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OrdersIdsItemsCell,
  PricePerUnitCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'

import { getNewTariffTextForBoxOrOrder, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

export const batchInfoModalColumn = (
  volumeWeightCoefficient,
  calculationMethod,
  isActualGreaterTheVolume,
  actualShippingCost,
  finalWeight,
  status,
) => [
  {
    field: 'boxes',
    headerName: t(TranslationKey.Boxes),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Boxes)} />,

    renderCell: params => <ManyItemsPriceCell withoutSku withQuantity params={params.row} />,
    width: 280,
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

    renderCell: params => <UserMiniCell userName={params.row.client?.name} userId={params.row.client?._id} />,
    width: 180,
  },

  {
    field: 'logicsTariff',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,

    renderCell: params => {
      const isTooltip = status === BatchStatus.HAS_DISPATCHED && params.row.lastRateTariff === 0

      return (
        <MultilineTextCell
          threeLines
          tooltipText={
            isTooltip
              ? t(
                  TranslationKey[
                    'This rate may have an irrelevant value as the rate may have been changed after shipment.'
                  ],
                )
              : ''
          }
          maxLength={80}
          text={getNewTariffTextForBoxOrOrder(params.row)}
        />
      )
    },
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
    renderCell: params => <NormDateCell value={params.value} />,
    width: 100,
    // type: 'date',
  },

  {
    field: 'finalWeight',
    headerName: t(TranslationKey['Final weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,
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
    headerName: t(TranslationKey['Price per unit']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Price per unit'])} />,
    renderCell: params => <PricePerUnitCell item={params.row} />,
    type: 'number',
    width: 90,
  },

  {
    field: 'finalPrice',
    headerName: t(TranslationKey['Calculated price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Calculated price'])} />,
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
    width: 110,
  },

  {
    field: 'actualCostWithDeliveryPerUnit',
    headerName: t(TranslationKey['Actual cost with delivery per unit']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Actual cost with delivery per unit'])} />,
    renderCell: params => (
      <ActualCostWithDeliveryPerUnit
        actualShippingCost={actualShippingCost}
        rowMemo={params.row}
        finalWeight={finalWeight}
        calculationMethod={calculationMethod}
        isActualGreaterTheVolume={isActualGreaterTheVolume}
        volumeWeightCoefficient={volumeWeightCoefficient}
      />
    ),
    type: 'number',
    width: 160,
  },

  {
    field: 'actualCostWithDelivery',
    headerName: t(TranslationKey['The actual cost of the box with delivery']),
    renderHeader: () => (
      <MultilineTextHeaderCell text={t(TranslationKey['The actual cost of the box with delivery'])} />
    ),
    renderCell: params => (
      <ActualCostWithDelivery
        actualShippingCost={actualShippingCost}
        rowMemo={params.row}
        finalWeight={finalWeight}
        calculationMethod={calculationMethod}
        isActualGreaterTheVolume={isActualGreaterTheVolume}
        volumeWeightCoefficient={volumeWeightCoefficient}
      />
    ),
    type: 'number',
    width: 170,
  },
]

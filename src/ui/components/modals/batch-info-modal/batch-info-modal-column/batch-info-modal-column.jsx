import { BatchStatus } from '@constants/statuses/batch-status'
import {
  getBatchParameters,
  getBatchWeightCalculationMethodForBox,
} from '@constants/statuses/batch-weight-calculations-method'
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
  StringListCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'

import { getTariffRateForBoxOrOrder } from '@utils/calculation'
import { getNewTariffTextForBoxOrOrder, toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
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
    field: 'ASIN',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,

    renderCell: ({ row }) => (
      <StringListCell
        sourceString={row.items?.map(item => item?.product?.asin || t(TranslationKey.Missing)).join(', ')}
      />
    ),

    valueGetter: ({ row }) => row.items?.map(item => item?.product?.asin || t(TranslationKey.Missing)).join(', '),

    minWidth: 150,
  },

  {
    field: 'boxes',
    headerName: t(TranslationKey.Boxes),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Boxes)} />,

    renderCell: params => <ManyItemsPriceCell withoutSku withoutAsin params={params.row} />,
    valueGetter: ({ row }) => row?.amount,
    minWidth: 280,
  },

  {
    field: 'quantityInBox',
    headerName: t(TranslationKey['Quantity in box']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Quantity in box'])} />,

    renderCell: ({ row }) => (
      <StringListCell sourceString={row.items?.map(item => item?.amount || t(TranslationKey.Missing)).join(', ')} />
    ),
    valueGetter: ({ row }) => row.items?.map(item => item?.amount || t(TranslationKey.Missing)).join(', '),
    minWidth: 80,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    valueGetter: ({ row }) => row?.humanFriendlyId,
    type: 'number',
    minWidth: 60,
  },

  {
    field: 'orderIdsItems',
    headerName: t(TranslationKey['№ Order/ № Item']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['№ Order/ № Item'])} />,

    renderCell: params => params.value && <OrdersIdsItemsCell value={params.value} />,
    valueGetter: ({ row }) => row?.orderIdsItems || t(TranslationKey.Missing),
    minWidth: 140,
    sortable: false,
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,

    renderCell: params => <UserMiniCell userName={params.row?.client?.name} userId={params.row?.client?._id} />,
    valueGetter: ({ row }) => row?.client?.name || t(TranslationKey.Missing),
    minWidth: 180,
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

    valueGetter: ({ row }) => getNewTariffTextForBoxOrOrder(row),
    minWidth: 200,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
    renderCell: params => <MultilineTextCell text={params.row.destination?.name} />,
    valueGetter: ({ row }) => row.destination?.name || t(TranslationKey.Missing),
    minWidth: 110,
  },

  {
    field: 'updatedAt',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    headerName: t(TranslationKey.Updated),
    renderCell: params => <NormDateCell value={params.value} />,
    valueGetter: ({ row }) => row.updatedAt || t(TranslationKey.Missing),
    minWidth: 100,
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
    valueGetter: ({ row }) =>
      toFixedWithKg(
        getBatchWeightCalculationMethodForBox(calculationMethod, isActualGreaterTheVolume)(
          row,
          volumeWeightCoefficient,
        ) * row.amount,
        2,
      ) || t(TranslationKey.Missing),
    type: 'number',
    minWidth: 100,
  },

  {
    field: 'pricePerUnit',
    headerName: t(TranslationKey['Price per unit']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Price per unit'])} />,
    renderCell: params => <PricePerUnitCell item={params.row} />,
    valueGetter: ({ row }) =>
      row.items.map(el => toFixedWithDollarSign(el.order?.totalPrice / el.order?.amount, 2)).join(', '),
    type: 'number',
    minWidth: 90,
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
    valueGetter: ({ row }) => {
      const boxFinalWeight = getBatchWeightCalculationMethodForBox(calculationMethod, isActualGreaterTheVolume)(
        row,
        volumeWeightCoefficient,
      )

      return row.items
        .map(el =>
          toFixedWithDollarSign(
            el.order?.totalPrice / el.order?.amount + (boxFinalWeight * getTariffRateForBoxOrOrder(row)) / el.amount,
            2,
          ),
        )
        .join(', ')
    },
    type: 'number',
    minWidth: 110,
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
    valueGetter: ({ row }) => {
      const getTotalCost = item => {
        const { shippingCost, itemsQuantity, singleProductPrice } = getBatchParameters(
          row,
          item,
          volumeWeightCoefficient,
          finalWeight,
          calculationMethod,
          isActualGreaterTheVolume,
          actualShippingCost,
        )

        const fullBatchPrice = itemsQuantity * singleProductPrice + shippingCost

        return fullBatchPrice / itemsQuantity
      }

      return row.items.map(el => (!!actualShippingCost && toFixedWithDollarSign(getTotalCost(el), 2)) || '-').join(', ')
    },
    type: 'number',
    minWidth: 160,
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
    valueGetter: ({ row }) => {
      const getTotalCost = item => {
        const { shippingCost, itemsQuantity, singleProductPrice } = getBatchParameters(
          row,
          item,
          volumeWeightCoefficient,
          finalWeight,
          calculationMethod,
          isActualGreaterTheVolume,
          actualShippingCost,
        )
        return itemsQuantity * singleProductPrice + shippingCost
      }

      return row.items.map(el => toFixedWithDollarSign(getTotalCost(el), 2) || '-').join(', ')
    },
    type: 'number',
    minWidth: 170,
  },

  {
    field: 'Account',
    headerName: 'Account',
    renderHeader: () => <MultilineTextHeaderCell text="Account" />,
    renderCell: ({ row }) => (
      <StringListCell
        sourceString={row.items?.map(item => item?.product?.shop?.name || t(TranslationKey.Missing)).join(', ')}
      />
    ),
    valueGetter: ({ row }) => row.items?.map(item => item?.product?.shop?.name || t(TranslationKey.Missing)).join(', '),
    minWidth: 100,
  },

  {
    field: 'fbaShipment',
    headerName: 'FBA Shipment',
    renderHeader: () => <MultilineTextHeaderCell text="FBA Shipment" />,
    renderCell: ({ row }) => (
      <StringListCell withCopy maxItemsDisplay={4} maxLettersInItem={15} sourceString={row.fbaShipment} />
    ),
    valueGetter: ({ row }) => row.fbaShipment,
    minWidth: 165,
  },
]

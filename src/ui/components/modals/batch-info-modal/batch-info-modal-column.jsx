import {
  getBatchParameters,
  getBatchWeightCalculationMethodForBox,
} from '@constants/statuses/batch-weight-calculations-method'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  OrdersIdsItemsCell,
  ProductsCell,
  StringListCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { getTariffRateForBoxOrOrder } from '@utils/calculation'
import { getNewTariffTextForBoxOrOrder, toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { useSyncedScrollAll } from '@hooks/use-synced-scroll'

import { getPricePerUnit } from './helpers/get-price-per-unit'

export const batchInfoModalColumn = (
  volumeWeightCoefficient,
  calculationMethod,
  isActualGreaterTheVolume,
  actualShippingCost,
  finalWeight,
  status,
) => {
  const [refs, onScroll] = useSyncedScrollAll(7)

  const columns = [
    {
      field: 'ASIN',
      headerName: t(TranslationKey.ASIN),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
      renderCell: ({ row }) => (
        <StringListCell
          ref={refs[0]}
          asin
          maxVisibleLines={5}
          data={row.items?.map(item => item?.product?.asin)}
          onScroll={onScroll}
        />
      ),
      valueGetter: ({ row }) => row.items?.map(item => item?.product?.asin || t(TranslationKey.Missing)).join(', '),
      width: 150,
    },

    {
      field: 'boxes',
      headerName: t(TranslationKey.Boxes),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Boxes)} />,
      renderCell: params => <ProductsCell box={params.row} />,
      valueGetter: ({ row }) => row?.amount,
      width: 170,
    },

    {
      field: 'quantityInBox',
      headerName: t(TranslationKey['Quantity in box']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Quantity in box'])} />,
      renderCell: ({ row }) => (
        <StringListCell
          ref={refs[1]}
          maxVisibleLines={5}
          data={row.items?.map(item => item?.amount)}
          onScroll={onScroll}
        />
      ),
      valueGetter: ({ row }) => row.items?.map(item => item?.amount || t(TranslationKey.Missing)).join(', '),
      width: 90,
    },

    {
      field: 'xid',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
      renderCell: params => <Text isCell text={params.value} />,
      valueGetter: ({ row }) => row?.xid,
      type: 'number',
      width: 80,
    },

    {
      field: 'orderIdsItems',
      headerName: t(TranslationKey['№ Order/ № Item']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['№ Order/ № Item'])} />,
      renderCell: params => params.value && <OrdersIdsItemsCell value={params.value} />,
      valueGetter: ({ row }) => row?.orderIdsItems || t(TranslationKey.Missing),
      width: 140,
      sortable: false,
    },

    {
      field: 'client',
      headerName: t(TranslationKey.Client),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
      renderCell: params => (
        <UserCell name={params.row?.client?.name} id={params.row?.client?._id} email={params.row?.client?.email} />
      ),
      valueGetter: ({ row }) => row?.client?.name || t(TranslationKey.Missing),
      width: 180,
    },

    {
      field: 'logicsTariff',
      headerName: t(TranslationKey.Tariff),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,
      renderCell: params => <Text isCell text={getNewTariffTextForBoxOrOrder(params.row)} />,
      valueGetter: ({ row }) => getNewTariffTextForBoxOrOrder(row),
      width: 200,
    },

    {
      field: 'destination',
      headerName: t(TranslationKey.Destination),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
      renderCell: params => <Text isCell text={params.row.destination?.name} />,
      valueGetter: ({ row }) => row.destination?.name || t(TranslationKey.Missing),
      width: 110,
    },

    {
      field: 'finalWeight',
      headerName: t(TranslationKey['Final weight']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,
      renderCell: params => (
        <Text
          isCell
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
      width: 100,
    },

    {
      field: 'pricePerUnit',
      headerName: t(TranslationKey['Price per unit']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Price per unit'])} />,
      renderCell: ({ row }) => (
        <StringListCell
          ref={refs[2]}
          maxVisibleLines={5}
          data={row.items?.map(item => toFixedWithDollarSign(item.order?.totalPrice / item.order?.amount, 2))}
          onScroll={onScroll}
        />
      ),
      valueGetter: ({ row }) => row.items.map(el => toFixedWithDollarSign(getPricePerUnit(el), 2)).join(', '),
      type: 'number',
      width: 90,
    },

    {
      field: 'finalPrice',
      headerName: t(TranslationKey['Calculated price']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Calculated price'])} />,
      renderCell: ({ row }) => {
        const boxFinalWeight = getBatchWeightCalculationMethodForBox(calculationMethod, isActualGreaterTheVolume)(
          row,
          volumeWeightCoefficient,
        )

        return (
          <StringListCell
            ref={refs[3]}
            maxVisibleLines={5}
            data={row.items?.map(item =>
              toFixedWithDollarSign(
                item.order?.totalPrice / item.order?.amount +
                  (boxFinalWeight * getTariffRateForBoxOrOrder(row)) / item.amount,
                2,
              ),
            )}
            onScroll={onScroll}
          />
        )
      },
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
      width: 110,
    },

    {
      field: 'actualCostWithDeliveryPerUnit',
      headerName: t(TranslationKey['Actual cost with delivery per unit']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Actual cost with delivery per unit'])} />,
      renderCell: ({ row }) => {
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

        return (
          <StringListCell
            ref={refs[4]}
            maxVisibleLines={5}
            data={row.items?.map(item => (!!actualShippingCost && toFixedWithDollarSign(getTotalCost(item), 2)) || '-')}
            onScroll={onScroll}
          />
        )
      },
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

        return row.items
          .map(el => (!!actualShippingCost && toFixedWithDollarSign(getTotalCost(el), 2)) || '-')
          .join(', ')
      },
      type: 'number',
      width: 160,
    },

    {
      field: 'actualCostWithDelivery',
      headerName: t(TranslationKey['The actual cost of the box with delivery']),
      renderHeader: () => (
        <MultilineTextHeaderCell text={t(TranslationKey['The actual cost of the box with delivery'])} />
      ),
      renderCell: ({ row }) => {
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

        return (
          <StringListCell
            ref={refs[5]}
            maxVisibleLines={5}
            data={row.items?.map(item => toFixedWithDollarSign(getTotalCost(item), 2) || '-')}
            onScroll={onScroll}
          />
        )
      },
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
      width: 170,
    },

    {
      field: 'Account',
      headerName: 'Account',
      renderHeader: () => <MultilineTextHeaderCell text="Account" />,
      renderCell: ({ row }) => (
        <StringListCell
          ref={refs[6]}
          maxVisibleLines={5}
          data={row.items?.map(item => item?.product?.shop?.name)}
          onScroll={onScroll}
        />
      ),
      valueGetter: ({ row }) =>
        row.items?.map(item => item?.product?.shop?.name || t(TranslationKey.Missing)).join(', '),
      width: 100,
    },

    {
      field: 'fbaShipment',
      headerName: 'FBA Shipment',
      renderHeader: () => <MultilineTextHeaderCell text="FBA Shipment" />,
      renderCell: ({ row }) => <Text isCell text={row.fbaShipment || '-'} />,
      valueGetter: ({ row }) => row.fbaShipment,
      width: 165,
    },
  ]

  return columns
}

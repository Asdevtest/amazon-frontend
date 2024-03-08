import { toFixed } from '@utils/text'

export const roundSafely = num => Math.round(num * 100) / 100

export const roundHalf = num => {
  const roundedNum = Number(toFixed(num, 1))
  const dif = roundedNum - Math.trunc(num)

  // const haveDoteInEnd = (num + '').slice(-1) === '.'

  // if (dif >= 0.25 && dif < 0.75) {
  //   return haveDoteInEnd ? Math.trunc(num) + 0.5 + '.' : Math.trunc(num) + 0.5
  // } else if (dif < 0.5) {
  //   return haveDoteInEnd ? Math.trunc(num) + '.' : Math.trunc(num)
  // } else {
  //   return haveDoteInEnd ? Math.ceil(num) + '.' : Math.ceil(num)
  // }

  if (dif >= 0.25 && dif < 0.75) {
    return Math.trunc(num) + 0.5
  } else if (dif < 0.5) {
    return Math.trunc(num)
  } else {
    return Math.ceil(num)
  }
}

export const calcProductsPriceWithDelivery = (product, order) =>
  ((parseFloat(product.currentSupplier && product.currentSupplier.price) || 0) +
    (parseFloat(
      product.currentSupplier && product.currentSupplier.batchDeliveryCostInDollar / product.currentSupplier.amount,
    ) || 0)) *
  (parseInt(order?.amount) || 0)

export const calcProductsMaxAmountByPriceLimit = (product, maxPrice) =>
  maxPrice > 0
    ? maxPrice /
      ((parseFloat(product.currentSupplier && product.currentSupplier.price) || 0) +
        (parseFloat(
          product.currentSupplier && product.currentSupplier.batchDeliveryCostInDollar / product.currentSupplier.amount,
        ) || 0))
    : 999999999

export const calcOrderTotalPrice = (supplier, goodsAmount) =>
  ((parseFloat(supplier?.price) || 0) + (parseFloat(supplier?.batchDeliveryCostInDollar / supplier?.amount) || 0)) *
  (parseInt(goodsAmount) || 0)

export const calcOrderTotalPriceInYuann = (supplier, goodsAmount) =>
  ((parseFloat(supplier?.priceInYuan) || 0) + (parseFloat(supplier?.batchDeliveryCostInYuan / supplier?.amount) || 0)) *
  (parseInt(goodsAmount) || 0)

export const calcExchangePrice = (price, rate) =>
  toFixed(Math.round(((parseFloat(price) || 0) / (parseFloat(rate) || 1)) * 100) / 100, 2)

export const calcExchangeDollarsInYuansPrice = (price, rate) =>
  toFixed(Math.round((parseFloat(price) || 0) * (parseFloat(rate) || 1)), 2)

export const calcPriceForItem = (fullPrice, amount) => (parseFloat(fullPrice) || 0) / (parseFloat(amount) || 1)

export const calcVolumeWeightForBox = (box, coefficient) => {
  if (box.lengthCmWarehouse || box.widthCmWarehouse || box.heightCmWarehouse) {
    return (box.lengthCmWarehouse * box.widthCmWarehouse * box.heightCmWarehouse) / coefficient || 0
  } else {
    return (box.lengthCmSupplier * box.widthCmSupplier * box.heightCmSupplier) / coefficient || 0
  }
}

export const getTariffRateForBoxOrOrder = box => {
  if (!box || (!box.destination && !box.logicsTariff)) {
    return 0
  }

  return box?.variationTariff?.pricePerKgUsd
}

export const calcFinalWeightForBox = (box, coefficient) =>
  Math.max(
    parseFloat(calcVolumeWeightForBox(box, coefficient)) || 0,
    parseFloat(box.weighGrossKgWarehouse ? box.weighGrossKgWarehouse : box.weighGrossKgSupplier) || 0,
  )

// export const getBatchWeightCalculationMethodForBatch = batch => {
//   if (!batch) {
//     return null
//   }

//   switch (batch.calculationMethod) {
//     case BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_MORE_WEIGHT]:
//       return batch.boxes.reduce(
//         (prev, box) => (prev = prev + calcFinalWeightForBox(box, batch.volumeWeightDivide) * box.amount),
//         0,
//       )
//     case BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_MORE_TOTAL_WEIGHT]:
//       return calcFinalWeightForBatchByMoreTotalWeight(batch.boxes, batch.volumeWeightDivide)
//     case BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_ACTUAL_WEIGHT]:
//       return batch.boxes.reduce((prev, box) => (prev = prev + box.weighGrossKgWarehouse * box.amount), 0)
//     case BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_VOLUME_WEIGHT]:
//       return batch.boxes.reduce((ac, cur) => (ac += calcVolumeWeightForBox(cur, batch.volumeWeightDivide, true)), 0)
//   }
// }

export const calcActualBatchWeight = boxes => {
  if (!boxes) {
    return null
  }

  return (
    parseFloat(
      boxes?.reduce(
        (ac, cur) =>
          (ac += cur.weighGrossKgWarehouse ? cur.weighGrossKgWarehouse * cur.amount : cur.weighGrossKgSupplier),
        0,
      ),
    ) || 0
  )
}

export const calcVolumeBatchWeight = (boxes, coefficient) => {
  if (!boxes) {
    return null
  }

  return parseFloat(boxes.reduce((ac, cur) => (ac += calcVolumeWeightForBox(cur, coefficient) * cur.amount), 0)) || 0
}

export const calcFinalWeightForBatchByMoreTotalWeight = (boxes, coefficient) => {
  if (!boxes) {
    return null
  }

  return Math.max(calcVolumeBatchWeight(boxes, coefficient), calcActualBatchWeight(boxes))
}

export const calcFinalWeightForBoxByMoreActualWeight = box => {
  if (!box) {
    return null
  }

  return parseFloat(box.weighGrossKgWarehouse ? box.weighGrossKgWarehouse : box.weighGrossKgSupplier)
}

export const calcFinalWeightForBoxWithoutAmount = (box, coefficient) => {
  if (!box) {
    return null
  }
  return Math.max(
    parseFloat(calcVolumeWeightForBoxWithoutAmount(box, coefficient)) || 0,
    parseFloat(box.weighGrossKgWarehouse ? box.weighGrossKgWarehouse : box.weighGrossKgSupplier) || 0,
  )
}

export const checkActualBatchWeightGreaterVolumeBatchWeight = (boxes, coefficient) => {
  if (!boxes) {
    return null
  }
  return calcActualBatchWeight(boxes) > calcVolumeBatchWeight(boxes, coefficient)
}

export const calcVolumeWeightForBoxWithoutAmount = (box, coefficient) => {
  if (!box) {
    return null
  }

  // if (box.lengthCmWarehouse || box.widthCmWarehouse || box.heightCmWarehouse) {
  //   return roundSafely((box.lengthCmWarehouse * box.widthCmWarehouse * box.heightCmWarehouse) / coefficient) || 0
  // } else {
  //   return roundSafely((box.lengthCmSupplier * box.widthCmSupplier * box.heightCmSupplier) / coefficient) || 0
  // }

  if (box.lengthCmWarehouse || box.widthCmWarehouse || box.heightCmWarehouse) {
    return (box.lengthCmWarehouse * box.widthCmWarehouse * box.heightCmWarehouse) / coefficient || 0
  } else {
    return (box.lengthCmSupplier * box.widthCmSupplier * box.heightCmSupplier) / coefficient || 0
  }
}

export const calcTotalFbaForProduct = product => {
  if (!product) {
    return null
  }
  return (
    (parseFloat(product.fbafee) || 0) + (parseFloat(product.reffee) || 0)
  ) /* (parseFloat(product.amazon) || 0) * 0.15*/
}

export const calcMaxDeliveryForProduct = product => {
  if (!product) {
    return null
  }
  return product.express ? (product.weight || 0) * 7 : (product.weight || 0) * 5
  // (product.weight || 0) * (product.currentSupplier.batchDeliveryCostInDollar / product.currentSupplier.amount)
}
export function updateProductAutoCalculatedFields() {
  const strBsr = this.product.bsr + ''
  this.product.bsr = parseFloat(strBsr.replace(',', '')) || 0

  const strPrice = this.product.amazon + ''
  this.product.amazon = (strPrice.replace(',', '') === '0' ? '' : strPrice.replace(',', '')) || ''

  this.product.totalFba = /* this.product.totalFba ?  this.product.totalFba : */ calcTotalFbaForProduct(this.product)

  this.product.maxDelivery = calcMaxDeliveryForProduct(this.product)

  this.product.minpurchase =
    (parseFloat(this.product.amazon) || 0) -
    (parseFloat(this.product.totalFba) || 0) -
    0.4 * ((parseFloat(this.product.amazon) || 0) - (parseFloat(this.product.totalFba) || 0)) -
    (parseFloat(this.product.maxDelivery) || 0)

  if (this.product.currentSupplier && this.product.currentSupplier._id) {
    // this.product.reffee = (parseFloat(this.product.amazon) || 0) * 0.15
    if (this.product.fbafee) {
      this.product.profit = (
        (parseFloat(this.product.amazon) || 0).toFixed(2) -
          (this.product.reffee || 0) /* .toFixed(2)*/ -
          (
            parseFloat(this.product.currentSupplier.batchDeliveryCostInDollar / this.product.currentSupplier.amount) ||
            0
          ).toFixed(2) -
          (parseFloat(this.product.currentSupplier.price) || 0).toFixed(2) -
          (parseFloat(this.product.fbafee) || 0).toFixed(2) || 0
      ).toFixed(2)
    } else {
      this.product.profit = (
        (parseFloat(this.product.amazon) || 0).toFixed(2) -
          (this.product.reffee || 0) /* .toFixed(2)*/ -
          (
            parseFloat(this.product.currentSupplier.batchDeliveryCostInDollar / this.product.currentSupplier.amount) ||
            0
          ).toFixed(2) -
          (parseFloat(this.product.currentSupplier.price) || 0).toFixed(2) || 0
      ).toFixed(2)
    }
    this.product.margin =
      (this.product.profit /
        ((parseFloat(this.product.currentSupplier.price) || 0) +
          (parseFloat(this.product.currentSupplier.batchDeliveryCostInDollar / this.product.currentSupplier.amount) ||
            0))) *
      100
  } else {
    this.product.profit = 0
    this.product.margin = 0
  }
}

export const calcTotalPriceForBatch = batch => {
  if (!batch) {
    return null
  }

  return batch.boxes.reduce(
    (acc, cur) =>
      cur.amount > 1
        ? acc +
          cur.items.reduce(
            (ac, cu) =>
              ac +
              (cu.product.currentSupplier.price +
                cu.product.currentSupplier.batchDeliveryCostInDollar / cu.product.currentSupplier.amount) *
                cu.amount,
            0,
          ) *
            cur.amount
        : acc +
          cur.items.reduce(
            (ac, cu) =>
              ac +
              (cu.product.currentSupplier.price +
                cu.product.currentSupplier.batchDeliveryCostInDollar / cu.product.currentSupplier.amount) *
                cu.amount,
            0,
          ),
    0,
  )
}

export const calcSupplierPriceForUnit = supplier => {
  if (!supplier) {
    return null
  }
  return (supplier.price || 0) + roundSafely((supplier.batchDeliveryCostInDollar || 0) / (supplier.amount || 1))
}

export const calcPriceForBox = box => {
  if (!box) {
    return null
  }

  const sumsOfItems = box.items?.reduce(
    (acc, cur) => acc + calcSupplierPriceForUnit(cur.order?.orderSupplier) * cur.amount,
    0,
  )
  return box.amount > 1 ? sumsOfItems * box.amount : sumsOfItems
}

export const calculateDeliveryCostPerPcs = ({
  itemSupplierBoxWeightGrossKg,
  deliveryCost,
  itemAmount,
  itemSupplierAmountInBox,
  boxFinalWeight,
  box,
}) => {
  if (!box) {
    return null
  }

  if (box.items.length === 1 && itemSupplierBoxWeightGrossKg) {
    return deliveryCost / itemAmount / box.amount
  } else if (box.items.length > 1 && itemSupplierBoxWeightGrossKg) {
    const res =
      (deliveryCost * (((itemSupplierBoxWeightGrossKg / itemSupplierAmountInBox) * itemAmount) / boxFinalWeight)) /
      itemAmount /
      box.amount

    return res
  } else {
    return '' // t(TranslationKey['No data'])
  }
}

export const priceCalculation = (price, deliveryPrice, qty) =>
  toFixed(((parseFloat(price) || 0) + (parseFloat(deliveryPrice) || 0)) * (parseInt(qty) || 0), 2)

export const calcNumberMinusPercent = (number, percent) => {
  if (+percent === 100) {
    return '0'
  } else {
    return parseFloat(number) - parseFloat(number) * (parseFloat(percent) / 100)
  }
}

export const calcPercentAfterMinusNumbers = (firstNumber, secondNumber) =>
  ((parseFloat(firstNumber) - parseFloat(secondNumber)) * 100) / parseFloat(firstNumber)

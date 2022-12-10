import {toFixed} from './text'

export const roundSafely = num => Math.round(num * 100) / 100

export const roundHalf = num => {
  const roundedNum = Number(toFixed(num, 1))
  const dif = roundedNum - Math.trunc(num)

  if (dif >= 0.25 && dif < 0.75) {
    return Math.trunc(num) + 0.5
  } else if (dif < 0.5) {
    return Math.trunc(num)
  } else {
    return Math.ceil(num)
  }
}

export const calcProductPrice = product =>
  ((parseInt(product.createdBy?.rate) || 0) +
    (parseInt(product.buyer?.rate) || 0) +
    (parseInt(product.supervisorRate) || 0)) *
  2

export const calcProductsPriceWithDelivery = (product, order) =>
  ((parseFloat(product.currentSupplier && product.currentSupplier.price) || 0) +
    (parseFloat(
      product.currentSupplier && product.currentSupplier.batchDeliveryCostInDollar / product.currentSupplier.amount,
    ) || 0)) *
  (parseInt(order.amount) || 0)

export const calcOrderTotalPrice = (supplier, goodsAmount) =>
  ((parseFloat(supplier?.price) || 0) + (parseFloat(supplier?.batchDeliveryCostInDollar / supplier.amount) || 0)) *
  (parseInt(goodsAmount) || 0)

export const calcExchangePrice = (price, rate) => toFixed((parseFloat(price) || 0) / (parseFloat(rate) || 0), 2)

export const calcExchangeDollarsInYuansPrice = (price, rate) =>
  toFixed((parseFloat(price) || 0) * (parseFloat(rate) || 0), 2)

export const calcPriceForItem = (fullPrice, amount) => (parseFloat(fullPrice) || 0) / (parseFloat(amount) || 0)

export const calcVolumeWeightForBox = (box, coefficient, isShipping) => {
  if (isShipping) {
    return roundSafely((box.deliveryLength * box.deliveryWidth * box.deliveryHeight * box.amount) / coefficient) || 0
  }

  if (box.lengthCmWarehouse || box.widthCmWarehouse || box.heightCmWarehouse) {
    return roundSafely((box.lengthCmWarehouse * box.widthCmWarehouse * box.heightCmWarehouse) / coefficient) || 0
  } else {
    return roundSafely((box.lengthCmSupplier * box.widthCmSupplier * box.heightCmSupplier) / coefficient) || 0
  }
}
export const calcFinalWeightForBox = (box, coefficient, isShipping) =>
  Math.max(
    parseFloat(calcVolumeWeightForBox(box, coefficient, isShipping)) || 0,
    parseFloat(
      isShipping
        ? box.deliveryMass * box.amount
        : box.weighGrossKgWarehouse
        ? box.weighGrossKgWarehouse * box.amount
        : box.weighGrossKgSupplier * box.amount,
    ) || 0,
  )

export const calcTotalFbaForProduct = product =>
  (parseFloat(product.fbafee) || 0) + (parseFloat(product.reffee) || 0) /* (parseFloat(product.amazon) || 0) * 0.15*/

export const calcMaxDeliveryForProduct = product =>
  product.express ? (product.weight || 0) * 7 : (product.weight || 0) * 5
// (product.weight || 0) * (product.currentSupplier.batchDeliveryCostInDollar / product.currentSupplier.amount)

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

export const calcTotalPriceForOrder = order =>
  ((parseFloat(order.product.currentSupplier?.price) || 0) +
    (parseFloat(order.product.currentSupplier?.delivery) || 0)) *
  (parseInt(order.amount) || 0)

export const calcTotalPriceForBatch = batch =>
  batch.boxes.reduce(
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

export const calcAmazonPriceForBox = box => box.items.reduce((acc, cur) => acc + cur.product.amazon * cur.amount, 0)

export const calcPriceForBox = box => {
  const sumsOfItems = box.items.reduce(
    (acc, cur) =>
      acc +
      (cur.order.orderSupplier.price +
        roundSafely(cur.order.orderSupplier.batchDeliveryCostInDollar / cur.order.orderSupplier.amount)) *
        cur.amount,
    0,
  )
  return box.amount > 1 ? sumsOfItems * box.amount : sumsOfItems
}

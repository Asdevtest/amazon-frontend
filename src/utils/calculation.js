import {toFixed, toFixedWithDollarSign} from './text'

export const calcProductPrice = product =>
  ((parseInt(product.createdBy?.rate) || 0) +
    (parseInt(product.buyer?.rate) || 0) +
    (parseInt(product.supervisorRate) || 0)) *
  2 // TODO: добавить рейт супервизора

export const calcProductsPriceWithDelivery = (product, order) =>
  ((parseFloat(product.currentSupplier && product.currentSupplier.price) || 0) +
    (parseFloat(product.currentSupplier && product.currentSupplier.delivery) || 0)) *
  (parseInt(order.amount) || 0)

export const calcExchangePrice = (price, rate) => toFixed((parseFloat(price) || 0) / (parseFloat(rate) || 0), 3)

export const calcExchangeDollarsInYuansPrice = (price, rate) =>
  toFixed((parseFloat(price) || 0) * (parseFloat(rate) || 0), 3)

export const calcPriceForItem = (fullPrice, amount) =>
  toFixedWithDollarSign((parseFloat(fullPrice) || 0) / (parseFloat(amount) || 0), 2)

export const calcFinalWeightForBox = box =>
  Math.max(
    parseFloat(box.volumeWeightKgWarehouse ? box.volumeWeightKgWarehouse : box.volumeWeightKgSupplier) || 0,
    parseFloat(box.weighGrossKgWarehouse ? box.weighGrossKgWarehouse : box.weighGrossKgSupplier) || 0,
  )

export const calcTotalFbaForProduct = product =>
  (parseFloat(product.fbafee) || 0) + (parseFloat(product.amazon) || 0) * 0.15

export const calcMaxDeliveryForProduct = product =>
  product.express ? (product.weight || 0) * 7 : (product.weight || 0) * 5

export function updateProductAutoCalculatedFields() {
  const strBsr = this.product.bsr + ''
  this.product.bsr = parseFloat(strBsr.replace(',', '')) || 0

  const strPrice = this.product.amazon + ''
  this.product.amazon = (strPrice.replace(',', '') === '0' ? '' : strPrice.replace(',', '')) || ''

  this.product.totalFba = calcTotalFbaForProduct(this.product)

  this.product.maxDelivery = calcMaxDeliveryForProduct(this.product)

  this.product.minpurchase =
    (parseFloat(this.product.amazon) || 0) -
    (parseFloat(this.product.totalFba) || 0) -
    0.4 * ((parseFloat(this.product.amazon) || 0) - (parseFloat(this.product.totalFba) || 0)) -
    (parseFloat(this.product.maxDelivery) || 0)

  if (this.product.currentSupplier && this.product.currentSupplier._id) {
    this.product.reffee = (parseFloat(this.product.amazon) || 0) * 0.15
    if (this.product.fbafee) {
      this.product.profit = (
        (parseFloat(this.product.amazon) || 0).toFixed(2) -
          (this.product.reffee || 0).toFixed(2) -
          (parseFloat(this.product.currentSupplier.delivery) || 0).toFixed(2) -
          (parseFloat(this.product.currentSupplier.price) || 0).toFixed(2) -
          (parseFloat(this.product.fbafee) || 0).toFixed(2) || 0
      ).toFixed(2)
    } else {
      this.product.profit = (
        (parseFloat(this.product.amazon) || 0).toFixed(2) -
          (this.product.reffee || 0).toFixed(2) -
          (parseFloat(this.product.currentSupplier.delivery) || 0).toFixed(2) -
          (parseFloat(this.product.currentSupplier.price) || 0).toFixed(2) || 0
      ).toFixed(2)
    }
    this.product.margin =
      (this.product.profit /
        ((parseFloat(this.product.currentSupplier.price) || 0) +
          (parseFloat(this.product.currentSupplier.delivery) || 0))) *
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
            (ac, cu) => ac + (cu.product.currentSupplier.price + cu.product.currentSupplier.delivery) * cu.amount,
            0,
          ) *
            cur.amount
        : acc +
          cur.items.reduce(
            (ac, cu) => ac + (cu.product.currentSupplier.price + cu.product.currentSupplier.delivery) * cu.amount,
            0,
          ),
    0,
  )

export const calcAmazonPriceForBox = box => box.items.reduce((acc, cur) => acc + cur.product.amazon * cur.amount, 0)

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

export function updateProductAutoCalculatedFields(inConstructor) {
  const strBsr = this.product.bsr + ''
  this.product.bsr = parseFloat(strBsr.replace(',', '')) || (inConstructor ? '' : 0)

  const strPrice = this.product.amazon + ''
  this.product.amazon = parseFloat(strPrice.replace(',', '')) || ''

  this.product.totalFba = (parseFloat(this.product.fbafee) || 0) + (parseFloat(this.product.amazon) || 0) * 0.15

  this.product.maxDelivery = this.product.express ? (this.product.weight || 0) * 7 : (this.product.weight || 0) * 5

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
      ).toFixed(4)
    } else {
      this.product.profit = (
        (parseFloat(this.product.amazon) || 0).toFixed(2) -
          (this.product.reffee || 0).toFixed(2) -
          (parseFloat(this.product.currentSupplier.delivery) || 0).toFixed(2) -
          (parseFloat(this.product.currentSupplier.price) || 0).toFixed(2) || 0
      ).toFixed(4)
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

import {toFixedWithDollarSign} from './text'

export const calcProductPrice = product =>
  ((parseInt(product.createdby?.rate) || 0) +
    (parseInt(product.buyer?.rate) || 0) +
    (parseInt(product.checkedby?.rate) || 0)) *
  2 // TODO: добавить рейт супервизора

export const calcProductsPriceWithDelivery = (product, order) =>
  ((parseFloat(product.currentSupplier && product.currentSupplier.price) || 0) +
    (parseFloat(product.currentSupplier && product.currentSupplier.delivery) || 0)) *
  (parseInt(order.amount) || 0)

export const calcExchangePrice = (price, rate) => (parseFloat(price) || 0) / (parseFloat(rate) || 0)

export const calcPriceForItem = (fullPrice, amount) =>
  toFixedWithDollarSign((parseFloat(fullPrice) || 0) / (parseFloat(amount) || 0), 2)

import {toFixed} from './text'

export const priceCalculation = (price, deliveryPrice, qty) =>
  toFixed(((parseFloat(price) || 0) + (parseFloat(deliveryPrice) || 0)) * (parseInt(qty) || 0), 2)

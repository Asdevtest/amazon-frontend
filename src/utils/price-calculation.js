import {toFixed} from './text'

export const priceCalculation = (price, deliveryPrice, qty) => toFixed((price + deliveryPrice) * qty, 2)

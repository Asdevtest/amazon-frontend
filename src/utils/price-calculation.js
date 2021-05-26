export const priceCalculation = (price, deliveryPrice, qty) => ((price + deliveryPrice) * qty).toFixed(2)

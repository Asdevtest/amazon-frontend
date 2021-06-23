export const filterEmptyBoxes = boxes =>
  boxes.filter(box => box.items.reduce((acc, order) => acc + order.amount, 0) !== 0)

export const filterEmptyOrders = boxes =>
  boxes.map(box => ({
    ...box,
    items: box.items.filter(order => order.amount !== 0),
  }))

export const filterEmptyBoxes = boxes =>
  Array.isArray(boxes) ? boxes.filter(box => box?.items?.reduce((acc, order) => acc + order.amount, 0) !== 0) : null

export const filterEmptyOrders = boxes =>
  Array.isArray(boxes)
    ? boxes.map(box => ({
        ...box,
        items: box.items.filter(order => order.amount !== 0),
      }))
    : null

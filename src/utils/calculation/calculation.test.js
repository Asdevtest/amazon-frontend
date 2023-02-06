import {roundSafely, roundHalf, calcProductsPriceWithDelivery, calcOrderTotalPrice} from './calculation'

describe('Test roundSafely(num)', () => {
  const validTestValue = [
    {enter: 10.666, expect: 10.67},
    {enter: 10.888, expect: 10.89},
  ]

  const unvalidTestValue = [
    {enter: '10.6', expect: 10.6},
    {enter: '10.8', expect: 10.8},
  ]

  validTestValue.forEach(value => {
    const res = roundSafely(value.enter)

    test('Valid props', () => {
      expect(res).toBe(value.expect)
      expect(typeof res).toBe('number')
    })
  })

  unvalidTestValue.forEach(value => {
    const res = roundSafely(value.enter)

    test('Unvalid props', () => {
      expect(roundSafely(value.enter)).toBe(value.expect)
      expect(typeof res).toBe('number')
    })
  })
})

describe('Test roundHalf(num)', () => {
  const validTestValue = [
    {enter: 10.6, expect: 10.5},
    {enter: 10.8, expect: 11},
  ]

  const unvalidTestValue = [
    {enter: '10.6', expect: 10.5},
    {enter: '10.8', expect: 11},
  ]

  validTestValue.forEach(value => {
    const res = roundHalf(value.enter)

    test('Valid props', () => {
      expect(roundHalf(value.enter)).toBe(value.expect)
      expect(typeof res).toBe('number')
    })
  })

  unvalidTestValue.forEach(value => {
    const res = roundHalf(value.enter)

    test('Unvalid props', () => {
      expect(roundHalf(value.enter)).toBe(value.expect)
      expect(typeof res).toBe('number')
    })
  })
})

describe('Test calcProductsPriceWithDelivery(product, order)', () => {
  const validProductMock = {currentSupplier: {price: 7, batchDeliveryCostInDollar: 75, amount: 10}}
  const validOrderMock = {amount: 100}

  const unvalidProductMock = {currentSupplier: null}
  const unvalidOrderMock = {amount: 100}

  test('Valid props', () => {
    const res = calcProductsPriceWithDelivery(validProductMock, validOrderMock)

    expect(res).toBe(1450)
    expect(typeof res).toBe('number')
  })

  test('Unvalid props', () => {
    const res = calcProductsPriceWithDelivery(unvalidProductMock, unvalidOrderMock)

    expect(res).toBe(0)
    expect(typeof res).toBe('number')
  })
})

describe('Test calcOrderTotalPrice(supplier, goodsAmount)', () => {
  const validSupplierMock = {price: 7, batchDeliveryCostInDollar: 75, amount: 10}
  const validGoodsAmount = 100

  const unvalidSupplierMock = {price: '', batchDeliveryCostInDollar: '', amount: 10}
  const unvalidGoodsAmount = 100

  test('Valid props', () => {
    const res = calcOrderTotalPrice(validSupplierMock, validGoodsAmount)

    expect(res).toBe(1450)
    expect(typeof res).toBe('number')
  })

  test('Unvalid props', () => {
    const res = calcOrderTotalPrice(unvalidSupplierMock, unvalidGoodsAmount)

    expect(res).toBe(0)
    expect(typeof res).toBe('number')
  })
})

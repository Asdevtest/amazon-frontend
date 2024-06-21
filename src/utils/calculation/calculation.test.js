import {
  // getBatchWeightCalculationMethodForBatch,
  calcActualBatchWeight,
  calcExchangeDollarsInYuansPrice,
  calcExchangePrice,
  calcFinalWeightForBatchByMoreTotalWeight,
  calcFinalWeightForBox,
  calcFinalWeightForBoxByMoreActualWeight,
  calcFinalWeightForBoxWithoutAmount,
  calcMaxDeliveryForProduct,
  calcOrderTotalPrice,
  calcOrderTotalPriceInYuann,
  calcPriceForBox,
  calcPriceForItem,
  calcProductsPriceWithDelivery,
  calcSupplierPriceForUnit,
  calcTotalFbaForProduct,
  calcTotalPriceForBatch,
  calcVolumeBatchWeight,
  calcVolumeWeightForBox,
  calcVolumeWeightForBoxWithoutAmount,
  calculateDeliveryCostPerPcs,
  checkActualBatchWeightGreaterVolumeBatchWeight,
  getTariffRateForBoxOrOrder,
  priceCalculation,
  roundHalf,
  roundSafely,
} from './calculation'

describe('Test roundSafely(num)', () => {
  const validTestValue = [
    { enter: 10.666, expect: 10.67 },
    { enter: 10.888, expect: 10.89 },
  ]

  const unvalidTestValue = [
    { enter: '10.6', expect: 10.6 },
    { enter: '10.8', expect: 10.8 },
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
    { enter: 10.6, expect: 10.5 },
    { enter: 10.8, expect: 11 },
  ]

  const unvalidTestValue = [
    { enter: '10.6', expect: 10.5 },
    { enter: '10.8', expect: 11 },
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
  const validProductMock = { currentSupplier: { price: 7, batchDeliveryCostInDollar: 75, amount: 10 } }
  const validOrderMock = { amount: 100 }

  const unvalidProductMock = { currentSupplier: null }
  const unvalidOrderMock = { amount: 100 }

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
  const validSupplierMock = { price: 7, batchDeliveryCostInDollar: 75, amount: 10 }
  const validGoodsAmount = 100

  const unvalidSupplierMock = { price: '', batchDeliveryCostInDollar: '', amount: 10 }
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

describe('Test calcOrderTotalPriceInYuann(supplier, goodsAmount)', () => {
  const validSupplierMock = { price: 7, batchDeliveryCostInYuan: 75, amount: 10 }
  const validGoodsAmount = 100

  const unvalidSupplierMock = { price: '', batchDeliveryCostInYuan: '', amount: 10 }
  const unvalidGoodsAmount = 100

  test('Valid props', () => {
    const res = calcOrderTotalPriceInYuann(validSupplierMock, validGoodsAmount)

    expect(res).toBe(750)
    expect(typeof res).toBe('number')
  })

  test('Unvalid props', () => {
    const res = calcOrderTotalPriceInYuann(unvalidSupplierMock, unvalidGoodsAmount)

    expect(res).toBe(0)
    expect(typeof res).toBe('number')
  })
})

describe('Test calcExchangePrice(price, rate)', () => {
  const validPriceMock = 7
  const validRate = 6.8

  const unvalidPriceMock = ''
  const unvalidRate = ''

  test('Valid props', () => {
    const res = calcExchangePrice(validPriceMock, validRate)

    expect(res).toBe('1.03')
    expect(typeof res).toBe('string')
  })

  test('Unvalid props', () => {
    const res = calcExchangePrice(unvalidPriceMock, unvalidRate)

    expect(res).toBe(0)
    expect(typeof res).toBe('number')
  })
})

describe('Test calcExchangeDollarsInYuansPrice(price, rate)', () => {
  const validPriceMock = 7
  const validRate = 6.8

  const unvalidPriceMock = ''
  const unvalidRate = ''

  test('Valid props', () => {
    const res = calcExchangeDollarsInYuansPrice(validPriceMock, validRate)

    expect(res).toBe('47.60')
    expect(typeof res).toBe('string')
  })

  test('Unvalid props', () => {
    const res = calcExchangeDollarsInYuansPrice(unvalidPriceMock, unvalidRate)

    expect(res).toBe(0)
    expect(typeof res).toBe('number')
  })
})

describe('Test calcPriceForItem(fullPrice, amount)', () => {
  const validPriceMock = 7
  const validAmount = 100

  const unvalidPriceMock = ''
  const unvalidAmount = ''

  test('Valid props', () => {
    const res = calcPriceForItem(validPriceMock, validAmount)

    expect(res).toBe(0.07)
    expect(typeof res).toBe('number')
  })

  test('Unvalid props', () => {
    const res = calcPriceForItem(unvalidPriceMock, unvalidAmount)

    expect(res).toBe(0)
    expect(typeof res).toBe('number')
  })
})

describe('Test calcVolumeWeightForBox(box, coefficient)', () => {
  const validBoxMock = {
    lengthCmWarehouse: 1,
    widthCmWarehouse: 2,
    heightCmWarehouse: 3,
    lengthCmSupplier: 1,
    widthCmSupplier: 2,
    heightCmSupplier: 3,
  }
  const validCoefficient = 5000

  const unvalidBoxMock = {
    lengthCmWarehouse: 0,
    widthCmWarehouse: 2,
    heightCmWarehouse: 3,
    lengthCmSupplier: 1,
    widthCmSupplier: 2,
    heightCmSupplier: 3,
  }
  const unvalidCoefficient = 5000

  test('Valid props', () => {
    const res = calcVolumeWeightForBox(validBoxMock, validCoefficient)

    expect(res).toBe(0.0012)
    expect(typeof res).toBe('number')
  })

  test('Unvalid props', () => {
    const res = calcVolumeWeightForBox(unvalidBoxMock, unvalidCoefficient)

    expect(res).toBe(0)
    expect(typeof res).toBe('number')
  })
})

describe('Test getTariffRateForBoxOrOrder(box)', () => {
  const validBoxMock = {
    destination: {
      zipCode: '33570',
    },
    logicsTariff: {
      conditionsByRegion: {
        west: {
          rate: 1.49,
        },
        central: {
          rate: 1.52,
        },
        east: {
          rate: 1.52,
        },
      },
    },
  }

  const unvalidBoxMock = null

  test('Valid props', () => {
    const res = getTariffRateForBoxOrOrder(validBoxMock)

    expect(res).toBe(1.52)
    expect(typeof res).toBe('number')
  })

  test('Unvalid props', () => {
    const res = getTariffRateForBoxOrOrder(unvalidBoxMock)

    expect(res).toBe(0)
    expect(typeof res).toBe('number')
  })
})

describe('Test calcFinalWeightForBox(box, coefficient)', () => {
  const validBoxMock = {
    lengthCmWarehouse: 1,
    widthCmWarehouse: 2,
    heightCmWarehouse: 3,
    lengthCmSupplier: 1,
    widthCmSupplier: 2,
    heightCmSupplier: 3,
  }
  const validCoefficient = 5000

  const unvalidBoxMock = {
    lengthCmWarehouse: 0,
    widthCmWarehouse: 2,
    heightCmWarehouse: 3,
    lengthCmSupplier: 1,
    widthCmSupplier: 2,
    heightCmSupplier: 3,
  }
  const unvalidCoefficient = 5000

  test('Valid props', () => {
    const res = calcFinalWeightForBox(validBoxMock, validCoefficient)

    expect(res).toBe(0.0012)
    expect(typeof res).toBe('number')
  })

  test('Unvalid props', () => {
    const res = calcFinalWeightForBox(unvalidBoxMock, unvalidCoefficient)

    expect(res).toBe(0)
    expect(typeof res).toBe('number')
  })
})

// describe('Test getBatchWeightCalculationMethodForBatch(batch)', () => {
//   const validBatch = {
//     boxes: [
//       {
//         amount: 5,
//         lengthCmSupplier: 0,
//         widthCmSupplier: 0,
//         heightCmSupplier: 0,
//         weighGrossKgSupplier: 0,
//         lengthCmWarehouse: 80,
//         widthCmWarehouse: 15.8,
//         heightCmWarehouse: 88,
//         weighGrossKgWarehouse: 16,
//         deliveryTotalPrice: 477.41,
//         deliveryTotalPriceChanged: 477.41,
//         destination: {
//           _id: '1206a877-15c6-4b55-9b49-883c71afdccd',
//           name: 'TPA1',
//           country: 'USA',
//           zipCode: '33570',
//           state: 'Florida',
//           city: 'Ruskin',
//           address: '351 30th Street NE, Hillsborough County',
//         },
//         logicsTariff: {
//           name: 'для удаления 2.0',
//           description: 'для удаления 2.0',
//           deliveryTimeInDay: '12',
//           minWeightInKg: 12,
//           archive: false,
//           conditionsByRegion: {
//             west: {
//               rate: 5.15,
//             },
//             central: {
//               rate: 5.15,
//             },
//             east: {
//               rate: 5.15,
//             },
//             yuanToDollarRate: 6.8,
//           },
//         },
//       },
//       {
//         amount: 1,
//         isActual: true,
//         isDraft: false,
//         lengthCmSupplier: 0,
//         widthCmSupplier: 0,
//         heightCmSupplier: 0,
//         isFormed: false,
//         weighGrossKgSupplier: 0,
//         lengthCmWarehouse: 50,
//         widthCmWarehouse: 32,
//         heightCmWarehouse: 12,
//         weighGrossKgWarehouse: 20,
//         deliveryTotalPrice: 103,
//         deliveryTotalPriceChanged: 103,

//         destination: {
//           _id: '1206a877-15c6-4b55-9b49-883c71afdccd',
//           name: 'TPA1',
//           country: 'USA',
//           zipCode: '33570',
//           state: 'Florida',
//           city: 'Ruskin',
//           address: '351 30th Street NE, Hillsborough County',
//         },
//         logicsTariff: {
//           name: 'для удаления 2.0',
//           description: 'для удаления 2.0',
//           deliveryTimeInDay: '12',
//           minWeightInKg: 12,
//           archive: false,
//           conditionsByRegion: {
//             west: {
//               rate: 5.15,
//             },
//             central: {
//               rate: 5.15,
//             },
//             east: {
//               rate: 5.15,
//             },
//             yuanToDollarRate: 6.8,
//           },
//         },
//       },
//     ],
//     volumeWeightDivide: 5000,
//   }

//   const unvalidBatch = null

//   test('Valid props', () => {
//     const res = getBatchWeightCalculationMethodForBatch(validBatch)

//     expect(res).toBe(0.0012)
//     expect(typeof res).toBe('number')
//   })

//   test('Unvalid props', () => {
//     const res = getBatchWeightCalculationMethodForBatch(unvalidBatch)

//     expect(res).toBe(null)
//   })
// })

describe('Test calcActualBatchWeight(boxes)', () => {
  const validBoxMock = [
    {
      weighGrossKgWarehouse: 1,
      weighGrossKgSupplier: 2,
      amount: 100,
    },
    {
      weighGrossKgWarehouse: 0,
      weighGrossKgSupplier: 2,
      amount: 100,
    },
  ]
  const unvalidBoxMock = null

  test('Valid props', () => {
    const res = calcActualBatchWeight(validBoxMock)

    expect(res).toBe(102)
    expect(typeof res).toBe('number')
  })

  test('Unvalid props', () => {
    const res = calcActualBatchWeight(unvalidBoxMock)

    expect(res).toBe(null)
  })
})

describe('Test calcVolumeBatchWeight(boxes, coefficient)', () => {
  const validBoxes = [
    {
      lengthCmWarehouse: 1,
      widthCmWarehouse: 2,
      heightCmWarehouse: 3,
      lengthCmSupplier: 1,
      widthCmSupplier: 2,
      heightCmSupplier: 3,
      amount: 100,
    },
    {
      lengthCmWarehouse: 1,
      widthCmWarehouse: 2,
      heightCmWarehouse: 3,
      lengthCmSupplier: 1,
      widthCmSupplier: 2,
      heightCmSupplier: 3,
      amount: 100,
    },
  ]

  const validCoefficient = 5000

  const unvalidBoxes = null

  const unvalidCoefficient = 5000

  test('Valid props', () => {
    const res = calcVolumeBatchWeight(validBoxes, validCoefficient)

    expect(res).toBe(0.24)
    expect(typeof res).toBe('number')
  })

  test('Unvalid props', () => {
    const res = calcVolumeBatchWeight(unvalidBoxes, unvalidCoefficient)

    expect(res).toBe(null)
  })
})

describe('Test calcFinalWeightForBatchByMoreTotalWeight(boxes, coefficient)', () => {
  const validBoxes = [
    {
      lengthCmWarehouse: 1,
      widthCmWarehouse: 2,
      heightCmWarehouse: 3,
      lengthCmSupplier: 1,
      widthCmSupplier: 2,
      heightCmSupplier: 3,
      weighGrossKgWarehouse: 1,
      weighGrossKgSupplier: 2,
      amount: 100,
    },
    {
      lengthCmWarehouse: 1,
      widthCmWarehouse: 2,
      heightCmWarehouse: 3,
      lengthCmSupplier: 1,
      widthCmSupplier: 2,
      heightCmSupplier: 3,
      weighGrossKgWarehouse: 1,
      weighGrossKgSupplier: 2,
      amount: 100,
    },
  ]

  const validCoefficient = 5000

  const unvalidBoxes = null

  const unvalidCoefficient = 5000

  test('Valid props', () => {
    const res = calcFinalWeightForBatchByMoreTotalWeight(validBoxes, validCoefficient)

    expect(res).toBe(200)
    expect(typeof res).toBe('number')
  })

  test('Unvalid props', () => {
    const res = calcFinalWeightForBatchByMoreTotalWeight(unvalidBoxes, unvalidCoefficient)

    expect(res).toBe(null)
  })
})

describe('Test calcFinalWeightForBoxByMoreActualWeight(box)', () => {
  const validBox = {
    lengthCmWarehouse: 1,
    widthCmWarehouse: 2,
    heightCmWarehouse: 3,
    lengthCmSupplier: 1,
    widthCmSupplier: 2,
    heightCmSupplier: 3,
    weighGrossKgWarehouse: 1,
    weighGrossKgSupplier: 2,
    amount: 100,
  }

  const unvalidBox = null

  test('Valid props', () => {
    const res = calcFinalWeightForBoxByMoreActualWeight(validBox)

    expect(res).toBe(1)
    expect(typeof res).toBe('number')
  })

  test('Unvalid props', () => {
    const res = calcFinalWeightForBoxByMoreActualWeight(unvalidBox)

    expect(res).toBe(null)
  })
})

describe('Test calcFinalWeightForBoxWithoutAmount(box)', () => {
  const validBox = {
    lengthCmWarehouse: 1,
    widthCmWarehouse: 2,
    heightCmWarehouse: 3,
    lengthCmSupplier: 1,
    widthCmSupplier: 2,
    heightCmSupplier: 3,
    weighGrossKgWarehouse: 1,
    weighGrossKgSupplier: 2,
    amount: 100,
  }

  const validCoefficient = 5000

  const unvalidBox = null

  test('Valid props', () => {
    const res = calcFinalWeightForBoxWithoutAmount(validBox, validCoefficient)

    expect(res).toBe(1)
    expect(typeof res).toBe('number')
  })

  test('Unvalid props', () => {
    const res = calcFinalWeightForBoxWithoutAmount(unvalidBox)

    expect(res).toBe(null)
  })
})

describe('Test checkActualBatchWeightGreaterVolumeBatchWeight(boxes, coefficient)', () => {
  const validBoxes = [
    {
      lengthCmWarehouse: 1,
      widthCmWarehouse: 2,
      heightCmWarehouse: 3,
      lengthCmSupplier: 1,
      widthCmSupplier: 2,
      heightCmSupplier: 3,
      weighGrossKgWarehouse: 1,
      weighGrossKgSupplier: 2,
      amount: 100,
    },
    {
      lengthCmWarehouse: 1,
      widthCmWarehouse: 2,
      heightCmWarehouse: 3,
      lengthCmSupplier: 1,
      widthCmSupplier: 2,
      heightCmSupplier: 3,
      weighGrossKgWarehouse: 1,
      weighGrossKgSupplier: 2,
      amount: 100,
    },
  ]

  const validCoefficient = 5000

  const unvalidBoxes = null

  const unvalidCoefficient = 5000

  test('Valid props', () => {
    const res = checkActualBatchWeightGreaterVolumeBatchWeight(validBoxes, validCoefficient)

    expect(res).toBe(true)
  })

  test('Unvalid props', () => {
    const res = checkActualBatchWeightGreaterVolumeBatchWeight(unvalidBoxes, unvalidCoefficient)

    expect(res).toBe(null)
  })
})

describe('Test calcVolumeWeightForBoxWithoutAmount(box, coefficient)', () => {
  const validBox = {
    lengthCmWarehouse: 1,
    widthCmWarehouse: 2,
    heightCmWarehouse: 3,
    lengthCmSupplier: 1,
    widthCmSupplier: 2,
    heightCmSupplier: 3,
    weighGrossKgWarehouse: 1,
    weighGrossKgSupplier: 2,
    amount: 100,
  }

  const validCoefficient = 5000

  const unvalidBox = null

  test('Valid props', () => {
    const res = calcVolumeWeightForBoxWithoutAmount(validBox, validCoefficient)

    expect(res).toBe(0.0012)
    expect(typeof res).toBe('number')
  })

  test('Unvalid props', () => {
    const res = calcVolumeWeightForBoxWithoutAmount(unvalidBox)

    expect(res).toBe(null)
  })
})

describe('Test calcTotalFbaForProduct(product)', () => {
  const validProduct = {
    fbafee: 1,
    reffee: 2,
  }

  const unvalidProduct = null

  test('Valid props', () => {
    const res = calcTotalFbaForProduct(validProduct)

    expect(res).toBe(3)
    expect(typeof res).toBe('number')
  })

  test('Unvalid props', () => {
    const res = calcTotalFbaForProduct(unvalidProduct)

    expect(res).toBe(null)
  })
})

describe('Test calcMaxDeliveryForProduct(product)', () => {
  const validProduct = {
    express: false,
    weight: 2,
  }

  const unvalidProduct = null

  test('Valid props', () => {
    const res = calcMaxDeliveryForProduct(validProduct)

    expect(res).toBe(10)
    expect(typeof res).toBe('number')
  })

  test('Unvalid props', () => {
    const res = calcMaxDeliveryForProduct(unvalidProduct)

    expect(res).toBe(null)
  })
})

describe('Test calcTotalPriceForBatch(batch)', () => {
  const validBatch = {
    boxes: [
      {
        amount: 5,
        items: [
          {
            amount: 10,

            product: {
              currentSupplier: {
                price: 7,
                batchDeliveryCostInDollar: 70,
                amount: 100,
              },
            },
          },
        ],
      },
      {
        amount: 1,
        items: [
          {
            amount: 10,

            product: {
              currentSupplier: {
                price: 7,
                batchDeliveryCostInDollar: 70,
                amount: 100,
              },
            },
          },
        ],
      },
    ],
  }

  const unvalidBatch = null

  test('Valid props', () => {
    const res = calcTotalPriceForBatch(validBatch)

    expect(res).toBe(462)
    expect(typeof res).toBe('number')
  })

  test('Unvalid props', () => {
    const res = calcTotalPriceForBatch(unvalidBatch)

    expect(res).toBe(null)
  })
})

describe('Test calcSupplierPriceForUnit(supplier)', () => {
  const validSupplierMock = { price: 7, batchDeliveryCostInDollar: 75, amount: 10 }

  const unvalidSupplierMock = { price: '', batchDeliveryCostInDollar: '', amount: 10 }

  test('Valid props', () => {
    const res = calcSupplierPriceForUnit(validSupplierMock)

    expect(res).toBe(14.5)
    expect(typeof res).toBe('number')
  })

  test('Unvalid props', () => {
    const res = calcSupplierPriceForUnit(unvalidSupplierMock)

    expect(res).toBe(0)
    expect(typeof res).toBe('number')
  })
})

describe('Test calcPriceForBox(box)', () => {
  const validBox = {
    amount: 5,
    items: [
      {
        amount: 10,

        order: {
          orderSupplier: {
            price: 7,
            batchDeliveryCostInDollar: 70,
            amount: 100,
          },
        },
      },
    ],
  }

  const unvalidBox = null

  test('Valid props', () => {
    const res = calcPriceForBox(validBox)

    expect(res).toBe(385)
    expect(typeof res).toBe('number')
  })

  test('Unvalid props', () => {
    const res = calcPriceForBox(unvalidBox)

    expect(res).toBe(null)
  })
})

describe(`Test calculateDeliveryCostPerPcs({
  itemSupplierBoxWeightGrossKg,
  deliveryCost,
  itemAmount,
  itemSupplierAmountInBox,
  boxFinalWeight,
  box,
})`, () => {
  const validBox = {
    amount: 5,
    items: [
      {
        amount: 10,

        order: {
          orderSupplier: {
            price: 7,
            batchDeliveryCostInDollar: 70,
            amount: 100,
          },
        },
      },
    ],
  }

  const boxFinalWeight = 10

  const itemSupplierAmountInBox = 100

  const itemAmount = 15

  const deliveryCost = 40

  const itemSupplierBoxWeightGrossKg = 5

  const unvalidBox = null

  test('Valid props', () => {
    const res = calculateDeliveryCostPerPcs({
      itemSupplierBoxWeightGrossKg,
      deliveryCost,
      itemAmount,
      itemSupplierAmountInBox,
      boxFinalWeight,
      box: validBox,
    })

    expect(res).toBe(0.5333333333333333)
    expect(typeof res).toBe('number')
  })

  test('Unvalid props', () => {
    const res = calculateDeliveryCostPerPcs({
      itemSupplierBoxWeightGrossKg,
      deliveryCost,
      itemAmount,
      itemSupplierAmountInBox,
      boxFinalWeight,
      box: unvalidBox,
    })

    expect(res).toBe(null)
  })
})

describe('Test priceCalculation(price, deliveryPrice, qty)', () => {
  const validPriceMock = 7
  const validDeliveryPrice = 1
  const validQty = 10

  const unvalidPriceMock = ''
  const unvalidDeliveryPrice = ''
  const unvalidQty = 10

  test('Valid props', () => {
    const res = priceCalculation(validPriceMock, validDeliveryPrice, validQty)

    expect(res).toBe('80.00')
    expect(typeof res).toBe('string')
  })

  test('Unvalid props', () => {
    const res = priceCalculation(unvalidPriceMock, unvalidDeliveryPrice, unvalidQty)

    expect(res).toBe(0)
    expect(typeof res).toBe('number')
  })
})

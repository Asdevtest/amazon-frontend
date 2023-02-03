/* eslint-disable no-unused-vars */
import {
  checkIsAdmin,
  checkIsBuyer,
  checkIsClient,
  checkIsResearcher,
  checkIsStorekeeper,
  checkIsSupervisor,
  isNotNull,
  isNotUndefined,
  isNull,
  isUndefined,
} from '@utils/checks'

// describe('Test isNotUndefined(value)', () => {
//   const validTestValue = [
//     {enter: 'String', expect: true},
//     {enter: 1, expect: true},
//     {enter: true, expect: true},
//     {enter: '', expect: true},
//     {enter: 0, expect: true},
//     {enter: null, expect: true},
//   ]

//   const unvalidTestValue = [{enter: undefined, expect: false}]

//   validTestValue.forEach(value => {
//     test('Valid props', () => {
//       expect(isNotUndefined(value.enter)).toBe(value.expect)
//     })
//   })

//   unvalidTestValue.forEach(value => {
//     test('Unvalid props', () => {
//       expect(isNotUndefined(value.enter)).toBe(value.expect)
//     })
//   })
// })

// describe('Test isUndefined(value)', () => {
//   const validTestValue = [{enter: undefined, expect: true}]

//   const unvalidTestValue = [
//     {enter: 'String', expect: false},
//     {enter: 1, expect: false},
//     {enter: true, expect: false},
//     {enter: '', expect: false},
//     {enter: 0, expect: false},
//     {enter: null, expect: false},
//   ]

//   validTestValue.forEach(value => {
//     test('Valid props', () => {
//       expect(isUndefined(value.enter)).toBe(value.expect)
//     })
//   })

//   unvalidTestValue.forEach(value => {
//     test('Unvalid props', () => {
//       expect(isUndefined(value.enter)).toBe(value.expect)
//     })
//   })
// })

// describe('Test isNull(value)', () => {
//   const validTestValue = [{enter: null, expect: true}]

//   const unvalidTestValue = [
//     {enter: 'String', expect: false},
//     {enter: 1, expect: false},
//     {enter: true, expect: false},
//     {enter: '', expect: false},
//     {enter: 0, expect: false},
//     {enter: undefined, expect: false},
//   ]

//   validTestValue.forEach(value => {
//     test('Valid props', () => {
//       expect(isNull(value.enter)).toBe(value.expect)
//     })
//   })

//   unvalidTestValue.forEach(value => {
//     test('Unvalid props', () => {
//       expect(isNull(value.enter)).toBe(value.expect)
//     })
//   })
// })

// describe('Test isNotNull(value)', () => {
//   const validTestValue = [
//     {enter: 'String', expect: true},
//     {enter: 1, expect: true},
//     {enter: true, expect: true},
//     {enter: '', expect: true},
//     {enter: 0, expect: true},
//     {enter: undefined, expect: true},
//   ]

//   const unvalidTestValue = [{enter: null, expect: false}]

//   validTestValue.forEach(value => {
//     test('Valid props', () => {
//       expect(isNotNull(value.enter)).toBe(value.expect)
//     })
//   })

//   unvalidTestValue.forEach(value => {
//     test('Unvalid props', () => {
//       expect(isNotNull(value.enter)).toBe(value.expect)
//     })
//   })
// })

// describe('Test checkIsResearcher(userRole)', () => {
//   const validTestValue = [{enter: 'RESEARCHER', expect: true}]

//   const unvalidTestValue = [
//     {enter: 'researcher', expect: false},
//     {enter: 1, expect: false},
//     {enter: true, expect: false},
//     {enter: '', expect: false},
//     {enter: 0, expect: false},
//     {enter: undefined, expect: false},
//   ]

//   validTestValue.forEach(value => {
//     test('Valid props', () => {
//       expect(checkIsResearcher(value.enter)).toBe(value.expect)
//     })
//   })

//   unvalidTestValue.forEach(value => {
//     test('Unvalid props', () => {
//       expect(checkIsResearcher(value.enter)).toBe(value.expect)
//     })
//   })
// })

// describe('Test checkIsSupervisor(userRole)', () => {
//   const validTestValue = [{enter: 'SUPERVISOR', expect: true}]

//   const unvalidTestValue = [
//     {enter: 'supervisor', expect: false},
//     {enter: 1, expect: false},
//     {enter: true, expect: false},
//     {enter: '', expect: false},
//     {enter: 0, expect: false},
//     {enter: undefined, expect: false},
//   ]

//   validTestValue.forEach(value => {
//     test('Valid props', () => {
//       expect(checkIsSupervisor(value.enter)).toBe(value.expect)
//     })
//   })

//   unvalidTestValue.forEach(value => {
//     test('Unvalid props', () => {
//       expect(checkIsSupervisor(value.enter)).toBe(value.expect)
//     })
//   })
// })

describe('Test checkIsBuyer(userRole)', () => {
  const validTestValue = [{enter: 'BUYER', expect: true}]

  const unvalidTestValue = [
    {enter: 'buyer', expect: false},
    {enter: 1, expect: false},
    {enter: true, expect: false},
    {enter: '', expect: false},
    {enter: 0, expect: false},
    {enter: undefined, expect: false},
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(checkIsBuyer(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(checkIsBuyer(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test checkIsClient(userRole)', () => {
  const validTestValue = [{enter: 'CLIENT', expect: true}]

  const unvalidTestValue = [
    {enter: 'client', expect: false},
    {enter: 1, expect: false},
    {enter: true, expect: false},
    {enter: '', expect: false},
    {enter: 0, expect: false},
    {enter: undefined, expect: false},
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(checkIsClient(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(checkIsClient(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test checkIsAdmin(userRole)', () => {
  const validTestValue = [{enter: 'ADMIN', expect: true}]

  const unvalidTestValue = [
    {enter: 'admin', expect: false},
    {enter: 1, expect: false},
    {enter: true, expect: false},
    {enter: '', expect: false},
    {enter: 0, expect: false},
    {enter: undefined, expect: false},
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(checkIsAdmin(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(checkIsAdmin(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test checkIsStorekeeper(userRole)', () => {
  const validTestValue = [{enter: 'STOREKEEPER', expect: true}]

  const unvalidTestValue = [
    {enter: 'storekeeper', expect: false},
    {enter: 1, expect: false},
    {enter: true, expect: false},
    {enter: '', expect: false},
    {enter: 0, expect: false},
    {enter: undefined, expect: false},
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(checkIsStorekeeper(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(checkIsStorekeeper(value.enter)).toBe(value.expect)
    })
  })
})

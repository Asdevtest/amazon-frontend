/* eslint-disable no-unused-vars */
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import {
  checkAndMakeAbsoluteUrl,
  clearEverythingExceptNumbers,
  clearSpecialCharacters,
  getFloatOrZero,
  getFullTariffTextForBoxOrOrder,
  getModelNameWithotPostfix,
  getShortenStringIfLongerThanCount,
  minsToTime,
  shortAsin,
  shortSku,
  shortenDocumentString,
  timeToDeadlineInHoursAndMins,
  toFixed,
  toFixedWithCm,
  toFixedWithDollarSign,
  toFixedWithKg,
  toFixedWithYuanSign,
  trimBarcode,
  withAmount,
  withCm,
  withDollarSign,
  withKg,
  withText,
  withYuanSign,
} from './text'

describe('Test getShortenStringIfLongerThanCount(str, count, showEnd)', () => {
  const validTestValue = [
    { enter: 'Static text', count: 1, showEnd: true, expect: 'S...ext' },
    { enter: 'Static', count: 1, expect: 'S...' },
    { enter: 'Static', expect: 'Static' },
  ]

  const unvalidTestValue = [
    { enter: 'Static', count: 100, expect: 'Static' },
    { enter: '', expect: '' },
    { enter: null, expect: null },
    { enter: undefined, expect: undefined },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(getShortenStringIfLongerThanCount(value.enter, value.count, value.showEnd)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(getShortenStringIfLongerThanCount(value.enter, value.count, value.showEnd)).toBe(value.expect)
    })
  })
})

describe('Test getModelNameWithotPostfix(modelName)', () => {
  const validTestValue = [
    { enter: 'Static text', expect: ' text' },
    { enter: ' Static', expect: ' ' },
    { enter: 'Static', expect: '' },
  ]

  const unvalidTestValue = [{ enter: 100 }, { enter: true }, { enter: undefined }]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(getModelNameWithotPostfix(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(getModelNameWithotPostfix(value.enter)).toBeNull()
    })
  })
})

describe('Test trimBarcode(value)', () => {
  const validTestValue = [
    { enter: 'Some long message', expect: ' message' },
    { enter: '123456789', expect: '23456789' },
  ]

  const unvalidTestValue = [
    { enter: '', expect: '' },
    { enter: 123456789, expect: 123456789 },
    { enter: null, expect: null },
    { enter: undefined, expect: undefined },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(trimBarcode(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(trimBarcode(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test toFixed(int, x)', () => {
  const validTestValue = [
    { enter: 10, x: 1, expect: '10.0' },
    { enter: 20.456798, x: 1, expect: '20.5' },
    { enter: 1.456123, x: 4, expect: '1.4561' },
  ]

  const unvalidTestValue = [
    { enter: '10', x: 1, expect: '10' },
    { enter: null, x: 1, expect: null },
    { enter: undefined, x: 4, expect: undefined },
    { enter: false, x: 4, expect: false },
    { enter: 10, x: undefined, expect: '10' },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(toFixed(value.enter, value.x)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(toFixed(value.enter, value.x)).toBe(value.expect)
    })
  })
})

describe('Test getFloatOrZero(str)', () => {
  const validTestValue = [
    { enter: '10', expect: 10 },
    { enter: '33', expect: 33 },
    { enter: '110.1', expect: 110.1 },
  ]

  const unvalidTestValue = [
    { enter: 10, expect: 10 },
    { enter: null, expect: 0 },
    { enter: undefined, expect: 0 },
    { enter: false, expect: 0 },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(getFloatOrZero(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(getFloatOrZero(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test toFixedWithDollarSign(int, x)', () => {
  const validTestValue = [
    { enter: 10, x: 1, expect: '$10.0' },
    { enter: 10.123, x: 2, expect: '$10.12' },
    { enter: 10.15, x: 1, expect: '$10.2' },
  ]

  const unvalidTestValue = [
    { enter: '10', x: 1, expect: '$10' },
    { enter: null, expect: null },
    { enter: undefined, expect: undefined },
    { enter: false, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid prosp', () => {
      expect(toFixedWithDollarSign(value.enter, value.x)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(toFixedWithDollarSign(value.enter, value.x)).toBe(value.expect)
    })
  })
})

describe('Test toFixedWithYuanSign(int, x)', () => {
  const validTestValue = [
    { enter: 10, x: 1, expect: 'Ұ10.0' },
    { enter: 10.123, x: 2, expect: 'Ұ10.12' },
    { enter: 10.15, x: 1, expect: 'Ұ10.2' },
  ]

  const unvalidTestValue = [
    { enter: '10', x: 1, expect: 'Ұ10' },
    { enter: null, expect: null },
    { enter: undefined, expect: undefined },
    { enter: false, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid prosp', () => {
      expect(toFixedWithYuanSign(value.enter, value.x)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(toFixedWithYuanSign(value.enter, value.x)).toBe(value.expect)
    })
  })
})

describe('Test toFixedWithKg(int, x)', () => {
  const validTestValue = [
    { enter: 10, x: 1, expect: `10.0 ${t(TranslationKey.kg)}` },
    { enter: 10.123, x: 2, expect: `10.12 ${t(TranslationKey.kg)}` },
    { enter: 10.15, x: 1, expect: `10.2 ${t(TranslationKey.kg)}` },
  ]

  const unvalidTestValue = [
    { enter: '10', x: 1, expect: `10 ${t(TranslationKey.kg)}` },
    { enter: null, expect: null },
    { enter: undefined, expect: undefined },
    { enter: false, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid prosp', () => {
      expect(toFixedWithKg(value.enter, value.x)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(toFixedWithKg(value.enter, value.x)).toBe(value.expect)
    })
  })
})

describe('Test toFixedWithCm(int, x)', () => {
  const validTestValue = [
    { enter: 10, x: 1, expect: `10.0 ${t(TranslationKey.cm)}` },
    { enter: 10.123, x: 2, expect: `10.12 ${t(TranslationKey.cm)}` },
    { enter: 10.15, x: 1, expect: `10.2 ${t(TranslationKey.cm)}` },
  ]

  const unvalidTestValue = [
    { enter: '10', x: 1, expect: `10 ${t(TranslationKey.cm)}` },
    { enter: null, expect: null },
    { enter: undefined, expect: undefined },
    { enter: false, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid prosp', () => {
      expect(toFixedWithCm(value.enter, value.x)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(toFixedWithCm(value.enter, value.x)).toBe(value.expect)
    })
  })
})

describe('Test withDollarSign(str)', () => {
  const validTestValue = [
    { enter: '10.0', expect: '$10.0' },
    { enter: '10.123', expect: '$10.123' },
    { enter: '10.15', expect: '$10.15' },
  ]

  const unvalidTestValue = [
    { enter: '0', expect: '0' },
    { enter: 10, expect: '$10' },
    { enter: null, expect: null },
    { enter: undefined, expect: undefined },
    { enter: false, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid prosp', () => {
      expect(withDollarSign(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(withDollarSign(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test withYuanSign(str)', () => {
  const validTestValue = [
    { enter: '10.0', expect: 'Ұ10.0' },
    { enter: '10.123', expect: 'Ұ10.123' },
    { enter: '10.15', expect: 'Ұ10.15' },
  ]

  const unvalidTestValue = [
    { enter: '0', expect: '0' },
    { enter: 10, expect: 'Ұ10' },
    { enter: null, expect: null },
    { enter: undefined, expect: undefined },
    { enter: false, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid prosp', () => {
      expect(withYuanSign(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(withYuanSign(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test withKg(str)', () => {
  const validTestValue = [
    { enter: '10.0', expect: `10.0 ${t(TranslationKey.kg)}` },
    { enter: '10.123', expect: `10.123 ${t(TranslationKey.kg)}` },
    { enter: '10.15', expect: `10.15 ${t(TranslationKey.kg)}` },
  ]

  const unvalidTestValue = [
    { enter: '0', expect: '0' },
    { enter: 10, expect: `10 ${t(TranslationKey.kg)}` },
    { enter: null, expect: null },
    { enter: undefined, expect: undefined },
    { enter: false, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid prosp', () => {
      expect(withKg(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(withKg(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test withAmount(str)', () => {
  const validTestValue = [
    { enter: '10.0', expect: `10.0 ${t(TranslationKey['pcs.'])}` },
    { enter: '10.123', expect: `10.123 ${t(TranslationKey['pcs.'])}` },
    { enter: '10.15', expect: `10.15 ${t(TranslationKey['pcs.'])}` },
  ]

  const unvalidTestValue = [
    { enter: '0', expect: '0' },
    { enter: 10, expect: `10 ${t(TranslationKey['pcs.'])}` },
    { enter: null, expect: null },
    { enter: undefined, expect: undefined },
    { enter: false, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid prosp', () => {
      expect(withAmount(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(withAmount(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test withCm(str)', () => {
  const validTestValue = [
    { enter: '10.0', expect: `10.0 ${t(TranslationKey.cm)}` },
    { enter: '10.123', expect: `10.123 ${t(TranslationKey.cm)}` },
    { enter: '10.15', expect: `10.15 ${t(TranslationKey.cm)}` },
  ]

  const unvalidTestValue = [
    { enter: '0', expect: '0' },
    { enter: 10, expect: `10 ${t(TranslationKey.cm)}` },
    { enter: null, expect: null },
    { enter: undefined, expect: undefined },
    { enter: false, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid prosp', () => {
      expect(withCm(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(withCm(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test withText(str, text)', () => {
  const validTestValue = [
    { str: '10.0', text: 'text', expect: '10.0text' },
    { str: '10.123', text: 'text', expect: '10.123text' },
    { str: '10.15', text: 'text', expect: '10.15text' },
  ]

  const unvalidTestValue = [
    { str: 0, expect: 0 },
    { str: 10, expect: '10undefined' },
    { str: null, expect: null },
    { str: undefined, expect: undefined },
    { str: false, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid prosp', () => {
      expect(withText(value.str, value.text)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(withText(value.str, value.text)).toBe(value.expect)
    })
  })
})

describe('Test checkAndMakeAbsoluteUrl(urlStr)', () => {
  const validTestValue = [
    { enter: 'www.google.com', expect: 'https://www.google.com' },
    { enter: 'google.com', expect: 'https://google.com' },
    {
      enter:
        'google.com/search?gs_ssp=eJzj4tTP1TcwMU02T1JgNGB0YPBiS8_PT89JBQBASQXT&q=google&oq=goo&aqs=chrome.2.69i57j35i39j46i67i199i465j0i67j69i60l3j69i65.3191j0j7&sourceid=chrome&ie=UTF-8',
      expect:
        'https://google.com/search?gs_ssp=eJzj4tTP1TcwMU02T1JgNGB0YPBiS8_PT89JBQBASQXT&q=google&oq=goo&aqs=chrome.2.69i57j35i39j46i67i199i465j0i67j69i60l3j69i65.3191j0j7&sourceid=chrome&ie=UTF-8',
    },
  ]

  const unvalidTestValue = [
    { enter: 0, expect: 'https://0' },
    { enter: 10, expect: 'https://10' },
    { enter: null, expect: 'https://null' },
    { enter: undefined, expect: 'https://undefined' },
    { enter: false, expect: 'https://false' },
  ]

  validTestValue.forEach(value => {
    test('Valid prosp', () => {
      expect(checkAndMakeAbsoluteUrl(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(checkAndMakeAbsoluteUrl(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test clearSpecialCharacters(value)', () => {
  const validTestValue = [
    { enter: `Test `, expect: 'Test' },
    { enter: '`google.com`', expect: 'google.com`' },
    { enter: ' ', expect: '' },
  ]

  const unvalidTestValue = [
    { enter: 0, expect: 0 },
    { enter: 10, expect: 10 },
    { enter: null, expect: null },
    { enter: undefined, expect: undefined },
    { enter: false, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid prosp', () => {
      expect(clearSpecialCharacters(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(clearSpecialCharacters(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test clearEverythingExceptNumbers(value)', () => {
  const validTestValue = [
    { enter: `Test 12`, expect: '12' },
    { enter: '1String./`/*-+', expect: '1' },
    { enter: ' ', expect: '' },
  ]

  const unvalidTestValue = [
    { enter: 0, expect: 0 },
    { enter: 10, expect: 10 },
    { enter: null, expect: null },
    { enter: undefined, expect: undefined },
    { enter: false, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid prosp', () => {
      expect(clearEverythingExceptNumbers(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(clearEverythingExceptNumbers(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test clearSpecialCharacters(value)', () => {
  const validTestValue = [
    { enter: `Test `, expect: 'Test' },
    { enter: '`google.com`', expect: 'google.com`' },
    { enter: ' ', expect: '' },
  ]

  const unvalidTestValue = [
    { enter: 0, expect: 0 },
    { enter: 10, expect: 10 },
    { enter: null, expect: null },
    { enter: undefined, expect: undefined },
    { enter: false, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid prosp', () => {
      expect(clearSpecialCharacters(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(clearSpecialCharacters(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test shortenDocumentString(value)', () => {
  const validTestValue = [
    { enter: `String.pdf`, expect: 'Stri....pdf' },
    { enter: 'String', expect: 'Stri...ring' },
    { enter: 'Some long message', expect: 'Some...sage' },
  ]

  const unvalidTestValue = [
    { enter: 0, expect: null },
    { enter: 10, expect: null },
    { enter: null, expect: null },
    { enter: undefined, expect: null },
    { enter: false, expect: null },
  ]

  validTestValue.forEach(value => {
    test('Valid prosp', () => {
      expect(shortenDocumentString(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(shortenDocumentString(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test minsToTime(mins)', () => {
  const validTestValue = [
    { enter: 60, expect: `1 ${t(TranslationKey.hour)} ` },
    { enter: 120, expect: `2 ${t(TranslationKey.hour)} ` },
    { enter: 130, expect: `2 ${t(TranslationKey.hour)} 10 ${t(TranslationKey.minute)}.` },
  ]

  const unvalidTestValue = [
    { enter: 'String', expect: null },
    { enter: null, expect: null },
    { enter: undefined, expect: null },
    { enter: false, expect: null },
  ]

  validTestValue.forEach(value => {
    test('Valid prosp', () => {
      expect(minsToTime(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(minsToTime(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test getFullTariffTextForBoxOrOrder(box)', () => {
  const validTestValue = [
    {
      enter: {
        logicsTariff: {
          conditionsByRegion: {
            central: { rate: 7.72 },
            east: { rate: 7.72 },
            west: { rate: 7.72 },
            yuanToDollarRate: 7.25,
          },
          name: 'air fast',
          _id: '50e77127-27f7-4e04-be9c-68a72f77f539',
        },
        destination: {
          name: 'USA_MSTR',
          storekeeperId: 'cd1dc1fb-9248-48f6-bf07-11c2cec08a88',
          zipCode: '30003',
          _id: '997e43fc-a45c-44be-b7a5-c167c15b8475',
        },
      },
      expect: 'air fast / east / 7.72$',
    },
    {
      enter: {
        destination: {
          name: 'USA_MSTR',
          storekeeperId: 'cd1dc1fb-9248-48f6-bf07-11c2cec08a88',
          zipCode: '30003',
          _id: '997e43fc-a45c-44be-b7a5-c167c15b8475',
        },
      },
      expect: ' / east',
    },
    {
      enter: {
        logicsTariff: {
          conditionsByRegion: {
            central: { rate: 7.72 },
            east: { rate: 7.72 },
            west: { rate: 7.72 },
            yuanToDollarRate: 7.25,
          },
          name: 'air fast',
          _id: '50e77127-27f7-4e04-be9c-68a72f77f539',
        },
      },
      expect: 'air fast',
    },
  ]

  const unvalidTestValue = [
    { enter: {}, expect: t(TranslationKey['Not available']) },
    { enter: 'String', expect: t(TranslationKey['Not available']) },
    { enter: null, expect: t(TranslationKey['Not available']) },
    { enter: undefined, expect: t(TranslationKey['Not available']) },
    { enter: false, expect: t(TranslationKey['Not available']) },
  ]

  validTestValue.forEach(value => {
    test('Valid prosp', () => {
      expect(getFullTariffTextForBoxOrOrder(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(getFullTariffTextForBoxOrOrder(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test shortSku(value)', () => {
  const validTestValue = [
    { enter: '123456791012', expect: '123456791012' },
    { enter: 'String With Space', expect: 'String With ...' },
    { enter: 'String', expect: 'String' },
  ]

  const unvalidTestValue = [
    { enter: 10, expect: 10 },
    { enter: null, expect: null },
    { enter: undefined, expect: undefined },
    { enter: false, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid prosp', () => {
      expect(shortSku(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(shortSku(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test shortAsin(value)', () => {
  const validTestValue = [
    { enter: '123456791012', expect: '1234567910...' },
    { enter: 'String With Space', expect: 'String Wit...' },
    { enter: 'String', expect: 'String' },
  ]

  const unvalidTestValue = [
    { enter: 10, expect: 10 },
    { enter: null, expect: null },
    { enter: undefined, expect: undefined },
    { enter: false, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid prosp', () => {
      expect(shortAsin(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(shortAsin(value.enter)).toBe(value.expect)
    })
  })
})

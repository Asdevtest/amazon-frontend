/* eslint-disable no-unused-vars */
import {
  checkIsAbsoluteUrl,
  checkIsAdmin,
  checkIsBuyer,
  checkIsClient,
  checkIsDocumentLink,
  checkIsImageLink,
  checkIsMoreNCharactersAfterDot,
  checkIsMoreTwoCharactersAfterDot,
  checkIsPositiveNum,
  checkIsPositiveNummberAndNoMoreNCharactersAfterDot,
  checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot,
  checkIsResearcher,
  checkIsStorekeeper,
  checkIsString,
  checkIsSupervisor,
  checkIsVideoLink,
  findTariffInStorekeepersData,
  isHaveMasterUser,
  isNotNull,
  isNotUndefined,
  isNull,
  isUndefined,
  validateEmail,
} from '@utils/checks'

describe('Test isNotUndefined(value)', () => {
  const validTestValue = [
    { enter: 'String', expect: true },
    { enter: 1, expect: true },
    { enter: true, expect: true },
    { enter: '', expect: true },
    { enter: 0, expect: true },
    { enter: null, expect: true },
  ]

  const unvalidTestValue = [{ enter: undefined, expect: false }]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(isNotUndefined(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(isNotUndefined(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test isUndefined(value)', () => {
  const validTestValue = [{ enter: undefined, expect: true }]

  const unvalidTestValue = [
    { enter: 'String', expect: false },
    { enter: 1, expect: false },
    { enter: true, expect: false },
    { enter: '', expect: false },
    { enter: 0, expect: false },
    { enter: null, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(isUndefined(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(isUndefined(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test isNull(value)', () => {
  const validTestValue = [{ enter: null, expect: true }]

  const unvalidTestValue = [
    { enter: 'String', expect: false },
    { enter: 1, expect: false },
    { enter: true, expect: false },
    { enter: '', expect: false },
    { enter: 0, expect: false },
    { enter: undefined, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(isNull(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(isNull(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test isNotNull(value)', () => {
  const validTestValue = [
    { enter: 'String', expect: true },
    { enter: 1, expect: true },
    { enter: true, expect: true },
    { enter: '', expect: true },
    { enter: 0, expect: true },
    { enter: undefined, expect: true },
  ]

  const unvalidTestValue = [{ enter: null, expect: false }]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(isNotNull(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(isNotNull(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test checkIsResearcher(userRole)', () => {
  const validTestValue = [{ enter: 'RESEARCHER', expect: true }]

  const unvalidTestValue = [
    { enter: 'researcher', expect: false },
    { enter: 1, expect: false },
    { enter: true, expect: false },
    { enter: '', expect: false },
    { enter: 0, expect: false },
    { enter: undefined, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(checkIsResearcher(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(checkIsResearcher(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test checkIsSupervisor(userRole)', () => {
  const validTestValue = [{ enter: 'SUPERVISOR', expect: true }]

  const unvalidTestValue = [
    { enter: 'supervisor', expect: false },
    { enter: 1, expect: false },
    { enter: true, expect: false },
    { enter: '', expect: false },
    { enter: 0, expect: false },
    { enter: undefined, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(checkIsSupervisor(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(checkIsSupervisor(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test checkIsBuyer(userRole)', () => {
  const validTestValue = [{ enter: 'BUYER', expect: true }]

  const unvalidTestValue = [
    { enter: 'buyer', expect: false },
    { enter: 1, expect: false },
    { enter: true, expect: false },
    { enter: '', expect: false },
    { enter: 0, expect: false },
    { enter: undefined, expect: false },
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
  const validTestValue = [{ enter: 'CLIENT', expect: true }]

  const unvalidTestValue = [
    { enter: 'client', expect: false },
    { enter: 1, expect: false },
    { enter: true, expect: false },
    { enter: '', expect: false },
    { enter: 0, expect: false },
    { enter: undefined, expect: false },
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
  const validTestValue = [{ enter: 'ADMIN', expect: true }]

  const unvalidTestValue = [
    { enter: 'admin', expect: false },
    { enter: 1, expect: false },
    { enter: true, expect: false },
    { enter: '', expect: false },
    { enter: 0, expect: false },
    { enter: undefined, expect: false },
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
  const validTestValue = [{ enter: 'STOREKEEPER', expect: true }]

  const unvalidTestValue = [
    { enter: 'storekeeper', expect: false },
    { enter: 1, expect: false },
    { enter: true, expect: false },
    { enter: '', expect: false },
    { enter: 0, expect: false },
    { enter: undefined, expect: false },
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

describe('Test checkIsAbsoluteUrl(url)', () => {
  const validTestValue = [
    { enter: 'https://tracker.yandex.ru/issues/my-issues', expect: true },
    {
      enter:
        'https://www.google.com/search?q=programa&newwindow=1&sxsrf=AJOqlzVPuwvZyVSS8dX_ngIgXPSjZzM5Mw%3A1675661976713&ei=mJLgY5eIK7_h7_UP-5G68AE&oq=progra&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDoECCMQJzoKCC4QxwEQ0QMQQzoLCC4QgAQQxwEQ0QM6BAgAEEM6BAguEEM6BQgAEJECSgQIQRgASgQIRhgAUABY6xtg6y1oAHABeAGAAZsBiAH6BZIBAzAuNpgBAKABAcABAQ&sclient=gws-wiz-serp',
      expect: true,
    },
  ]

  const unvalidTestValue = [
    { enter: 'storekeeper', expect: false },
    { enter: 'google.com', expect: false },
    { enter: 1, expect: false },
    { enter: true, expect: false },
    { enter: '', expect: false },
    { enter: 0, expect: false },
    { enter: undefined, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(checkIsAbsoluteUrl(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(checkIsAbsoluteUrl(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test checkIsPositiveNum(str)', () => {
  const validTestValue = [
    { enter: '1', expect: true },
    { enter: '2', expect: true },
    { enter: '10.1', expect: true },
    { enter: 1, expect: true },
  ]

  const unvalidTestValue = [
    { enter: 'storekeeper', expect: false },
    { enter: 'google.com', expect: false },
    { enter: undefined, expect: false },
    { enter: true, expect: true },
    { enter: '', expect: true },
    { enter: 0, expect: true },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(checkIsPositiveNum(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(checkIsPositiveNum(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test checkIsMoreTwoCharactersAfterDot(str)', () => {
  const validTestValue = [
    { enter: '1.111', expect: true },
    { enter: '2.001', expect: true },
    { enter: '10.121', expect: true },
    { enter: 1.111, expect: true },
    { enter: 'google.com', expect: true },
  ]

  const unvalidTestValue = [
    { enter: 'storekeeper', expect: false },
    { enter: undefined, expect: false },
    { enter: true, expect: false },
    { enter: '', expect: false },
    { enter: 0, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(checkIsMoreTwoCharactersAfterDot(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(checkIsMoreTwoCharactersAfterDot(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test checkIsMoreNCharactersAfterDot(str, max)', () => {
  const validTestValue = [
    { enter: '1.111', max: 1, expect: true },
    { enter: '2.001', max: 2, expect: true },
    { enter: '10.1211221', max: 4, expect: true },
    { enter: 1.111, max: 1, expect: true },
    { enter: 'google.com', max: 1, expect: true },
  ]

  const unvalidTestValue = [
    { enter: 'storekeeper', expect: false },
    { enter: undefined, expect: false },
    { enter: true, expect: false },
    { enter: '', expect: false },
    { enter: 0, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(checkIsMoreNCharactersAfterDot(value.enter, value.max)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(checkIsMoreNCharactersAfterDot(value.enter, value.max)).toBe(value.expect)
    })
  })
})

describe('Test checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(str)', () => {
  const validTestValue = [
    { enter: '1.11', expect: true },
    { enter: '2.00', expect: true },
  ]

  const unvalidTestValue = [
    { enter: true, expect: true },
    { enter: '', expect: true },
    { enter: 0, expect: true },
    { enter: 1.111, expect: false },
    { enter: 'google.com', expect: false },
    { enter: '10.1211221', expect: false },
    { enter: 'storekeeper', expect: false },
    { enter: undefined, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(value.enter, value.max)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(value.enter, value.max)).toBe(value.expect)
    })
  })
})

describe('Test checkIsPositiveNummberAndNoMoreNCharactersAfterDot(str, max)', () => {
  const validTestValue = [
    { enter: '1.11', max: 3, expect: true },
    { enter: '2.001', max: 4, expect: true },
  ]

  const unvalidTestValue = [
    { enter: true, max: 2, expect: true },
    { enter: '', max: 2, expect: true },
    { enter: 0, max: 2, expect: true },
    { enter: 1.111, expect: false },
    { enter: 'google.com', expect: false },
    { enter: '10.1211221', expect: false },
    { enter: 'storekeeper', expect: false },
    { enter: undefined, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(checkIsPositiveNummberAndNoMoreNCharactersAfterDot(value.enter, value.max)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(checkIsPositiveNummberAndNoMoreNCharactersAfterDot(value.enter, value.max)).toBe(value.expect)
    })
  })
})

describe('Test isHaveMasterUser(user)', () => {
  const validTestValue = [
    { enter: { masterUser: { _id: 'efb65978-bd03-4931-8fd8-a3d69fcafecd', name: 'buyer' } }, expect: true },
  ]

  const unvalidTestValue = [
    { enter: { masterUser: null }, expect: false },
    { enter: { masterUser: undefined }, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(isHaveMasterUser(value.enter, value.max)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(isHaveMasterUser(value.enter, value.max)).toBe(value.expect)
    })
  })
})

describe('Test findTariffInStorekeepersData(storekeepers, storekeeperId, logicsTariffId)', () => {
  const validTestValue = [
    {
      storekeepers: [
        {
          _id: '1b8cc7ce-fe99-45c3-9f9b-98bf3e847328',
          tariffLogistics: [{ _id: '1b8cc7ce-fe99-45c3-9f9b-98bf3e847328' }],
        },
      ],
      storekeeperId: '1b8cc7ce-fe99-45c3-9f9b-98bf3e847328',
      logicsTariffId: '1b8cc7ce-fe99-45c3-9f9b-98bf3e847328',
      expect: { _id: '1b8cc7ce-fe99-45c3-9f9b-98bf3e847328' },
    },
  ]

  const unvalidTestValue = [
    {
      storekeepers: [{ _id: '1b8cc7ce-fe99-45c3-9f9b-98bf3e847328', tariffLogistics: [{ _id: '1' }] }],
      storekeeperId: '1b8cc7ce-fe99-45c3-9f9b-98bf3e847328',
      logicsTariffId: '1b8cc7ce-fe99-45c3-9f9b-98bf3e847328',
      expect: undefined,
    },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(findTariffInStorekeepersData(value.storekeepers, value.storekeeperId, value.logicsTariffId)).toStrictEqual(
        value.expect,
      )
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(findTariffInStorekeepersData(value.storekeepers, value.storekeeperId, value.logicsTariffId)).toStrictEqual(
        value.expect,
      )
    })
  })
})

describe('Test checkIsImageLink(link)', () => {
  const validTestValue = [
    { enter: 'img.png', expect: true },
    { enter: 'img.PNG', expect: true },
    { enter: 'img.jpg', expect: true },
    { enter: 'img.ico', expect: true },
    { enter: 'img.gif', expect: true },
    { enter: 'img.svg', expect: true },
    { enter: 'img.webp', expect: true },
    { enter: 'img.avif', expect: true },
    { enter: 'img.jpeg', expect: true },
    { enter: 'img.rotated-image', expect: true },
    { enter: 'img.jfif', expect: true },
  ]

  const unvalidTestValue = [
    { enter: '', expect: false },
    { enter: 'google.com', expect: false },
    { enter: '10.1211221', expect: false },
    { enter: 'storekeeper', expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(checkIsImageLink(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(checkIsImageLink(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test checkIsDocumentLink(link)', () => {
  const validTestValue = [
    { enter: 'file.doc', expect: true },
    { enter: 'file.docx', expect: true },
    { enter: 'file.pdf', expect: true },
    { enter: 'file.xlsx', expect: true },
    { enter: 'file.xls', expect: true },
  ]

  const unvalidTestValue = [
    { enter: '', expect: false },
    { enter: 'google.com', expect: false },
    { enter: '10.1211221', expect: false },
    { enter: 'storekeeper', expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(checkIsDocumentLink(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(checkIsDocumentLink(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test checkIsVideoLink(link)', () => {
  const validTestValue = [
    { enter: 'file.3g2', expect: true },
    { enter: 'file.3gp', expect: true },
    { enter: 'file.3gp2', expect: true },
    { enter: 'file.3gpp', expect: true },
    { enter: 'file.3gpp2', expect: true },
    { enter: 'file.asf', expect: true },
    { enter: 'file.asx', expect: true },
    { enter: 'file.avi', expect: true },
    { enter: 'file.f4v', expect: true },
    { enter: 'file.flv', expect: true },
    { enter: 'file.h264', expect: true },
    { enter: 'file.mkv', expect: true },
    { enter: 'file.mod', expect: true },
    { enter: 'file.moov', expect: true },
    { enter: 'file.mov', expect: true },
    { enter: 'file.mp4', expect: true },
    { enter: 'file.mpeg', expect: true },
    { enter: 'file.mpg', expect: true },
    { enter: 'file.mts', expect: true },
    { enter: 'file.rm', expect: true },
    { enter: 'file.rmvb', expect: true },
    { enter: 'file.srt', expect: true },
    { enter: 'file.swf', expect: true },
    { enter: 'file.ts', expect: true },
    { enter: 'file.vob', expect: true },
    { enter: 'file.webm', expect: true },
    { enter: 'file.wmv', expect: true },
    { enter: 'file.yuv', expect: true },
  ]

  const unvalidTestValue = [
    { enter: '', expect: false },
    { enter: 'google.com', expect: false },
    { enter: '10.1211221', expect: false },
    { enter: 'storekeeper', expect: false },
    { enter: 'file.txt', expect: false },
    { enter: 'file.mp3', expect: false },
    { enter: 'file.jpg', expect: false },
    { enter: 'file.gif', expect: false },
    { enter: 'file.docx', expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(checkIsVideoLink(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(checkIsVideoLink(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test checkIsString(value)', () => {
  const validTestValue = [
    { enter: 'Jest', expect: true },
    { enter: '', expect: true },
  ]

  const unvalidTestValue = [
    { enter: true, expect: false },
    { enter: 0, expect: false },
    { enter: 1.111, expect: false },
    { enter: undefined, expect: false },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(checkIsString(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(checkIsString(value.enter)).toBe(value.expect)
    })
  })
})

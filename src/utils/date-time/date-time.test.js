/* eslint-disable no-unused-vars */
import {
  convertDaysToSeconds,
  formatDate,
  formatDateDayMonthYear,
  formatDateDistanceFromNow,
  formatDateDistanceFromNowStrict,
  formatDateForShowWithoutParseISO,
  formatDateMonthYear,
  formatDateMonthYearWithoutFormatISO,
  formatDateTime,
  formatDateTimeHourAndMinutes,
  formatDateWithoutTime,
  formatNormDateTime,
  formatNormDateTimeWithParseISO,
  formatShortDateTime,
  getDistanceBetweenDatesInSeconds,
  getYearDate,
  sortObjectsArrayByFiledDate,
} from './date-time'

describe('Test getYearDate(dateString)', () => {
  const validTestValue = [{ enter: '2023-01-17T08:41:47.680Z', expect: '2023' }]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(getYearDate(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test formatDate(dateString)', () => {
  const validTestValue = [{ enter: '2023-01-17T08:41:47.680Z', expect: '17-01-2023' }]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(formatDate(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test formatNormDateTime(dateString)', () => {
  const validTestValue = [{ enter: '1111-11-10T21:29:43.000Z', expect: '10-11-1111 23:19' }]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(formatNormDateTime(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test formatDateTimeHourAndMinutes(dateString)', () => {
  const validTestValue = [{ enter: '1111-11-10T21:29:43.000Z', expect: '23:19' }]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(formatDateTimeHourAndMinutes(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test formatShortDateTime(dateString)', () => {
  const validTestValue = [{ enter: '1111-11-10T21:29:43.000Z', expect: '10-11-1111 23:19' }]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(formatShortDateTime(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test formatDateWithoutTime(dateString)', () => {
  const validTestValue = [{ enter: '1111-11-10T21:29:43.000Z', expect: '10-11-1111' }]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(formatDateWithoutTime(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test formatNormDateTimeWithParseISO(dateString)', () => {
  const validTestValue = [{ enter: '1111-11-10T21:29:43.000Z', expect: '10-11-1111 23:19' }]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(formatNormDateTimeWithParseISO(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test formatDateMonthYear(date)', () => {
  const validTestValue = [{ enter: '2023-01-17T08:41:47.680Z', expect: 'Jan 2023' }]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(formatDateMonthYear(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test formatDateMonthYearWithoutFormatISO(date)', () => {
  const validTestValue = [{ enter: '2023-01-17T08:41:47.680Z', expect: 'Jan 2023' }]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(formatDateMonthYearWithoutFormatISO(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test formatDateDayMonthYear(date)', () => {
  const validTestValue = [{ enter: '2023-01-17T08:41:47.680Z', expect: '17 January 2023' }]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(formatDateDayMonthYear(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test formatDateDistanceFromNow(date)', () => {
  const validTestValue = [{ enter: '2023-01-17T08:41:47.680Z' }]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(formatDateDistanceFromNow(value.enter)).not.toBeNull()
      expect(typeof formatDateDistanceFromNow(value.enter)).toBe('string')
    })
  })
})

describe('Test convertDaysToSeconds(days)', () => {
  const validTestValue = [{ enter: 5, expect: 432000 }]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(convertDaysToSeconds(value.enter)).toBe(value.expect)
    })
  })
})

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import {
  translateTooltipAttentionMessageByRole,
  translateTooltipCloseBtnMessage,
  translateTooltipDeleteBtnMessage,
  translateTooltipMessageByRole,
  translateTooltipSaveBtnMessage,
} from './translate-tooltip-message'

describe('Test translateTooltipSaveBtnMessage(role)', () => {
  const validTestValue = [
    {
      enter: UserRoleCodeMap[30],
      expect: t(TranslationKey['Confirm the selected status and send to the next step']),
    },
    {
      enter: UserRoleCodeMap[40],
      expect: t(TranslationKey['Save changes in the product card']),
    },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(translateTooltipSaveBtnMessage(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test translateTooltipCloseBtnMessage(role)', () => {
  const validTestValue = [
    {
      enter: UserRoleCodeMap[30],
      expect: t(TranslationKey['Close the product card without saving']),
    },
    {
      enter: UserRoleCodeMap[40],
      expect: t(TranslationKey['Close product card']),
    },
    {
      enter: UserRoleCodeMap[20],
      expect: t(TranslationKey['Close product card']),
    },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(translateTooltipCloseBtnMessage(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test translateTooltipDeleteBtnMessage(label, role)', () => {
  const validTestValue = [
    {
      enter: UserRoleCodeMap[30],
      expect: t(TranslationKey['Delete the entire product card']),
    },
    {
      enter: UserRoleCodeMap[40],
      expect: t(TranslationKey['Move the product card to the Archive']),
    },
    {
      enter: UserRoleCodeMap[10],
      expect: t(TranslationKey['Move the product card to the Archive']),
    },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(translateTooltipDeleteBtnMessage(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test translateTooltipMessageByRole(label, role)', () => {
  const researcher = UserRoleCodeMap[30]
  const checkIsResearcher = [
    {
      enter: t(TranslationKey['Create a product']),
      expect: t(
        TranslationKey[
          'Button to set the status, the product card is sent to the supervisor for checking (can be changed before checking)'
        ],
      ),
    },
    {
      enter: t(TranslationKey['Create with a supplier']),
      expect: t(
        TranslationKey[
          'Button to set status, the product card is sent to the supervisor for verification (can be changed before checking).There is no need for the buyer to search for a supplier'
        ],
      ),
    },
    {
      enter: t(TranslationKey['Save without status']),
      expect: t(TranslationKey['Save product card data without setting a status']),
    },
  ]

  checkIsResearcher.forEach(value => {
    test('Valid props', () => {
      expect(translateTooltipMessageByRole(value.enter, researcher)).toBe(value.expect)
    })
  })

  const buyer = UserRoleCodeMap[40]
  const checkIsBuyer = [
    {
      expect: t(
        TranslationKey[
          'Button to set the status, the product card is sent to the supervisor for checking (can be changed before checking)'
        ],
      ),
    },
  ]
  checkIsBuyer.forEach(value => {
    test('Valid props', () => {
      expect(translateTooltipMessageByRole(value?.enter, buyer)).toBe(value.expect)
    })
  })

  const supervisor = UserRoleCodeMap[20]
  const checkIsSupervisor = [
    {
      enter: t(TranslationKey['Publish on the exchange']),
      expect: t(TranslationKey['Button to put the status, the card of the product is put on the exchange for sale']),
    },
    {
      enter: t(TranslationKey['Supplier not found']),
      expect: t(TranslationKey['Button for displaying the status, the product card is blocked']),
    },
    {
      enter: t(TranslationKey["The supplier's price does not fit"]),
      expect: t(TranslationKey['Button for displaying the status, the product card is blocked']),
    },
    {
      enter: t(TranslationKey['Save without status']),
      expect: t(TranslationKey['Save product card data without setting a status']),
    },
    {
      enter: t(TranslationKey['The product is suitable']),
      expect: t(
        TranslationKey["Button to set the status, the product card remains in the supervisor's work (can be changed)"],
      ),
    },
    {
      enter: t(TranslationKey['Save without status']),
      expect: t(TranslationKey['Save product card data without setting a status']),
    },
    {
      enter: t(TranslationKey['Repeat search']),
      expect: t(TranslationKey['Repeat the search for a supplier']),
    },
  ]
  checkIsSupervisor.forEach(value => {
    test('Valid props', () => {
      expect(translateTooltipMessageByRole(value?.enter, supervisor)).toBe(value.expect)
    })
  })
})

describe('Test translateTooltipAttentionMessageByRole(label, role)', () => {
  const supervisor = UserRoleCodeMap[20]
  const checkIsSupervisor = [
    {
      enter: t(TranslationKey['Publish on the exchange']),
      expect: t(TranslationKey['The final status, once saved, cannot be changed!']),
    },
    {
      enter: t(TranslationKey['Supplier not found']),
      expect: t(TranslationKey['The final status, once saved, cannot be changed!']),
    },
    {
      enter: t(TranslationKey['Supplier found']),
      expect: t(TranslationKey['Final status, after saving will be paid for the search']),
    },
    {
      enter: t(TranslationKey["The supplier's price does not fit"]),
      expect: t(TranslationKey['The final status, once saved, cannot be changed!']),
    },
  ]

  checkIsSupervisor.forEach(value => {
    test('Valid props', () => {
      expect(translateTooltipAttentionMessageByRole(value.enter, supervisor)).toBe(value.expect)
    })
  })
})

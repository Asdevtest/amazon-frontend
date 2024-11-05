import { TranslationKey } from '@constants/translations/translation-key'

import { checkIsBuyer, checkIsResearcher, checkIsSupervisor } from '../checks'
import { t } from '../translations'

export const translateTooltipMessageByRole = (label, role) => {
  if (checkIsResearcher(role)) {
    switch (label) {
      case t(TranslationKey['Create a product']):
        return t(
          TranslationKey[
            'Button to set the status, the product card is sent to the supervisor for checking (can be changed before checking)'
          ],
        )
      case t(TranslationKey['Create with a supplier']):
        return t(
          TranslationKey[
            'Button to set status, the product card is sent to the supervisor for verification (can be changed before checking).There is no need for the buyer to search for a supplier'
          ],
        )
      case t(TranslationKey['Save without status']):
        return t(TranslationKey['Save product card data without setting a status'])
    }
  } else if (checkIsBuyer(role)) {
    return t(
      TranslationKey[
        'Button to set the status, the product card is sent to the supervisor for checking (can be changed before checking)'
      ],
    )
  } else if (checkIsSupervisor(role)) {
    switch (label) {
      case t(TranslationKey['Publish on the exchange']):
        return t(TranslationKey['Button to put the status, the card of the product is put on the exchange for sale'])
      case t(TranslationKey['Supplier not found']):
        return t(TranslationKey['Button for displaying the status, the product card is blocked'])
      case t(TranslationKey["The supplier's price does't fit"]):
        return t(TranslationKey['Button for displaying the status, the product card is blocked'])
      case t(TranslationKey['Save without status']):
        return t(TranslationKey['Save product card data without setting a status'])
      case t(TranslationKey['Finding a supplier (product fit)']):
        return t(
          TranslationKey[
            'Status billing button, the product card is sent to the buyer to search for a supplier (can be changed before the buyer takes over)'
          ],
        )
      case t(TranslationKey['The product is suitable']):
        return t(
          TranslationKey[
            "Button to set the status, the product card remains in the supervisor's work (can be changed)"
          ],
        )
      case t(TranslationKey['Repeat search']):
        return t(TranslationKey['Repeat the search for a supplier'])
      case t(TranslationKey["Doesn't fit"]):
        return t(
          TranslationKey[
            "Button to set the status, the product card remains in the supervisor's work (can be changed)"
          ],
        )
    }
  }
}

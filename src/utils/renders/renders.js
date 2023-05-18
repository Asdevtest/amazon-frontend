import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { checkIsBuyer, checkIsClient, checkIsResearcher, checkIsStorekeeper, checkIsSupervisor } from '../checks'
import { t } from '../translations'

export const renderTooltipTitle = (categoryTitle, userRole) => {
  if (checkIsBuyer(UserRoleCodeMap[userRole])) {
    switch (categoryTitle) {
      case t(TranslationKey.Dashboard):
        return t(TranslationKey['Statistics on goods/orders/finances'])
      case t(TranslationKey['Free Orders']):
        return t(TranslationKey['All orders available for pickup'])
      case t(TranslationKey['Supplier search']):
        return t(TranslationKey['All available tasks for finding a supplier'])
      case t(TranslationKey.Users):
        return t(TranslationKey['Manage the list of employees'])
      case t(TranslationKey.Finances):
        return t(TranslationKey["Detailed description of the movement of the user's money"])
      case t(TranslationKey['My products']):
        return t(TranslationKey['List of items taken by Bayer to find a supplier'])
      case t(TranslationKey['My orders']):
        return t(TranslationKey['Management of all orders assigned to Bayer'])
    }
  } else if (checkIsResearcher(UserRoleCodeMap[userRole])) {
    switch (categoryTitle) {
      case t(TranslationKey.Dashboard):
        return t(TranslationKey['Statistics on goods/orders/finances'])
      case t(TranslationKey['My products']):
        return t(TranslationKey['List of products created by the Researcher'])
      case t(TranslationKey.Users):
        return t(TranslationKey['Manage the list of employees'])
      case t(TranslationKey.Finances):
        return t(TranslationKey["Detailed description of the movement of the user's money"])
    }
  } else if (checkIsSupervisor(UserRoleCodeMap[userRole])) {
    switch (categoryTitle) {
      case t(TranslationKey.Dashboard):
        return t(TranslationKey['Statistics on goods/orders/finances'])
      case t(TranslationKey['Ready to check']):
        return t(TranslationKey['All product cards available for checking'])
      case t(TranslationKey.Users):
        return t(TranslationKey['Manage the list of employees'])
      case t(TranslationKey.Finances):
        return t(TranslationKey["Detailed description of the movement of the user's money"])
      case t(TranslationKey['My products']):
        return t(TranslationKey['The list of goods cards assigned to the supervisor for verification'])
    }
  } else if (checkIsClient(UserRoleCodeMap[userRole])) {
    switch (categoryTitle) {
      case t(TranslationKey.Dashboard):
        return t(TranslationKey['Statistics on goods, orders and boxes'])
      case t(TranslationKey.Freelance):
        return t(TranslationKey['Requests and proposals for them'])
      case t(TranslationKey['My requests']):
        return t(TranslationKey['List of created requests'])
      case t(TranslationKey['Vacant requests']):
        return t(TranslationKey['Actual requests on the exchange'])
      case t(TranslationKey['My proposals']):
        return t(TranslationKey['Proposals made for other requests'])
      case t(TranslationKey.Inventory):
        return t(TranslationKey['List of your products'])
      case t(TranslationKey['Commodity exchange']):
        return t(TranslationKey['Exchange with product cards available for purchase'])
      case t(TranslationKey['My orders']):
        return t(TranslationKey['List of orders taken'])
      case t(TranslationKey['My warehouse']):
        return t(TranslationKey['Managing the boxes that are in the prep center'])
      case t(TranslationKey['My batches']):
        return t(TranslationKey['List of batches and management of boxes related to them'])
      case t(TranslationKey.Users):
        return t(TranslationKey['Manage the list of employees'])
      case t(TranslationKey.Shops):
        return t(TranslationKey['A list of your added Amazon stores with reports on them'])
      case t(TranslationKey.Finances):
        return t(TranslationKey["Detailed description of the movement of the user's money"])
      case t(TranslationKey.Notifications):
        return t(TranslationKey['Important notifications on changes in order price, batch or irrelevant tariff'])
      case t(TranslationKey['On orders']):
        return t(TranslationKey['Notifications of required surcharges for the order'])
      case t(TranslationKey['On boxes']):
        return t(TranslationKey['Notices of required surcharges per box in a batch'])
      case t(TranslationKey['On boxes tariffs']):
        return t(TranslationKey['Notifications about the need to change to a new tariff'])
    }
  } else if (checkIsStorekeeper(UserRoleCodeMap[userRole])) {
    switch (categoryTitle) {
      case t(TranslationKey.Dashboard):
        return t(TranslationKey['Statistics on goods/orders/finances'])
      case t(TranslationKey.Tasks):
        return t(TranslationKey['New, current and completed/rejected box tasks'])
      case t(TranslationKey['My warehouse']):
        return t(TranslationKey['List of boxes that are in stock'])
      case t(TranslationKey['My batches']):
        return t(TranslationKey['Management of batches and boxes related to them'])
      case t(TranslationKey.Users):
        return t(TranslationKey['Manage the list of employees'])
      case t(TranslationKey.Finances):
        return t(TranslationKey["Detailed description of the movement of the user's money"])
      case t(TranslationKey['Warehouse management']):
        return t(TranslationKey['Management of tariffs for logistics and warehousing services'])
    }
  }
}

export const renderAttentionTooltipTitle = (categoryTitle, userRole) => {
  if (checkIsClient(UserRoleCodeMap[userRole])) {
    switch (categoryTitle) {
      case t(TranslationKey['On orders']):
        return t(TranslationKey['If the surcharge is declined, the order will be cancelled'])
      case t(TranslationKey['On boxes']):
        return t(TranslationKey['If the surcharge is declined, the box is returned to stock'])
      case t(TranslationKey['On boxes tariffs']):
        return t(TranslationKey['If you reject the tariff change, the box is returned to the stock'])
    }
  }
}

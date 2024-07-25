import { action, observable } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { ISwitcherSettings } from '@components/shared/custom-switcher/custom-switcher'

import { t } from '@utils/translations'

import { Roles } from '@typings/enums/roles'

export const adminUsersViewModelConfig = {
  switcherCondition: observable,

  onClickUser: action.bound,
  onClickBalance: action.bound,
  onClickChangeRole: action.bound,
}

const filterableRoles: Roles[] = [
  Roles.CANDIDATE,
  Roles.CLIENT,
  Roles.RESEARCHER,
  Roles.STOREKEEPER,
  Roles.BUYER,
  Roles.FREELANCER,
]

const getSwitcherConfig = (userRoles: Roles[]) => {
  const defaultConfig: ISwitcherSettings[] = [
    {
      label: () => t(TranslationKey.All),
      value: null,
    },
  ]

  const options = Object.values(userRoles).map(item => ({
    label: () => `${item}S`,
    value: Roles[item],
  }))

  return defaultConfig.concat(options)
}

export const switcherConfig = getSwitcherConfig(filterableRoles)

export const fieldsForSearch = ['name', 'email']

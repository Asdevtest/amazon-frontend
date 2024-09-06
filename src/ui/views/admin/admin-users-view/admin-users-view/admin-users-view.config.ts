import { action, observable } from 'mobx'

import { UserRole, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const adminUsersViewModelConfig = {
  switcherCondition: observable,

  onClickUser: action.bound,
  onClickBalance: action.bound,
  onClickChangeRole: action.bound,
}

const filterableRoles = [
  UserRole.CANDIDATE,
  UserRole.CLIENT,
  UserRole.RESEARCHER,
  UserRole.STOREKEEPER,
  UserRole.BUYER,
  UserRole.FREELANCER,
]

export const getSwitcherConfig = () => {
  const defaultConfig: any = [
    {
      label: t(TranslationKey.All),
      value: null,
    },
  ]

  const options = Object.values(filterableRoles).map(item => ({
    label: item,
    value: mapUserRoleEnumToKey[item],
  }))

  return defaultConfig.concat(options)
}

export const fieldsForSearch = ['name', 'email']

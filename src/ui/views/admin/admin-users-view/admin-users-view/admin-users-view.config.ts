import { action, observable } from 'mobx'

import { UserRole, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { ISwitcherSettings } from '@components/shared/custom-switcher/custom-switcher'

import { t } from '@utils/translations'

export const adminUsersViewModelConfig = {
  groupPermissions: observable,
  singlePermissions: observable,
  checkValidationNameOrEmail: observable,
  availableSubUsers: observable,
  changeNameAndEmail: observable,
  editUserFormFields: observable,
  rowSelectionModel: observable,
  switcherCondition: observable,
  submitEditData: observable,
  showConfirmModal: observable,
  showEditUserModal: observable,

  loadData: action.bound,
  getGroupPermissions: action.bound,
  getSinglePermissions: action.bound,
  submitEditUserForm: action.bound,
  finalStepSubmitEditUserForm: action.bound,
  onClickEditUser: action.bound,
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

const getSwitcherConfig = (userRoles: string[]) => {
  const defaultConfig: ISwitcherSettings[] = [
    {
      label: () => t(TranslationKey.All),
      value: null,
    },
  ]

  const options = Object.values(userRoles).map(item => ({
    label: () => `${item}S`,
    value: mapUserRoleEnumToKey[item],
  }))

  return defaultConfig.concat(options)
}

export const switcherConfig = getSwitcherConfig(filterableRoles)

export const fieldsForSearch = ['name', 'email']

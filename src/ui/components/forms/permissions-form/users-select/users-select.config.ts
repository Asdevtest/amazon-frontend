import { action, computed, observable } from 'mobx'

import { IFullUser } from '@typings/shared/full-user'

export const usersSelectConfig = {
  defaultUser: observable,
  defaultUserOption: computed,
  userOptions: computed,
  onDropdownVisibleChange: action.bound,
}

export const getUserOptions = (users: IFullUser[], defaultPerformer?: IFullUser) => {
  const filteredUsers = users.filter(user => user?._id !== defaultPerformer?._id)

  const generatedUsetOptions = filteredUsers?.map(user => ({
    ...user,
    value: user?._id,
    label: user?.name,
  }))
  // const defaultUserOption = { value: null, label: t(TranslationKey['Select user']) }

  return generatedUsetOptions /* [defaultUserOption, ...generatedUsetOptions] */
}

export const getDefaultUserOption = (defaultPerformer?: IFullUser) => {
  if (defaultPerformer) {
    return {
      ...defaultPerformer,
      value: defaultPerformer?._id,
      label: defaultPerformer?.name,
    }
  }
}

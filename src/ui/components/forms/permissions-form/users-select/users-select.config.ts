import { action, computed, observable } from 'mobx'

import { IFullUser } from '@typings/shared/full-user'

import { IPermissionsData } from '@hooks/use-products-permissions'

export const requestSelectConfig = {
  defaultUser: observable,
  defaultUserOption: computed,
  userOptions: computed,
  onGetUsers: action.bound,
  onScroll: action.bound,
  onDropdownVisibleChange: action.bound,
}

export const getUserOptions = (users: IPermissionsData[], defaultPerformer?: IFullUser) => {
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

export type IChangeData = (id: string) => void

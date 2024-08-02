import { action } from 'mobx'

import { IFullUser } from '@typings/shared/full-user'
import { ISpec } from '@typings/shared/spec'

import { IPermissionsData } from '@hooks/use-products-permissions'

export const requestSelectConfig = {
  onGetUsers: action.bound,
}

export const getUserOptions = (users: IPermissionsData[], spec?: ISpec) => {
  const filteredUsers = users.filter(user => user?.allowedSpec?.some(data => data?.type === spec?.type))

  return filteredUsers?.map(user => ({
    ...user,
    value: user?._id,
    label: user?.name,
  }))
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

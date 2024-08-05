import { action } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IFullUser } from '@typings/shared/full-user'
import { ISpec } from '@typings/shared/spec'

import { IPermissionsData } from '@hooks/use-products-permissions'

export const requestSelectConfig = {
  onGetUsers: action.bound,
}

export const getUserOptions = (users: IPermissionsData[], spec?: ISpec) => {
  const filteredUsers = users.filter(user => user?.allowedSpec?.some(data => data?.type === spec?.type))

  const generatedUsetOptions = filteredUsers?.map(user => ({
    ...user,
    value: user?._id,
    label: user?.name,
  }))
  const defaultUserOption = { value: null, label: t(TranslationKey['Select performer']) }

  return [defaultUserOption, ...generatedUsetOptions]
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

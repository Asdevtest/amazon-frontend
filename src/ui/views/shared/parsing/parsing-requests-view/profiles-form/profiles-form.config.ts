import { action, computed, observable } from 'mobx'

import { IPermissionsData } from '@hooks/use-products-permissions'

export const profilesFormConfig = {
  value: observable,
  profiles: computed,
  onChange: action.bound,
  onScroll: action.bound,
}

export const requestOptions = {
  sortField: 'updatedAt',
  sortType: 'DESC',
}

export const searchFields = ['name', 'email']

export const getProfilesOptions = (profiles: IPermissionsData[]) =>
  profiles.map(profile => ({ label: profile.name, value: profile._id }))

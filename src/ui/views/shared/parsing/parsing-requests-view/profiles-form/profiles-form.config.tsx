import { action, computed, observable } from 'mobx'

import { Text } from '@components/shared/text'

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
  filters: 'status[$eq]="VACANT"',
}

export const searchFields = ['name', 'email']

export const getProfilesOptions = (profiles: IPermissionsData[]) =>
  profiles.map(profile => ({
    label: (
      <Text textRows={1} copyable={false} text={`${profile.email} (${profile.name})`} textStyle={{ maxWidth: 350 }} />
    ),
    value: profile._id,
  }))

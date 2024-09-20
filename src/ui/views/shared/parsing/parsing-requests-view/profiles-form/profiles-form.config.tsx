import { action, computed, observable } from 'mobx'
import { BiUnlink } from 'react-icons/bi'

import { Text } from '@components/shared/text'

import { ProfileStatus } from '@typings/enums/request/profile-request-status'

import { IPermissionsData } from '@hooks/use-products-permissions'

export const profilesFormConfig = {
  value: observable,
  reservedProfile: observable,
  unlinkedProfiles: observable,
  profiles: computed,
  onChange: action.bound,
  onScroll: action.bound,
}

export const searchFields = ['name', 'email']

export const getProfilesOptions = (profiles: IPermissionsData[]) =>
  profiles.map(profile => {
    const text = `${profile.email} (${profile.name})`
    const icon = profile.status === ProfileStatus.UNLINKED ? <BiUnlink size={12} /> : null

    return {
      label: <Text textRows={1} icon={icon} copyable={false} text={text} textStyle={{ maxWidth: 350 }} />,
      value: profile._id,
    }
  })

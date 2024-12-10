import { RadioChangeEvent } from 'antd'
import { makeObservable } from 'mobx'

import { InfiniteScrollModel } from '@models/infinite-scroll-model'
import { ParserModel } from '@models/parser-model'

import { IParsingProfile } from '@typings/models/parser/parsing-profile'

import { profilesFormConfig, searchFields } from './profiles-form.config'

export class ProfilesFormModel extends InfiniteScrollModel<IParsingProfile> {
  value = ''
  shopId?: string

  get reservedProfile() {
    return [this.meta?.reservedProfile].filter(Boolean)
  }
  get unlinkedProfiles() {
    return this.meta?.unlinkedProfiles || []
  }
  get profiles() {
    const combinedProfiles = [...this.reservedProfile, ...this.unlinkedProfiles, ...this.data]

    // additional filtering, as the backend does't filter data from metadata
    const filteredProfiles = combinedProfiles.filter(profile => {
      const hasEmail = profile?.email?.toLowerCase().includes(this.searchValue.toLowerCase())
      const hasName = profile?.name?.toLowerCase().includes(this.searchValue.toLowerCase())

      return hasEmail || hasName
    })

    return filteredProfiles
  }
  get isAlreadyProfile() {
    const currentShopId = this.profiles.find(({ _id }) => _id === this.value)?.shopId

    return !!currentShopId && currentShopId !== this.shopId
  }

  constructor(profileId?: string, requestId?: string, shopId?: string) {
    const filterOptions = {
      guid: requestId,
    }

    super({ method: ParserModel.getProfilesForRequest, filterOptions, searchFields })

    this.shopId = shopId
    this.value = profileId || ''
    this.getData()

    makeObservable(this, profilesFormConfig)
  }

  onChange = (e: RadioChangeEvent) => {
    this.value = e.target.value
  }
}

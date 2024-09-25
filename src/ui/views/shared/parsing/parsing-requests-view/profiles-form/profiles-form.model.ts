import { RadioChangeEvent } from 'antd'
import { makeObservable } from 'mobx'
import { UIEvent } from 'react'

import { ParserModel } from '@models/parser-model'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { profilesFormConfig, searchFields } from './profiles-form.config'

export class ProfilesFormModel extends UseProductsPermissions {
  value = ''
  shopId?: string

  get reservedProfile() {
    return [this.meta?.reservedProfile].filter(Boolean)
  }
  get unlinkedProfiles() {
    return this.meta?.unlinkedProfiles || []
  }
  get profiles() {
    const combinedProfiles = [...this.reservedProfile, ...this.unlinkedProfiles, ...this.permissionsData]

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
    const requestOptions = {
      sortField: 'updatedAt',
      sortType: 'DESC',
      guid: requestId,
    }

    super(ParserModel.getProfilesForRequest, requestOptions, searchFields)

    this.shopId = shopId
    this.value = profileId || ''
    this.permissionsData = []
    this.isCanLoadMore = true
    this.getPermissionsData()

    makeObservable(this, profilesFormConfig)
  }

  onChange = (e: RadioChangeEvent) => {
    this.value = e.target.value
  }

  onScroll = (e: UIEvent<HTMLElement>) => {
    const element = e.target as HTMLElement
    const scrollTop = element?.scrollTop
    const containerHeight = element?.clientHeight
    const contentHeight = element?.scrollHeight

    if (contentHeight - (scrollTop + containerHeight) < 44) {
      this.loadMoreDataHadler()
    }
  }
}

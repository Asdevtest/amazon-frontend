import { RadioChangeEvent } from 'antd'
import { makeObservable } from 'mobx'
import { UIEvent } from 'react'

import { ParserModel } from '@models/parser-model'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { profilesFormConfig, requestOptions, searchFields } from './profiles-form.config'

export class ProfilesFormModel extends UseProductsPermissions {
  value = ''

  get profiles() {
    return this.permissionsData
  }

  constructor(profileId?: string) {
    super(ParserModel.getProfiles, requestOptions, searchFields)

    this.value = profileId || ''
    this.permissionsData = []
    this.isCanLoadMore = true
    this.setOptions({ offset: 0, filters: '' })
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

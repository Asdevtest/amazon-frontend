import { makeAutoObservable } from 'mobx'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { navbarConfig } from '@constants/navigation/navbar'

import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { IFullUser } from '@typings/shared/full-user'
import { HistoryType } from '@typings/types/history'

export class CategoryRootViewModel {
  history?: HistoryType
  subRoutes: any[] = []

  get language() {
    return SettingsModel.languageTag
  }
  get userInfo() {
    return UserModel?.userInfo as unknown as IFullUser
  }

  constructor(history: HistoryType) {
    this.history = history
    this.setSubRoutes()
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setSubRoutes() {
    const category = navbarConfig[UserRoleCodeMap[this.userInfo?.role]]?.find(
      el => el.route === this.history?.location.pathname,
    )

    this.subRoutes = category?.subtitles || []
  }

  onClickCategory(url: string) {
    this.history?.push({ pathname: url })
  }
}

import { makeAutoObservable, runInAction } from 'mobx'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { navbarConfig } from '@constants/navigation/navbar'

import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

export class CategoryRootViewModel {
  history = undefined
  subRoutes = []

  get language() {
    return SettingsModel.languageTag
  }

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    this.setSubRoutes()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setSubRoutes() {
    const category = navbarConfig()[UserRoleCodeMap[UserModel?.userInfo?.role]]?.find(
      el => el.route === this.history.location.pathname,
    )
    runInAction(() => {
      this.subRoutes = category?.subtitles || []
    })
  }

  onClickCategory(url) {
    this.history.push({
      pathname: url,
    })
  }
}

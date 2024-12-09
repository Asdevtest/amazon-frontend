import { makeObservable } from 'mobx'

import { InfiniteScrollModel } from '@models/infinite-scroll-model'
import { UserModel } from '@models/user-model'

import { IFullUser } from '@typings/shared/full-user'

import { performersSelectConfig } from './performer-select.config'

export class PerformerSelectModel extends InfiniteScrollModel<IFullUser> {
  constructor() {
    super({ method: UserModel.getMySubUsers })

    makeObservable(this, performersSelectConfig)
  }

  onDropdownVisibleChange = (isOpen: boolean) => {
    if (isOpen) {
      this.getData()
    }
  }
}

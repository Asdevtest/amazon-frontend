import { action, computed, observable } from 'mobx'

import { Launches } from '@typings/enums/launches'

export const reportModalConfig = {
  editMode: observable,
  newProductPrice: observable,
  description: observable,
  launchOptions: observable,
  listingLaunches: observable,
  selectLaunchValue: observable,

  launches: computed,

  onChangeNewProductPrice: action.bound,
  onChangeDescription: action.bound,
  onSelectLaunch: action.bound,
}

export const launchOptions = Object.values(Launches).map(value => ({
  value,
  label: value
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/^\w/, c => c.toUpperCase()),
}))

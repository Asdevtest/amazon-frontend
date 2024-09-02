import { action, computed, observable } from 'mobx'

export const observerConfig = {
  table: observable,

  onChangeActiveTable: action.bound,
}

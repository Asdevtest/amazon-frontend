import { action, observable } from 'mobx'

export const observerConfig = {
  table: observable,

  onChangeActiveTable: action.bound,
}

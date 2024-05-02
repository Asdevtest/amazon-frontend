/* eslint-disable @typescript-eslint/no-explicit-any */
import { action, makeObservable, observable } from 'mobx'
import { useHistory } from 'react-router-dom'

export class DefaultModel {
  history: any

  constructor() {
    makeObservable(this, {
      history: observable,
      initHistory: action.bound,
    })
  }

  initHistory() {
    this.history = useHistory()
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { action, computed, makeObservable, observable } from 'mobx'
import { useHistory } from 'react-router-dom'

export class DefaultModel {
  _history: any
  get history() {
    return this._history
  }

  constructor() {
    makeObservable(this, {
      _history: observable,
      history: computed,
      initHistory: action.bound,
    })
  }

  initHistory() {
    this._history = useHistory()
  }
}

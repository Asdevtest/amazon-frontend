import { computed, makeObservable, observable } from 'mobx'
import { useHistory } from 'react-router-dom'

export class DefaultModel {
  _history
  get history() {
    return this._history
  }

  constructor() {
    this._history = useHistory()

    makeObservable(this, {
      _history: observable,
      history: computed,
    })
  }
}

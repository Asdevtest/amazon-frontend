import { computed, makeObservable, observable } from 'mobx'

export class DefaultModel {
  _history: History | undefined = undefined
  get history() {
    return this._history
  }

  constructor(history?: History) {
    this._history = history

    makeObservable(this, {
      _history: observable,
      history: computed,
    })
  }
}

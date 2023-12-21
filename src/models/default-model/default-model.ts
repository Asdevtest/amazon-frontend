import { loadingStatuses } from '@constants/statuses/loading-statuses'

export class DefaultModel {
  private _history: History | undefined = undefined

  get history() {
    return this._history
  }
  get requestStatus() {
    return this._requestStatus
  }
  set requestStatus(requestStatus: loadingStatuses) {
    this._requestStatus = requestStatus
  }
  constructor(history?: History) {
    this._history = history
  }
}

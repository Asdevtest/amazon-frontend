export class DefaultModel {
  private _history: History | undefined = undefined

  get history() {
    return this._history
  }

  constructor(history?: History) {
    this._history = history
  }
}

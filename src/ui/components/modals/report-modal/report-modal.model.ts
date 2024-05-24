import { makeObservable } from 'mobx'

export class ReportModalModel {
  editMode = false

  constructor() {
    makeObservable(this)
  }
}

import { makeAutoObservable } from 'mobx'

export class ShutdownModel {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }
}

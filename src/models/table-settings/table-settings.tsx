/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from 'mobx'

class TableSettingsModelStatic {
  settingsKey = 'TableSettings'

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  getAllTableSettings() {
    const savedTablesSettings = localStorage.getItem(this.settingsKey)
    return savedTablesSettings ? JSON.parse(savedTablesSettings) : {}
  }

  getTableSettings(tableKey: string) {
    const savedTablesSettings = this.getAllTableSettings()
    return savedTablesSettings?.[tableKey as keyof typeof savedTablesSettings]
  }

  saveTableSettings(data: any, tableKey: string) {
    const savedTablesSettings = this.getAllTableSettings()
    savedTablesSettings[tableKey] = data

    localStorage.setItem(this.settingsKey, JSON.stringify(savedTablesSettings))
  }
}

export const TableSettingsModel = new TableSettingsModelStatic()

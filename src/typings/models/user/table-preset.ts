/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ITablePreset {
  _id: string
  endpoint: string
  activeSetting: boolean
  isFavorite: boolean
  settings: any
  title: string
  createdAt: string
  updatedAt: string
}

export interface ITablePresetSetting {
  field: string
  width: number
}

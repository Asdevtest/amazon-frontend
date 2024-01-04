/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridColDef } from '@mui/x-data-grid'

import { PresetStatus } from '@constants/statuses/presets'

export interface DataGridTableSettingProps {
  columsBtnSettings: IColumsBtnSettings
  presetsSettings: IPresetsSettings
}

export interface IColumsBtnSettings {
  columnVisibilityModel: { [key: string]: boolean }
  columnsModel: GridColDef[]
  onColumnVisibilityModelChange: (model: { [key: string]: boolean }) => void
}

export interface IPresetsSettings {
  presetsData: IPresets[]
  onClickResetPresets: () => void
  onClickSavePresets: (presetsData: IPresets[] | undefined) => void
}

export interface IPresets {
  _id: string
  table: string
  endpoint: string
  fields: IPresetsFields[]
  isActive: boolean
  userId: string
  createdAt: string
  updatedAt: string
}

export interface IPresetsFields {
  field: string
  status: PresetStatus
  checked: boolean
}

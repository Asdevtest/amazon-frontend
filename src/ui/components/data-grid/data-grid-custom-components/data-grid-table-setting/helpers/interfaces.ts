/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridColDef } from '@mui/x-data-grid'

export interface DataGridTableSettingProps {
  columsBtnSettings: IColumsBtnSettings
  presetsSettings: any
}

interface IColumsBtnSettings {
  columnVisibilityModel: { [key: string]: boolean }
  columnsModel: GridColDef[]
  onColumnVisibilityModelChange: (model: { [key: string]: boolean }) => void
}

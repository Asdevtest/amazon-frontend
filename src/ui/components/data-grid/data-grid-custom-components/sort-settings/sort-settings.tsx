import { FC, memo } from 'react'

import { GridColDef, GridSortModel } from '@mui/x-data-grid-pro'

import { useStyles } from './sort-settings.style'

import { getSelectData } from './helpers/get-select-data'
import { SelectSortSettings } from './select-sort-settings'
import { SortIndicator } from './sort-indicator'
import { SortSettingsMode } from './sort-settings.type'

interface SortSettingsProps {
  sortModel: GridSortModel
  columnsModel: GridColDef[]
  onSortModelChange: (sortModel: GridSortModel) => void
}

export const SortSettings: FC<SortSettingsProps> = memo(props => {
  const { classes: styles } = useStyles()

  const { sortModel, columnsModel, onSortModelChange } = props

  const currentSortModel = sortModel?.[0]

  const onSortModelChangeHandler = (field?: string, sort?: SortSettingsMode) => {
    const newSortModel = {
      field: field || currentSortModel?.field || 'updatedAt',
      sort: sort || currentSortModel?.sort || SortSettingsMode.DESC,
    }

    onSortModelChange([newSortModel])
  }

  return (
    <div className={styles.root}>
      <SortIndicator sortType={currentSortModel?.sort || ''} onClickSort={onSortModelChangeHandler} />

      <SelectSortSettings
        sortField={currentSortModel?.field}
        customSortFields={getSelectData(columnsModel)}
        onClickField={onSortModelChangeHandler}
      />
    </div>
  )
})

import { FC, memo } from 'react'

import { GridSortModel } from '@mui/x-data-grid-pro'

import { IItem } from '@hooks/use-select'

import { useStyles } from './sort-settings.style'

import { SelectSortSettings } from './select-sort-settings'
import { SortIndicator } from './sort-indicator'
import { SortSettingsType } from './sort-settings.type'

interface SortSettingsProps {
  sortModel: GridSortModel
  getCustomSortFields: () => IItem[]
  onSortModelChange: (sortModel: GridSortModel) => void
}

export const SortSettings: FC<SortSettingsProps> = memo(props => {
  const { classes: styles } = useStyles()

  const { sortModel, getCustomSortFields, onSortModelChange } = props

  const currentSortModel = sortModel?.[0]

  const onSortModelChangeHandler = (field?: string, sort?: SortSettingsType) => {
    const newSortModel = {
      field: field || currentSortModel?.field || 'updatedAt',
      sort: sort || currentSortModel?.sort || SortSettingsType.DESC,
    }

    if (field) {
      newSortModel.field = field
    }

    if (sort) {
      newSortModel.sort = sort
    }

    onSortModelChange([newSortModel])
  }

  return (
    <div className={styles.root}>
      <SortIndicator sortType={currentSortModel?.sort || ''} onClickSort={onSortModelChangeHandler} />

      <SelectSortSettings
        sortField={currentSortModel?.field}
        customSortFields={getCustomSortFields()}
        onClickField={onSortModelChangeHandler}
      />
    </div>
  )
})

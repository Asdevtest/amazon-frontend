import { memo } from 'react'

import { Select } from '@components/shared/selects/select'

import { useStyles } from './sort-settings.style'

import { SelectSortSettings } from './select-sort-settings'

export const SortSettings = memo(props => {
  const { classes: styles } = useStyles()

  const { sortModel, customSortFields, onSortModelChange } = props

  return (
    <div className={styles.root}>
      <div></div>

      <SelectSortSettings currentSortModel={sortModel?.[0]} customSortFields={customSortFields} />
    </div>
  )
})

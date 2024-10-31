import { FC, memo } from 'react'

import { CustomButton } from '@components/shared/custom-button'

import '@typings/enums/button-style'

import { useStyles } from './sort-indicator.style'

import { SortSettingsMode } from '../sort-settings.type'

interface SortIndicatorProps {
  sortType: string
  onClickSort: (field?: string, sort?: SortSettingsMode) => void
}

export const SortIndicator: FC<SortIndicatorProps> = memo(({ sortType, onClickSort }) => {
  const { classes: styles, cx } = useStyles()

  const isAsc = sortType === SortSettingsMode.ASC

  return (
    <div className={styles.root}>
      <CustomButton
        className={styles.button}
        onClick={() => onClickSort(undefined, isAsc ? SortSettingsMode.DESC : SortSettingsMode.ASC)}
      >
        <div className={cx(styles.indicatorWrapper, { [styles.ascIndicator]: isAsc, [styles.descIndicator]: !isAsc })}>
          <div />
          <div />
          <div />
        </div>
      </CustomButton>
    </div>
  )
})

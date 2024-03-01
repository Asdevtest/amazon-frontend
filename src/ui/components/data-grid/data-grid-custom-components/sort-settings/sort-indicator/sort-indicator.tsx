import { FC, memo } from 'react'

import { Button } from '@components/shared/buttons/button'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './sort-indicator.style'

import { SortSettingsType } from '../sort-settings.type'

interface SortIndicatorProps {
  sortType: string
  onClickSort: (field?: string, sort?: SortSettingsType) => void
}

export const SortIndicator: FC<SortIndicatorProps> = memo(({ sortType, onClickSort }) => {
  const { classes: styles, cx } = useStyles()

  const isAsc = sortType === SortSettingsType.ASC

  return (
    <div className={styles.root}>
      <Button
        styleType={ButtonStyle.DEFAULT}
        className={styles.button}
        onClick={() => onClickSort(undefined, isAsc ? SortSettingsType.DESC : SortSettingsType.ASC)}
      >
        <div className={cx(styles.indicatorWrapper, { [styles.ascIndicator]: isAsc, [styles.descIndicator]: !isAsc })}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Button>
    </div>
  )
})

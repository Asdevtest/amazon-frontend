import { FC, memo } from 'react'

import { tableViewMode } from '@constants/table/table-view-modes'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { ViewCartsBlockIcon, ViewCartsLineIcon, ViewCartsTableIcon } from '@components/shared/svg-icons'

import { useStyles } from './view-cards-select.style'

interface FreelanceTypeTaskSelectProps {
  withTabelView?: boolean
  withoutBlockCardView?: boolean
  viewMode: string
  onChangeViewMode: (value: string) => void
}

export const ViewCardsSelect: FC<FreelanceTypeTaskSelectProps> = memo(props => {
  const { withTabelView, withoutBlockCardView, viewMode, onChangeViewMode } = props
  const { classes: styles, cx } = useStyles()

  return (
    <CustomSwitcher
      circle
      switchMode="medium"
      condition={viewMode}
      // @ts-ignore
      switcherSettings={[
        withTabelView && {
          icon: (
            <ViewCartsTableIcon
              className={cx(styles.viewCart, {
                [styles.viewCartSelected]: viewMode === tableViewMode.TABLE,
              })}
            />
          ),
          value: tableViewMode.TABLE,
        },
        !withoutBlockCardView && {
          icon: (
            <ViewCartsBlockIcon
              className={cx(styles.viewCart, {
                [styles.viewCartSelected]: viewMode === tableViewMode.BLOCKS,
              })}
            />
          ),
          value: tableViewMode.BLOCKS,
        },
        {
          icon: (
            <ViewCartsLineIcon
              className={cx(styles.viewCart, {
                [styles.viewCartSelected]: viewMode === tableViewMode.LIST,
              })}
            />
          ),
          value: tableViewMode.LIST,
        },
      ].filter(option => typeof option === 'object')}
      changeConditionHandler={onChangeViewMode}
    />
  )
})

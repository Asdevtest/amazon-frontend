/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react'

import { tableViewMode } from '@constants/table/table-view-modes'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { ViewCartsBlock, ViewCartsLine, ViewCartsTable } from '@components/shared/svg-icons'

import { useClassNames } from './view-cards-select.styles'

interface FreelanceTypeTaskSelectProps {
  withTabelView?: boolean
  viewMode: string
  onChangeViewMode: (value: string) => void
}

export const ViewCardsSelect: FC<FreelanceTypeTaskSelectProps> = props => {
  const { withTabelView, viewMode, onChangeViewMode } = props
  const { classes: classNames, cx } = useClassNames()

  return (
    <CustomSwitcher
      switchMode={'medium'}
      condition={viewMode}
      // @ts-ignore
      switcherSettings={[
        withTabelView && {
          icon: (
            <ViewCartsTable
              className={cx(classNames.viewCart, {
                [classNames.viewCartSelected]: viewMode === tableViewMode.TABLE,
              })}
            />
          ),
          value: tableViewMode.TABLE,
        },
        {
          icon: (
            <ViewCartsBlock
              className={cx(classNames.viewCart, {
                [classNames.viewCartSelected]: viewMode === tableViewMode.BLOCKS,
              })}
            />
          ),
          value: tableViewMode.BLOCKS,
        },
        {
          icon: (
            <ViewCartsLine
              className={cx(classNames.viewCart, {
                [classNames.viewCartSelected]: viewMode === tableViewMode.LIST,
              })}
            />
          ),
          value: tableViewMode.LIST,
        },
      ].filter(option => typeof option === 'object')}
      changeConditionHandler={value => typeof value === 'string' && onChangeViewMode(value)}
    />
  )
}

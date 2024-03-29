import { OpenInNewTabCell } from '..'
import { FC, memo } from 'react'

import { ArrowDownIcon, ArrowUpIcon, UnPinIcon } from '@components/shared/svg-icons'

import { useStyles } from './select-row-cell.style'

interface SelectRowCellProps {
  checkboxComponent: JSX.Element
  onClickShareIcon: () => void
  onClickPinRow: (direction: string, isUnpin?: boolean) => void
  isPinnedTop: boolean
  isPinnedBottom: boolean
  isShowSheldGreen: boolean
  isShowSheldYellow: boolean
}

export const SelectRowCell: FC<SelectRowCellProps> = memo(
  ({
    isPinnedTop,
    isPinnedBottom,
    isShowSheldGreen,
    isShowSheldYellow,
    onClickPinRow,
    checkboxComponent,
    onClickShareIcon,
  }) => {
    const { classes: styles, cx } = useStyles()

    return (
      <div
        className={cx(
          styles.selectRowCellWrapper,
          isShowSheldGreen ? styles.ideaRowGreen : isShowSheldYellow ? styles.ideaRowYellow : '',
        )}
      >
        {checkboxComponent}

        <div className={styles.buttonsWrapper}>
          <OpenInNewTabCell onClickOpenInNewTab={onClickShareIcon} />
        </div>

        <div className={styles.pinRowWrapper}>
          <button
            className={styles.pinButton}
            onClick={e => {
              e.stopPropagation()
              onClickPinRow('top', isPinnedTop)
            }}
          >
            {isPinnedTop ? <UnPinIcon /> : <ArrowUpIcon />}
          </button>

          <button
            className={styles.pinButton}
            onClick={e => {
              e.stopPropagation()
              onClickPinRow('bottom', isPinnedBottom)
            }}
          >
            {isPinnedBottom ? <UnPinIcon /> : <ArrowDownIcon />}
          </button>
        </div>
      </div>
    )
  },
)

import { OpenInNewTabCell } from '..'
import { FC, ReactNode, memo } from 'react'

import { useStyles } from './select-row-cell.style'

interface SelectRowCellProps {
  checkboxComponent?: ReactNode
  isShowSheldGreen?: boolean
  isShowSheldYellow?: boolean
  onClickShareIcon: () => void
}

export const SelectRowCell: FC<SelectRowCellProps> = memo(
  ({ isShowSheldGreen, isShowSheldYellow, checkboxComponent, onClickShareIcon }) => {
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
      </div>
    )
  },
)

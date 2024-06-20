import { OpenInNewTabCell } from '..'
import { FC, memo } from 'react'

import { useStyles } from './select-row-cell.style'

interface SelectRowCellProps {
  checkboxComponent: JSX.Element
  onClickShareIcon: () => void
  isShowSheldGreen?: boolean
  isShowSheldYellow?: boolean
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

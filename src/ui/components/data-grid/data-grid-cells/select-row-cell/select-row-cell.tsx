import { OpenInNewTabCell } from '..'
import { FC, memo } from 'react'

import { useStyles } from './select-row-cell.style'

interface SelectRowCellProps {
  checkboxComponent: JSX.Element
  onClickShareIcon: () => void
}

export const SelectRowCell: FC<SelectRowCellProps> = memo(({ checkboxComponent, onClickShareIcon }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.selectRowCellWrapper}>
      {checkboxComponent}

      <div className={styles.buttonsWrapper}>
        <OpenInNewTabCell onClickOpenInNewTab={onClickShareIcon} />
      </div>
    </div>
  )
})

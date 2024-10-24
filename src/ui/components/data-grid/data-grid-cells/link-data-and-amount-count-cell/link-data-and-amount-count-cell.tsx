import { FC, memo } from 'react'

import { useStyles } from './link-data-and-amount-count-cell.style'

interface LinkDataAndAmountCountCellProps {
  data: string
  onClickLink: () => void
}

export const LinkDataAndAmountCountCell: FC<LinkDataAndAmountCountCellProps> = memo(({ data, onClickLink }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <p className={styles.multilineLink} onClick={onClickLink}>
        {data}
      </p>
    </div>
  )
})

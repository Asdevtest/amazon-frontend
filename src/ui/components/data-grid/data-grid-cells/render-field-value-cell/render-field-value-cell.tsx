import { FC, memo } from 'react'

import { useStyles } from './render-field-value-cell.style'

interface RenderFieldValueCellProps {
  value: string
}

export const RenderFieldValueCell: FC<RenderFieldValueCellProps> = memo(({ value }) => {
  const { classes: styles } = useStyles()

  return <p className={styles.renderFieldValueCellText}>{value || '-'}</p>
})

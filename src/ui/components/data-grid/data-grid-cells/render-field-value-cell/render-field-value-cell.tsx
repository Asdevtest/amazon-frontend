import React, { FC } from 'react'

import { useStyles } from './render-field-value-cell.style'

interface RenderFieldValueCellProps {
  value: string
}

export const RenderFieldValueCell: FC<RenderFieldValueCellProps> = React.memo(({ value }) => {
  const { classes: styles } = useStyles()

  return <p className={styles.renderFieldValueCellText}>{value || '-'}</p>
})

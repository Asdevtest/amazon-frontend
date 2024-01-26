import { FC } from 'react'

import { useStyles } from './label-value-double-block.style'

export interface LabelValuePair {
  label: string
  value: string
}

interface Props {
  bgColor: 'white' | 'green'
  labelValueDouble: [LabelValuePair, LabelValuePair]
}

export const LabelValueDoubleBlock: FC<Props> = ({ labelValueDouble, bgColor }) => {
  const { classes: styles, cx } = useStyles()
  return (
    <div className={cx(styles.root, { [styles.rootGreen]: bgColor === 'green' })}>
      <div className={styles.row}>
        <div className={styles.labelWrapper}>
          <p className={styles.labelText}>{labelValueDouble[0].label}</p>
        </div>
        <div className={styles.valueWrapper}>
          <p className={styles.valueText}>{labelValueDouble[0].value}</p>
        </div>
      </div>
      <div className={cx(styles.row, styles.rowNotFirst)}>
        <div className={styles.labelWrapper}>
          <p className={styles.labelText}>{labelValueDouble[0].label}</p>
        </div>
        <div className={styles.valueWrapper}>
          <p className={styles.valueText}>{labelValueDouble[0].value}</p>
        </div>
      </div>
    </div>
  )
}

import { FC, memo } from 'react'

import { useStyles } from './box-split.style'

export const BoxSplit: FC = memo(() => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.flexContainer}>
      <img className={styles.maxBox} src="/assets/img/box.png" />

      <p className={styles.text}>=</p>

      <div className={cx(styles.flexContainer, styles.border)}>
        <img className={styles.miniBox} src="/assets/img/box.png" />
        <p className={styles.text}>+</p>
        <img className={styles.miniBox} src="/assets/img/box.png" />
      </div>
    </div>
  )
})

import { FC, memo } from 'react'

import { useStyles } from './box-edit.style'

import { Pencil } from '../../svg-icons'

export const BoxEdit: FC = memo(() => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.flexContainer}>
      <img className={styles.boxIcon} src="/assets/img/box.png" />

      <Pencil className={styles.penIcon} />
    </div>
  )
})

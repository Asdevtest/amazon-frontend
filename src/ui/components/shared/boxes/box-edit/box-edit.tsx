import { FC, memo } from 'react'

import { useStyles } from './box-edit.style'

import { PencilIcon } from '../../svg-icons'

export const BoxEdit: FC = memo(() => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.flexContainer}>
      <img className={styles.boxIcon} src="/assets/img/box.png" />

      <PencilIcon className={styles.penIcon} />
    </div>
  )
})

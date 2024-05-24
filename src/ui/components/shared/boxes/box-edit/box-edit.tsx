import { FC, memo } from 'react'

import { PencilIcon } from '@components/shared/svg-icons'

import { useStyles } from './box-edit.style'

export const BoxEdit: FC = memo(() => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.flexContainer}>
      <img className={styles.boxIcon} src="/assets/img/box.png" />

      <PencilIcon className={styles.penIcon} />
    </div>
  )
})
